process.env.NODE_ENV = "test";
const { expect } = require("chai");
const { generateEmail } = require("../formResponseHandler");

const example1 = require("./exampleResponses/example1.json");
const example2 = require("./exampleResponses/example2.json");
const example3 = require("./exampleResponses/example3.json");
const example4 = require("./exampleResponses/example4.json");

const allExamples = [example1, example2, example3, example4];

describe("/api/postcode", () => {
  //tests for api route
});

//how to test webhooks?

describe("generateEmail", () => {
  it("should return an object with keys 'body' and 'subject'", () => {
    expect(generateEmail(example1.form_response)).to.have.keys(
      "body",
      "subject"
    );
  });
});
