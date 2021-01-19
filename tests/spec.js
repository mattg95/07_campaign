process.env.NODE_ENV = "test";
const { expect } = require("chai");
const { generateEmail } = require("../formResponseHandler");
const { getMpByPostcode } = require("../api-functions");
const fs = require("fs");

const exampleNegativeResult = require("./exampleResponses/8266dd221cf80375e6716f715ab41db2.json");
const exampleNegativeEmail = generateEmail(exampleNegativeResult.form_response);

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

const allGeneratedEmails = allGeneratedResults.map((result) => result.email);

describe("/api/postcode", () => {
  it("should return expected MP details for DL6 2NJ", async () => {
    result = await getMpByPostcode("DL6 2NJ");
    expect(result.full_name).to.equal("Rishi Sunak");
    expect(result.constituency).to.equal("Richmond (Yorks)");
    expect(result.party).to.equal("Conservative");
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
  it("should not include '[RELIGION]' template variable", () => {
    allGeneratedEmails.forEach((res) => {
      expect(res.body.search(/\[RELIGION\]/)).to.equal(-1);
    });
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
