const { subject, survey, main } = require("./emailStrings.json");

exports.generateEmail = ({ answers, definition: { fields } }) => {
  //this could be replaced with an object to help order the email
  const emailObj = {
    supportsAid: true,
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

  const conservativeHandler = (id) => {
    const choiceIndex = getAnswerIndex(id);
    const synonyms = survey[questionKeys[id]][choiceIndex];
    return synonyms && (emailObj.conservative = getRandomResponse(synonyms));
  };

  const religionHandler = (id, choice) => {
    const choiceIndex = getAnswerIndex(id);
    if ([6, 7, 8].includes(choiceIndex)) return;
    else {
      const sentence = getRandomResponse(survey.religion);
      const sentenceWithReligion = sentence.replace(
        /\[RELIGION\]/g,
        choice.label
      );
      return (emailObj.religion = sentenceWithReligion);
    }
  };

  const countryLinksHandler = (id) => {
    const choiceIndex = getAnswerIndex(id);
    const synonyms = survey[questionKeys[id]][choiceIndex];
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
      return (emailObj.countryLinks = sentenceWithCountry);
    }
  };

  const motivationsHandler = (thisId) => {
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
    return sentenceArr.length && (emailObj.motivation = sentenceArr.join(" "));
  };

  //this is the 'router' that handles all question responses based on their id
  answers.forEach(({ text, field, choice }) => {
    if (field.id === "gil6UCe4dG9T") {
      emailObj.supportsAid = false;
    }
    if (field.id === "EejpFBEzP9wK") {
      conservativeHandler("EejpFBEzP9wK");
    }
    if (field.id === "IdqRPd6SUMVh") {
      religionHandler("IdqRPd6SUMVh", choice);
    }
    if (field.id === "Z4awe4sDljLR") {
      countryLinksHandler("Z4awe4sDljLR");
    }
    if (field.id === "wKGNjgRDml1H") {
      motivationsHandler("wKGNjgRDml1H");
    }
    if (field.id === "daZZA6TwyMP5") {
      emailObj.name = `Yours sincerely,\n${text}`;
    }
    if (field.id === "uLPPjjg5B0Bn") {
      emailObj.address = text;
    }
  });

  //adds 'main' content from emailString.Json
  emailObj.main += getRandomResponse(main.sentence1);
  emailObj.main += getRandomResponse(main.sentence2);
  emailObj.main += getRandomResponse(main.sentence3);

  const responseData = {
    subject: emailObj.supportsAid ? getRandomResponse(subject) : "",
    body: emailObj.supportsAid ? Object.values(emailObj).join("\n") : "",
  };
  return responseData;
};
