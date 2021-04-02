const getRandomResponse = (inputArr) => {
  return inputArr[Math.floor(Math.random() * inputArr.length)];
};

module.exports = { getRandomResponse };
