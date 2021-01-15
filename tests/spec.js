process.env.NODE_ENV = "test";
const { expect } = require("chai");
const { generateEmail } = require("../formResponseHandler");

const example0 = require("./exampleResponses/example0.json");
const example1 = require("./exampleResponses/example1.json");
const example2 = require("./exampleResponses/example2.json");
const example3 = require("./exampleResponses/example3.json");
const example4 = require("./exampleResponses/example4.json");

const example0Res = generateEmail(example0.form_response);
const example1Res = generateEmail(example1.form_response);
const example2Res = generateEmail(example2.form_response);
const example3Res = generateEmail(example3.form_response);
const example4Res = generateEmail(example4.form_response);

const allExampleRes = [
  example0Res,
  example1Res,
  example2Res,
  example3Res,
  example4Res,
];

describe("/api/postcode", () => {
  //tests for api route
});

//how to test webhooks?

describe("generateEmail", () => {
  it("should return an object with keys 'body' and 'subject'", () => {
    allExampleRes.forEach((res) => {
      expect(res).to.have.keys("body", "subject");
    });
  });
  it("response.body should be a string", () => {
    allExampleRes.forEach((res) => {
      expect(typeof res.body).to.equal("string");
    });
    allExampleRes.forEach((res) => {
      expect(typeof res.subject).to.equal("string");
    });
  });
  it("response.subject should be a string", () => {
    allExampleRes.forEach((res) => {
      expect(typeof res.subject).to.equal("string");
    });
  });
  it("should not include 'COUNTRY_NAME' template variable", () => {
    allExampleRes.forEach((res) => {
      expect(res.body.search("COUNTRY_NAME")).to.equal(-1);
    });
  });
  it("should not include '[RELIGION]' template variable", () => {
    allExampleRes.forEach((res) => {
      expect(res.body.search(/\[RELIGION\]/)).to.equal(-1);
    });
  });
  it("should not include a response for 'no religion' choice", () => {
    allExampleRes.forEach((res) => {
      console.log(res);
      expect(res.body.search(/Not religious/)).to.equal(-1);
      expect(res.body.search(/agnostic/)).to.equal(-1);
      expect(res.body.search(/athiest/)).to.equal(-1);
    });
  });
  it("should not include a response for 'other religion' choice", () => {
    allExampleRes.forEach((res) => {
      expect(res.body.search(/Not religious/)).to.equal(-1);
      expect(res.body.search(/agnostic/)).to.equal(-1);
      expect(res.body.search(/athiest/)).to.equal(-1);
    });
  });
});
