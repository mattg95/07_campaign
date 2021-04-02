process.env.NODE_ENV = "test";
const { expect } = require("chai");
const { generateEmail } = require("../emailGenerator/index.js");
const { getMpByPostcode } = require("../api-calls");
const fs = require("fs");

const negativeResult = require("./exampleTypeformResponses/8266dd221cf80375e6716f715ab41db2.json");

const jewishResponse = require("./exampleTypeformResponses/81a6c4391347d2f89e5d9ac340e39cb1.json");

const otherReligionResponse = require("./exampleTypeformResponses/38d468e36442fdeb2673c287d7086fd6.json");

const nonToryResponse = require("./exampleTypeformResponses/47dc774ed2492222f7ed29fc74b16732.json");

const nonToryMpResponse = require("./exampleTypeformResponses/bfedb30c6203ed71bd65a126dae816c7.json");

const allToryResponse = require("./exampleTypeformResponses/38d468e36442fdeb2673c287d7086fd6.json");

const nonValidPostcodeResponse = require("./exampleTypeformResponses/fe72b4b7520c85f7c5590f35747d2618.json");

const covidMotivationsRes = require("./exampleTypeformResponses/f53bb312523d0a911da1e347dc77edbc.json");

const exampleTypeformResponses = [];
var normalizedPath = require("path").join(
  __dirname,
  "exampleTypeformResponses"
);

fs.readdirSync(normalizedPath).forEach(function (file) {
  exampleTypeformResponses.push({
    filename: file,
    json: require("./exampleTypeformResponses/" + file),
  });
});

const getRandomEmail = () => {
  const randomIndex = Math.floor(
    Math.random() * exampleTypeformResponses.length
  );
  const randomResponse = exampleTypeformResponses[randomIndex];
  return generateEmail(randomResponse.json.form_response);
};

describe("/api/postcode", () => {
  it("should return expected MP details for DL6 2NJ", async () => {
    result = await getMpByPostcode("DL6 2NJ");
    expect(result.full_name).to.equal("Rishi Sunak");
    expect(result.constituency).to.equal("Richmond (Yorks)");
    expect(result.party).to.equal("Conservative");
    expect(result.mpEmailAddress).to.equal("rishi.sunak.mp@parliament.uk");
  });
  it("should return expected MP details for s6 2PN", async () => {
    result = await getMpByPostcode("s6 2pn");
    expect(result.full_name).to.equal("Paul Blomfield");
    expect(result.constituency).to.equal("Sheffield Central");
    expect(result.party).to.equal("Labour");
    expect(result.mpEmailAddress).to.equal("paul.blomfield.mp@parliament.uk");
  });
  it("should correctly handle errors for an invalid postcode", async () => {
    result = await getMpByPostcode("marmite");
    expect(result.error).to.equal("Could not retrieve MP");
    secondResult = await getMpByPostcode("S62 2PB");
    expect(secondResult.error).to.equal("Could not retrieve MP");
  });
  it("should return the 2021 current MP", async () => {
    result = await getMpByPostcode("EH39 4PS");
    expect(result.full_name).to.equal("Kenny MacAskill");
    expect(result.full_name).to.not.equal("George Kerevan");
    secondResult = await getMpByPostcode("M54YD");
    expect(secondResult.full_name).to.equal("Rebecca Long Bailey");
    expect(secondResult.full_name).to.not.equal("Hazel Blears");
  });
});

//how to test webhooks?

