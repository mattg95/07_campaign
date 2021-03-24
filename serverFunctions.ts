export const createGreeting = ({ name, full_name }) => {
  const salutation:string = getRandomResponse(main.greeting);
  const mpName = full_name ? full_name : name;
  return mpName ? `${salutation} ${mpName},\n\n` : "";
};

//this gets the index of the answer e.g. in a multiple choice, the first choice is index 0

export const getAnswerIndex = (idProp) => {
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

export const getRandomResponse = (inputArr:[]) => {
  return inputArr[Math.floor(Math.random() * inputArr.length)];
};
