const emailStrings = require("./react-app/src/emailStrings.json");

const responseRandomizer = (response) => {
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
  // eAT6GQ0TSZLz : Please enter your postcode",
  // daZZA6TwyMP5 : "What is your name?",

  let index = 0;
  const answers = response.answers;
  const fields = response.definition.fields;
  let choices = fields[0].choices;
  choices.forEach((choice, i) => {
    if (answers[0].choice.label === choice.label) {
      index = i;
    }
  });
  console.log(index);
  //   console.log(response.answers);
  //   console.log(response.definition.fields);

  const getRandomRes = (inputArr) => {
    const responswewant = inputArr[index];
    const randomNum = Math.floor(Math.random() * responswewant.value.length);
    return responswewant.value[randomNum];
  };
  console.log(emailStrings.survey);
  console.log(getRandomRes(emailStrings.survey[0]));
};

export default responseRandomizer;
