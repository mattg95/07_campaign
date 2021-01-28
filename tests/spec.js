process.env.NODE_ENV = "test";
const { expect } = require("chai");
const { generateEmail } = require("../formResponseHandler");
const { getMpByPostcode } = require("../api-functions");
const fs = require("fs");

const negativeResult = require("./exampleResponses/8266dd221cf80375e6716f715ab41db2.json");

const jewishResponse = require("./exampleResponses/81a6c4391347d2f89e5d9ac340e39cb1.json");

const otherReligionResponse = require("./exampleResponses/38d468e36442fdeb2673c287d7086fd6.json");

const nonToryResponse = require("./exampleResponses/47dc774ed2492222f7ed29fc74b16732.json");

const nonToryMpResponse = require("./exampleResponses/bfedb30c6203ed71bd65a126dae816c7.json");

const allToryResponse = require("./exampleResponses/38d468e36442fdeb2673c287d7086fd6.json");

const exampleResponses = [];
var normalizedPath = require("path").join(__dirname, "exampleResponses");

fs.readdirSync(normalizedPath).forEach(function (file) {
  exampleResponses.push({
    filename: file,
    json: require("./exampleResponses/" + file),
  });
});

const getRandomEmail = () => {
  const randomIndex = Math.floor(Math.random() * exampleResponses.length);
  const randomResponse = exampleResponses[randomIndex];
  return generateEmail(randomResponse.json.form_response);
};

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
    expect(result.error).to.equal("Could not retrieve MP");
    secondResult = await getMpByPostcode("S62 2PB");
    expect(secondResult.error).to.equal("Could not retrieve MP");
  });
});

//how to test webhooks?

describe("generateEmail", () => {
  let res;
  let negativeEmail;
  let allToryEmail;
  let nonToryMpEmail;
  let nonToryEmail;
  let jewishEmail;
  let otherReligionEmail;
  before(async function () {
    res = await getRandomEmail();
    negativeEmail = await generateEmail(negativeResult.form_response);
    allToryEmail = await generateEmail(allToryResponse.form_response);
    nonToryMpEmail = await generateEmail(nonToryMpResponse.form_response);
    allToryEmail = await generateEmail(allToryResponse.form_response);
    nonToryEmail = await generateEmail(nonToryResponse.form_response);
    jewishEmail = await generateEmail(jewishResponse.form_response);
    otherReligionEmail = await generateEmail(
      otherReligionResponse.form_response
    );
  });
  it("should return an object with keys 'body' and 'subject'", () => {
    expect(res).to.have.keys("body", "subject", "greeting", "mpData");
    expect(Object.keys(res).length).to.equal(4);
  });
  it("response.body should be a string", () => {
    expect(typeof res.body).to.equal("string");
  });
  it("response.subject should be a string", () => {
    expect(typeof res.subject).to.equal("string");
  });
  it("should not include 'COUNTRY_NAME' template variable", () => {
    expect(res.body.search("COUNTRY_NAME")).to.equal(-1);
  });
  it("should not include the string 'undefined' anywhere in the email", () => {
    expect(res.body.search("undefined")).to.equal(-1);
  });
  it("should not include '[RELIGIOUS_DEMONYM_NOUN]' or '[RELIGIOUS_DEMONYM_ADJ]' template variable", () => {
    expect(res.body.search(/\[RELIGIOUS_DEMONYM_NOUN\]/)).to.equal(-1);
    expect(res.body.search(/\[RELIGIOUS_DEMONYM_ADJ\]/)).to.equal(-1);
  });
  it("should include references to a user's religion when a user has one", async () => {
    expect([
      jewishEmail.body.search(/Jew/),
      jewishEmail.body.search(/Jewish/),
    ]).to.not.eql([-1, -1]);
    expect([
      otherReligionEmail.body.search(/religious/),
      otherReligionEmail.body.search(/person of faith/),
    ]).to.not.eql([-1, -1]);
  });
  it("should not include a response for 'no religion' choice", () => {
    expect(res.body.search(/Not religious/)).to.equal(-1);
    expect(res.body.search(/agnostic/)).to.equal(-1);
    expect(res.body.search(/athiest/)).to.equal(-1);
  });
  it("should not include a response for 'other religion' choice", () => {
    expect(res.body.search(/Not religious/)).to.equal(-1);
    expect(res.body.search(/agnostic/)).to.equal(-1);
    expect(res.body.search(/athiest/)).to.equal(-1);
  });
  // it("should not include escaped 'newline' characters", () => {
  //   const res = await getRandomEmail();
  //     expect(res.email.body, "In " + res.filename).not.to.contain("\\n");
  // });
  it("negative responses to question 1 (supporting aid) should return a blank", () => {
    expect(negativeEmail.body).to.equal("");
    expect(negativeEmail.subject).to.equal("");
  });
  it("non-conservative responses should not reference that in the email", () => {
    expect(nonToryEmail.body.search(/conservative/gi)).to.equal(-1);
  });
  it("Conservative responses to Conservative MPs should reference that in the email", () => {
    expect(allToryEmail.body.search(/conservative/gi)).to.not.equal(-1);
  });
  it("Conservative responses to Conservative MPs should reference that in the email", () => {
    expect(allToryEmail.body.search(/conservative/gi)).to.not.equal(-1);
  });
  it("emails to non-conservative MPs should not reference that the user is a conservative in the email", () => {
    expect(nonToryMpEmail.body.search(/conservative/gi)).to.equal(-1);
  });
});
