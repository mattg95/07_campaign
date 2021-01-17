process.env.NODE_ENV = "test";
const { expect } = require("chai");
const { generateEmail } = require("../formResponseHandler");
const { getMpByPostcode } = require("../api-functions");
const fs = require("fs");

const exampleResponses = [];
var normalizedPath = require("path").join(__dirname, "exampleResponses");

fs.readdirSync(normalizedPath).forEach(function (file) {
  exampleResponses.push(require("./exampleResponses/" + file));
});

const allGeneratedEmails = exampleResponses.map(({ form_response }) => {
  return generateEmail(form_response);
});

describe("/api/postcode", () => {
  it("should return expected MP details for DL6 2NJ", async () => {
    result = await getMpByPostcode("DL6 2NJ");
    expect(result.full_name).to.equal("Rishi Sunak");
    expect(result.constituency).to.equal("Richmond (Yorks)");
    expect(result.party).to.equal('Conservative');
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
    allGeneratedEmails.forEach((res) => {
      expect(typeof res.subject).to.equal("string");
    });
  });
  it("response.subject should be a string", () => {
    allGeneratedEmails.forEach((res) => {
      expect(typeof res.subject).to.equal("string");
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
  it("should not include the 'newline' character", () => {
    allGeneratedEmails.forEach((res) => {
      expect(res.body.search(/\n/)).to.equal(-1);
    });
  });
});
