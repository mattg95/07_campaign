const emailStrings = require("./emailStrings.json");

const responseRandomizer = (response) => {
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
