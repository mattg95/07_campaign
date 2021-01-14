const e = require("express");
const { subject, survey, standard } = require("./emailStrings.json");

exports.generateEmail = ({ answers, definition: { fields } }) => {
  //this could be replaced with an object to help order the email
  const emailArr = [];

  //these map the question ids from the form onto our json object
  const questionKeys = {
    gil6UCe4dG9T: "supportAid",
    wKGNjgRDml1H: "motivation",
    MRPxTl6j1QAw: "whichCountry",
    Z4awe4sDljLR: "countryLinks",
    EejpFBEzP9wK: "conservative",
    IdqRPd6SUMVh: "religion",
    vdZgYVyiLE13: "meetMp",
    ghzBmQTQ2npF: "emailAddress",
    uLPPjjg5B0Bn: "homeAddress",
    daZZA6TwyMP5: "name",
  };

  const getRandomResponse = (inputArr) => {
    return inputArr[Math.floor(Math.random() * inputArr.length)];
  };

  const getAnswerSynonyms = (idProp) => {
    const thisField = fields.find(({ id }) => id === idProp);
    const thisAnswers = answers.find(({ field: { id } }) => id === idProp);
    let choiceIndex = 0;
    //this gets the synomys array based on the index of the survey multiple choice options-
    thisField.choices.forEach((choice, i) => {
      if (thisAnswers.choice.label === choice.label) {
        choiceIndex = i;
      }
    });
    if (survey[questionKeys[idProp]][choiceIndex] !== undefined) {
      return survey[questionKeys[idProp]][choiceIndex];
    } else {
      return [];
    }
  };

  //this is the 'router' that handles all question responses based on their id
  answers.forEach(({ text, field, choice }) => {
    //conservatives hanlder
    if (field.id === "EejpFBEzP9wK") {
      emailArr.push(getRandomResponse(getAnswerSynonyms("EejpFBEzP9wK")));
    }
    //religion handler
    if (field.id === "IdqRPd6SUMVh") {
      const sentence = getRandomResponse(survey.religion);
      const sentenceWithReligion = sentence.replace(
        /[RELIGION]/g,
        choice.label
      );
      emailArr.push(sentenceWithReligion);
    }
    //countryLinksHandler
    if (field.id === "Z4awe4sDljLR") {
      const sentence = getRandomResponse(getAnswerSynonyms("Z4awe4sDljLR"));
      const counryNameData = answers.find(
        ({ field: { id } }) => id === "MRPxTl6j1QAw"
      );
      const sentenceWithCountry = sentence.replace(
        /COUNTRY_NAME/g,
        counryNameData.text
      );
      emailArr.push(sentenceWithCountry);
    }
    //moivations handler
    if (field.id === "wKGNjgRDml1H") {
      const thisId = "wKGNjgRDml1H";
      const thisField = fields.find(({ id }) => id === thisId);
      const thisAnswers = answers.find(({ field: { id } }) => id === thisId);
      let choiceIndex = [];
      //this gets the synomys array based on the index of the survey multiple choice-
      thisField.choices.forEach((choice, i) => {
        if (thisAnswers.choices.labels.includes(choice.label)) {
          choiceIndex.push(i);
        }
      });
      const synoynms = choiceIndex.map((ele) => {
        return survey[questionKeys[thisId]][ele];
      });
      const sentenceArr = synoynms.map((ele) => {
        ele && getRandomResponse(ele);
      });
      emailArr.push(sentenceArr.join(" "));
    }
    //name handler
    if (field.id === "daZZA6TwyMP5") {
      emailArr.push(`Yours sincerely, ${text}`);
    }
    //address handler
    if (field.id === "uLPPjjg5B0Bn") {
      emailArr.push(text);
    }
  });

  //adds 'main' content from emailString.Json
  emailArr.push(getRandomResponse(standard.sentence1));
  emailArr.push(getRandomResponse(standard.sentence2));
  emailArr.push(getRandomResponse(standard.sentence3));

  const responseData = {
    subject: getRandomResponse(subject),
    body: emailArr.join(" "),
  };
  return responseData;
};