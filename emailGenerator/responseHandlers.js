const { getRandomResponse } = require("./helper-functions");
const { survey } = require("../emailStrings.json");

const questionKeys = {
  gil6UCe4dG9T: "supportAid",
  wKGNjgRDml1H: "motivation",
  MRPxTl6j1QAw: "whichCountry",
  Z4awe4sDljLR: "countryLinks",
  EejpFBEzP9wK: "conservative",
  IdqRPd6SUMVh: "religion",
  vdZgYVyiLE13: "meetMp",
  UhNb2Z5nqHtb: "meetMpDoubleCheck",
  ghzBmQTQ2npF: "emailAddress",
  uLPPjjg5B0Bn: "homeAddress",
  hgdzZ05GxSAs: "postcode",
  daZZA6TwyMP5: "name",
};

const motivationHandler = (thisId, fields, answers) => {
  const thisField = fields.find(({ id }) => id === thisId);
  const thisAnswers = answers.find(({ field: { id } }) => id === thisId);
  let choiceIndex = [];
  //this gets the synomys array based on the index of the survey multiple choice-
  thisField.choices.forEach((choice, i) => {
    if (thisAnswers.choices.labels.includes(choice.label)) {
      choiceIndex.push(i);
    }
  });
  const synonymns = choiceIndex.map((ele) => {
    return survey[questionKeys[thisId]][ele];
  });
  const sentenceArr = synonymns.map((ele) => {
    return ele && getRandomResponse(ele.synonyms);
  });
  return sentenceArr.length ? sentenceArr.join(" ") : "";
};

module.exports = { motivationHandler, questionKeys };
