const emailStrings = require("./emailStrings.json");

const generateEmail = (formResponseData) => {
  // gil6UCe4dG9T : "I believe that it’s good for the UK government to provide aid to people in the developing world",
  // wKGNjgRDml1H : " Which of the following best reflect your motivations for supporting international aid/development?",
  // nfkfl48YcQLu : I have links with a country that is receiving or might receive aid",
  // MRPxTl6j1QAw : "Which country do you have links to?",
  // Z4awe4sDljLR : Which of the following best describes the links you have to this country?",
  // IdqRPd6SUMVh : "Which of the following religious backgrounds do you most identify with?",
  // EejpFBEzP9wK : Which of the following best describes your relationship with the Conservative Party?\n",
  // vdZgYVyiLE13 : Would you be willing to have a call/meeting with your MP?",
  // ghzBmQTQ2npF : Could you share your email address with us?",
  // uLPPjjg5B0Bn : Please enter your home address. ",
  // daZZA6TwyMP5 : "What is your name?",

  //this supports the order, do not remove unused variables
  const questionKeys = [
    "supportAid",
    "countyLinks",
    "whichCountry",
    "whatLinks",
    "conservative",
    "religion",
    "meetMp",
    "emailAddress",
    "homeAddress",
    "name",
  ];
  const answers = formResponseData.answers;
  const fields = formResponseData.definition.fields;

  const getRandomResponse = (inputArr) => {
    return inputArr[Math.floor(Math.random() * inputArr.length)];
  };

  const emailArr = [];

  const getAnswerSynoymns = (questionIndex) => {
    let choiceIndex = 0;
    fields[questionIndex].choices.forEach((choice, i) => {
      if (answers[questionIndex].choice.label === choice.label) {
        choiceIndex = i;
      }
    });
    return emailStrings.survey[questionKeys[questionIndex]][choiceIndex];
  };
  console.log(getAnswerSynoymns(4));
  answers.forEach((answer) => {
    if (answer.field.id === "EejpFBEzP9wK") {
      emailArr.push(getRandomResponse(getAnswerSynoymns(4)));
    }
    if (answer.field.id === "IdqRPd6SUMVh") {
      //religionHandler
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
