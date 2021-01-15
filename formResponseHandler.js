const e = require("express");
const { subject, survey, standard } = require("./emailStrings.json");

exports.generateEmail = ({ answers, definition: { fields } }) => {
  //this could be replaced with an object to help order the email
  const emailArr = [];
  const emailObj = {
    conservative: "",
    main: "",
    countryLinks: "",
    religion: "",
    motivation: "",
    meetMp: "",
    signoff: "",
    name: "",
    address: "",
  };

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

  //this gets the index of the answer e.g. in a multiple choice, the first choice is index 0
  const getAnswerIndex = (idProp) => {
    let choiceIndex = 0;
    const thisField = fields.find(({ id }) => id === idProp);
    const thisAnswers = answers.find(({ field: { id } }) => id === idProp);
    //this gets the synomys array based on the index of the survey multiple choice options-
    thisField.choices.forEach((choice, i) => {
      if (thisAnswers.choice.label === choice.label) {
        choiceIndex = i;
      }
    });
    return choiceIndex;
  };

  //this is the 'router' that handles all question responses based on their id
  answers.forEach(({ text, field, choice }) => {
    //conservatives hanlder
    if (field.id === "EejpFBEzP9wK") {
      const choiceIndex = getAnswerIndex("EejpFBEzP9wK");
      const synonyms = survey[questionKeys["EejpFBEzP9wK"]][choiceIndex];
      synonyms && (emailObj.conservative = getRandomResponse(synonyms));
    }
    //religion handler
    if (field.id === "IdqRPd6SUMVh") {
      const choiceIndex = getAnswerIndex("IdqRPd6SUMVh");
      if ([6, 7, 8].includes(choiceIndex)) return;
      else {
        const sentence = getRandomResponse(survey.religion);
        const sentenceWithReligion = sentence.replace(
          /\[RELIGION\]/g,
          choice.label
        );
        emailObj.religion = sentenceWithReligion;
      }
    }
    //countryLinksHandler
    if (field.id === "Z4awe4sDljLR") {
      const choiceIndex = getAnswerIndex("Z4awe4sDljLR");
      const synonyms = survey[questionKeys["Z4awe4sDljLR"]][choiceIndex];
      if (synonyms === undefined) return;
      else {
        const sentence = getRandomResponse(synonyms);
        const counryNameData = answers.find(
          ({ field: { id } }) => id === "MRPxTl6j1QAw"
        );
        const sentenceWithCountry = sentence.replace(
          /COUNTRY_NAME/g,
          counryNameData.text
        );
        emailObj.countryLinks = sentenceWithCountry;
      }
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
      sentenceArr.length && (emailObj.motivation = sentenceArr.join(" "));
    }
    //name handler
    if (field.id === "daZZA6TwyMP5") {
      emailObj.name = `Yours sincerely,\n${text}`;
    }
    //address handler
    if (field.id === "uLPPjjg5B0Bn") {
      emailObj.address = text;
    }
  });

  //adds 'main' content from emailString.Json
  emailObj.main += getRandomResponse(standard.sentence1);
  emailObj.main += getRandomResponse(standard.sentence2);
  emailObj.main += getRandomResponse(standard.sentence3);

  const responseData = {
    subject: getRandomResponse(subject),
    body: Object.values(emailObj).join("\n"),
  };
  return responseData;
};