describe("generateEmail", () => {
  let randomResponse;
  let negativeEmail;
  let allToryEmail;
  let nonToryMpEmail;
  let nonToryEmail;
  let jewishEmail;
  let otherReligionEmail;
  let nonValidPostcodeEmail;
  let motivationsEmail;

  before(async function () {
    randomResponse = await getRandomEmail();
    negativeEmail = await generateEmail(negativeResult.form_response);
    allToryEmail = await generateEmail(allToryResponse.form_response);
    nonToryMpEmail = await generateEmail(nonToryMpResponse.form_response);
    allToryEmail = await generateEmail(allToryResponse.form_response);
    nonToryEmail = await generateEmail(nonToryResponse.form_response);
    jewishEmail = await generateEmail(jewishResponse.form_response);
    otherReligionEmail = await generateEmail(
      otherReligionResponse.form_response
    );
    nonValidPostcodeEmail = await generateEmail(
      nonValidPostcodeResponse.form_response
    );
    motivationsEmail = await generateEmail(covidMotivationsRes.form_response);
  });
  it("should return an object with keys 'body' and 'subject'", () => {
    expect(randomResponse).to.have.keys(
      "body",
      "subject",
      "greeting",
      "mpData",
      "supportsAid"
    );
    expect(Object.keys(randomResponse).length).to.equal(5);
  });
  it("response.body should be a string", () => {
    expect(typeof randomResponse.body).to.equal("string");
  });
  it("response.subject should be a string", () => {
    expect(typeof randomResponse.subject).to.equal("string");
  });
  it("should not include 'COUNTRY_NAME' template variable", () => {
    expect(randomResponse.body.search("COUNTRY_NAME")).to.equal(-1);
  });
  it("should not include the string 'undefined' anywhere in the email", () => {
    expect(randomResponse.body.search("undefined")).to.equal(-1);
  });
  it("should not include 'RELIGIOUS_DENONYM_NOUN' or 'RELIGIOUS_DENONYM_ADJ' template variable", () => {
    expect(jewishEmail.body.search(/RELIGIOUS_DENONYM_NOUN/gi)).to.equal(-1);
    expect(jewishEmail.body.search(/RELIGIOUS_DEMONYM_NOUN/gi)).to.equal(-1);
    expect(jewishEmail.body.search(/RELIGIOUS_DENONYM_ADJ/gi)).to.equal(-1);
    expect(jewishEmail.body.search(/RELIGIOUS_DEMONYM_ADJ/gi)).to.equal(-1);
    expect(otherReligionEmail.body.search(/RELIGIOUS_DENONYM_NOUN/gi)).to.equal(
      -1
    );
    expect(otherReligionEmail.body.search(/RELIGIOUS_DEMONYM_NOUN/gi)).to.equal(
      -1
    );
    expect(otherReligionEmail.body.search(/RELIGIOUS_DENONYM_ADJ/gi)).to.equal(
      -1
    );
    expect(otherReligionEmail.body.search(/RELIGIOUS_DEMONYM_ADJ/gi)).to.equal(
      -1
    );
  });
  it("should include references to a user's religion when a user has one", () => {
    expect([
      jewishEmail.body.search(/Jew/gi),
      jewishEmail.body.search(/Jewish/gi),
    ]).to.not.eql([-1, -1]);
    expect([
      otherReligionEmail.body.search(/religious/gi),
      otherReligionEmail.body.search(/person of faith/gi),
    ]).to.not.eql([-1, -1]);
  });
  it("should not include a response for 'no religion' choice", () => {
    expect(randomResponse.body.search(/Not religious/)).to.equal(-1);
    expect(randomResponse.body.search(/agnostic/)).to.equal(-1);
    expect(randomResponse.body.search(/athiest/)).to.equal(-1);
  });
  it("should not include a response for 'other religion' choice", () => {
    expect(randomResponse.body.search(/Not religious/)).to.equal(-1);
    expect(randomResponse.body.search(/agnostic/)).to.equal(-1);
    expect(randomResponse.body.search(/athiest/)).to.equal(-1);
  });
  it("should not include escaped 'newline' characters", () => {
    expect(randomResponse.body).not.to.contain("\\n");
  });
  it("negative responses to question 1 (supporting aid) should return a blank", () => {
    expect(negativeEmail.body).to.equal("");
    expect(negativeEmail.subject).to.equal("");
  });
  it("non-conservative responses should not reference that in the email", () => {
    expect(nonToryEmail.body.search(/member/gi)).to.equal(-1);
  });
  it("Conservative responses to Conservative MPs should reference that in the email", () => {
    expect(allToryEmail.body.search(/conservative/gi)).to.not.equal(-1);
  });
  it("Conservative responses to Conservative MPs should reference that in the email", () => {
    expect(allToryEmail.body.search(/conservative/gi)).to.not.equal(-1);
  });
  it("works even if a user inputs an invalid postcode", () => {
    expect(nonValidPostcodeEmail).to.have.keys(
      "body",
      "subject",
      "greeting",
      "mpData",
      "supportsAid"
    );
  });
  it("should include reference to a user's motivation where they have put that in", () => {
    expect(motivationsEmail.body.match(/covid|pandemic/gi)).to.not.equal("");
  });
});
