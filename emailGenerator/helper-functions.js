const { main } = require("./emailStrings.json");

const getRandomResponse = (inputArr) => {
  return inputArr[Math.floor(Math.random() * inputArr.length)];
};

const getAnswerIndex = (idProp, fields, answers) => {
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

const createGreeting = ({ name, full_name }) => {
  salutation = getRandomResponse(main.greeting);
  const mpName = full_name ? full_name : name;
  return mpName ? `${salutation} ${mpName},\n\n` : "";
};
module.exports = { getRandomResponse, getAnswerIndex, createGreeting };
