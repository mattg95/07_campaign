const { getRandomResponse, getAnswerIndex } = require("./helper-functions");
const { survey } = require("./emailStrings.json");
const { questionKeys, religions } = require("./keys");

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

const countryLinksHandler = (thisId, fields, answers) => {
  const choiceIndex = getAnswerIndex(thisId, fields, answers);
  const choiceObj = survey[questionKeys[thisId]][choiceIndex];
  if (choiceObj === undefined) return "";
  else {
    const sentence = getRandomResponse(choiceObj.synonyms);
    const countryNameData = answers.find(
      ({ field: { id } }) => id === "MRPxTl6j1QAw"
    );
    const sentenceWithCountry = sentence.replace(
      /COUNTRY_NAME/g,
      countryNameData.text
    );
    return sentenceWithCountry;
  }
};

const religionHandler = (thisId, fields, answers) => {
  const choiceIndex = getAnswerIndex(thisId, fields, answers);
  if ([7, 8].includes(choiceIndex)) return "";
  else {
    const { adj, noun } = religions[choiceIndex];
    let sentence = getRandomResponse(survey.religion);
    sentence = sentence
      .replace("RELIGIOUS_DENONYM_NOUN", noun)
      .replace("RELIGIOUS_DENONYM_ADJ", adj);
    return sentence;
  }
};

module.exports = { motivationHandler, countryLinksHandler, religionHandler };
