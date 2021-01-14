const emailStrings = require("./emailStrings.json");

const generateEmail = (formResponseData) => {
  const questionKeys = {
    gil6UCe4dG9T: "supportAid",
    wKGNjgRDml1H: "motivations",
    nfkfl48YcQLu: "countryLinks",
    MRPxTl6j1QAw: "whichCountry",
    Z4awe4sDljLR: "typeofLinks",
    EejpFBEzP9wK: "conservative",
    IdqRPd6SUMVh: "religion",
    vdZgYVyiLE13: "meetMp",
    ghzBmQTQ2npF: "emailAddress",
    uLPPjjg5B0Bn: "homeAddress",
    daZZA6TwyMP5: "name",
  };
  const answers = formResponseData.answers;
  const fields = formResponseData.definition.fields;

  const emailArr = [];

  const getRandomResponse = (inputArr) => {
    return inputArr[Math.floor(Math.random() * inputArr.length)];
  };

  const getAnswerSynoymns = (idProp) => {
    const thisField = fields.find(({ id }) => id === idProp);
    const thisAnswers = answers.find(({ field: { id } }) => id === idProp);
    let choiceIndex = 0;
    thisField.choices.forEach((choice, i) => {
      if (thisAnswers.choice.label === choice.label) {
        choiceIndex = i;
      }
    });
    console.log(questionKeys[idProp]);
    return emailStrings.survey[questionKeys[idProp]] ? [choiceIndex] : [];
  };

  console.log(formResponseData);
  answers.forEach((answer) => {
    if (answer.field.id === "EejpFBEzP9wK") {
      emailArr.push(getRandomResponse(getAnswerSynoymns("EejpFBEzP9wK")));
    }
    if (answer.field.id === "IdqRPd6SUMVh") {
      // emailArr.push(getRandomResponse(getAnswerSynoymns(5)));
    }
    if (answer.field.id === "MRPxTl6j1QAw") {
      //countryNameHandler
    }
    if (answer.field.id === "Z4awe4sDljLR") {
      //countryLinksHandler
    }
    if (answer.field.id === "wKGNjgRDml1H") {
      //motivation Hanlder
    }
    if (answer.field.id === "daZZA6TwyMP5") {
      //nameHanlder
      emailArr.push(`Yours sincerely, ${answer.text}`);
    }
    if (answer.field.id === "uLPPjjg5B0Bn") {
      //address Hanlder
      emailArr.push(answer.text);
    }
  });

  const responseData = {
    subject: getRandomResponse(emailStrings.subject),
    body: emailArr.join(" "),
  };
  console.log(responseData);
};

exports.generateEmail = generateEmail;
