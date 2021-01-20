process.env.NODE_ENV = "test";
const { expect } = require("chai");
const { generateEmail } = require("../formResponseHandler");
const { getMpByPostcode } = require("../api-functions");
const fs = require("fs");

const exampleNegativeResult = require("./exampleResponses/8266dd221cf80375e6716f715ab41db2.json");
const exampleNegativeEmail = generateEmail(exampleNegativeResult.form_response);

const exampleJewishResponse = require("./exampleResponses/81a6c4391347d2f89e5d9ac340e39cb1.json");
const exampleJewishEmail = generateEmail(exampleJewishResponse.form_response);

const exampleOtherReligionResponse = require("./exampleResponses/38d468e36442fdeb2673c287d7086fd6.json");
const exampleOtherReligionEmail = generateEmail(
  exampleOtherReligionResponse.form_response
);

const exampleResponses = [];
var normalizedPath = require("path").join(__dirname, "exampleResponses");

fs.readdirSync(normalizedPath).forEach(function (file) {
  exampleResponses.push({
    filename: file,
    json: require("./exampleResponses/" + file),
  });
});

const allGeneratedResults = exampleResponses.map(
  ({ filename: file, json: { form_response } }) => {
    return { filename: file, email: generateEmail(form_response) };
  }
);

const allGeneratedEmails = allGeneratedResults.map((result) => result.email);

const allPositiveResponses = exampleResponses.filter(
  ({ json: { form_response } }) => {
    let supportsAid = true;
    form_response.answers.forEach(({ field, choice }) => {
      if (field.id === "gil6UCe4dG9T") {
        if (choice.label === "No") {
          supportsAid = false;
        }
      }
    });
    return supportsAid && form_response;
  }
);

const allPositiveEmails = allPositiveResponses.map(
  ({ json: { form_response } }) => {
    return generateEmail(form_response);
  }
);

describe("/api/postcode", () => {
  it("should return expected MP details for DL6 2NJ", async () => {
    result = await getMpByPostcode("DL6 2NJ");
    expect(result.full_name).to.equal("Rishi Sunak");
    expect(result.constituency).to.equal("Richmond (Yorks)");
    expect(result.party).to.equal("Conservative");
  });
  it("should return expected MP details for s6 2PN", async () => {
    result = await getMpByPostcode("s6 2pn");
    expect(result.full_name).to.equal("Paul Blomfield");
    expect(result.constituency).to.equal("Sheffield Central");
    expect(result.party).to.equal("Labour");
  });
  it("should correctly handle errors for an invalid postcode", async () => {
    result = await getMpByPostcode("marmite");
    expect(result.error).to.equal("invalid postcode");
    secondResult = await getMpByPostcode("S62 2PB");
    expect(secondResult.error).to.equal("invalid postcode");
  });
});

//how to test webhooks?

describe("generateEmail", () => {
  it("should return an object with keys 'body' and 'subject'", () => {
    allGeneratedEmails.forEach((res) => {
      expect(res).to.have.keys("body", "subject");
    });
  });
  it("response.body should be a string", () => {
    allGeneratedEmails.forEach((res) => {
      expect(typeof res.body).to.equal("string");
    });
  });
  it("response.subject should be a string", () => {
    allGeneratedEmails.forEach((res) => {
      expect(typeof res.subject).to.equal("string");
    });
  });
  it("all positive responses that support aid should return a body and a subject", () => {
    allPositiveEmails.forEach((res) => {
      expect(res.body.length).to.be.above(0);
      expect(res.subject.length).to.be.above(0);
    });
  });
  it("should not include 'COUNTRY_NAME' template variable", () => {
    allGeneratedEmails.forEach((res) => {
      expect(res.body.search("COUNTRY_NAME")).to.equal(-1);
    });
  });
  it("should not include '[RELIGIOUS_DEMONYM_NOUN]' or '[RELIGIOUS_DEMONYM_ADJ]' template variable", () => {
    allGeneratedEmails.forEach((res) => {
      expect(res.body.search(/\[RELIGIOUS_DEMONYM_NOUN\]/)).to.equal(-1);
      expect(res.body.search(/\[RELIGIOUS_DEMONYM_ADJ\]/)).to.equal(-1);
    });
  });
  it("should not include references to a user's religion when a user has one", () => {
    expect(exampleJewishEmail.body.search(/Jew/)).to.not.equal(-1);
    expect(exampleJewishEmail.body.search(/Jewish/)).to.not.equal(-1);
    expect(exampleOtherReligionEmail.body.search(/religious/)).to.not.equal(-1);
    expect(
      exampleOtherReligionEmail.body.search(/person of faith/)
    ).to.not.equal(-1);
  });
  it("should not include a response for 'no religion' choice", () => {
    allGeneratedEmails.forEach((res) => {
      expect(res.body.search(/Not religious/)).to.equal(-1);
      expect(res.body.search(/agnostic/)).to.equal(-1);
      expect(res.body.search(/athiest/)).to.equal(-1);
    });
  });
  it("should not include a response for 'other religion' choice", () => {
    allGeneratedEmails.forEach((res) => {
      expect(res.body.search(/Not religious/)).to.equal(-1);
      expect(res.body.search(/agnostic/)).to.equal(-1);
      expect(res.body.search(/athiest/)).to.equal(-1);
    });
  });
  it("should not include escaped 'newline' characters", () => {
    allGeneratedResults.forEach((res) => {
      expect(res.email.body, "In " + res.filename).not.to.contain("\\n");
    });
  });
  it("negative responses to question 1 (supporting aid) should return a blank", () => {
    expect(exampleNegativeEmail.body).to.equal("");
    expect(exampleNegativeEmail.subject).to.equal("");
  });
});
