const { getMpByPostcode } = require("../api-calls");
const {
  getRandomResponse,
  getAnswerIndex,
  createGreeting,
} = require("./helper-functions");
const { subject, survey, main } = require("./emailStrings.json");
const {
  motivationHandler,
  countryLinksHandler,
  religionHandler,
} = require("./responseHandlers");
const { questionKeys } = require("./keys");

const generateEmail = ({ answers, definition: { fields } }) => {
  let supportsAid = true;
  let memberOfConservatives = false;
  const postcode = answers.find(
    ({ field: { id } }) => id === questionKeys["postcode"]
  );

  const emailMap = new Map([
    ["conservative", ""],
    ["mainContent", ""],
    ["countryLinks", ""],
    ["religion", ""],
    ["motivation", ""],
    ["meetMp", ""],
    ["name", ""],
    ["address", ""],
    ["phoneNumber", ""],
  ]);
  //this is the 'router' that handles all question responses based on their id

  answers.forEach(({ text, field, choice, phone_number }) => {
    if (field.id === questionKeys["supportAid"]) {
      if (choice.label === "No") {
        supportsAid = false;
      }
      return;
    }

    if (field.id === questionKeys["conservative"]) {
      const choiceIndex = getAnswerIndex(
        questionKeys["conservative"],
        fields,
        answers
      );
      // The first 3 choices for survey.conservative have sentences in emailStrings.json about being a conservative
      memberOfConservatives = choiceIndex < 4;
    }

    if (field.id === questionKeys["religion"]) {
      const religions = religionHandler(
        questionKeys["religion"],
        fields,
        answers
      );
      emailMap.set("religion", religions);
    }

    if (field.id === questionKeys["countryLinks"]) {
      const counryLinks = countryLinksHandler(
        questionKeys["countryLinks"],
        fields,
        answers
      );
      emailMap.set("countryLinks", counryLinks);
    }

    if (field.id === questionKeys["motivation"]) {
      const motivations = motivationHandler(
        questionKeys["motivation"],
        fields,
        answers
      );
      emailMap.set("motivation", motivations);
    }

    if (field.id === questionKeys["meetMp"]) {
      if (getAnswerIndex(questionKeys["meetMp"], fields, answers) === 0) {
        emailMap.set("meetMp", getRandomResponse(survey.meetMp));
      }
    }

    if (field.id === questionKeys["meetMpDoubleCheck"]) {
      if (
        getAnswerIndex(questionKeys["meetMpDoubleCheck"], fields, answers) === 0
      ) {
        emailMap.set("meetMp", getRandomResponse(survey.meetMp));
      }
    }

    if (field.id === questionKeys["name"]) {
      const randomSignoff = getRandomResponse(main.signoff);
      emailMap.set("name", `${randomSignoff},\n${text}`);
    }

    if (field.id === questionKeys["homeAddress"]) {
      emailMap.set("address", text);
    }

    if (field.id === questionKeys["phoneNumber"]) {
      emailMap.set("phoneNumber", phone_number);
    }
  });

  if (!supportsAid) {
    return Promise.resolve({
      supportsAid: false,
      mpData: {},
      greeting: "",
      subject: "",
      body: "",
    });
  }

  return getMpByPostcode(postcode.text).then((mp) => {
    if (memberOfConservatives && mp.party === "Conservative") {
      const choiceIndex = getAnswerIndex(
        questionKeys["conservative"],
        fields,
        answers
      );
      const choiceObj = survey.conservative[choiceIndex];
      if (choiceObj.synonyms.length > 0) {
        emailMap.set("conservative", getRandomResponse(choiceObj.synonyms));
      }
    }

    //adds 'main' content from emailString.Json
    const mainContent =
      getRandomResponse(main.sentence1) +
      " " +
      getRandomResponse(main.sentence2) +
      " " +
      getRandomResponse(main.sentence3);
    emailMap.set("mainContent", mainContent);

    let emailbodyStr = "";
    for (let [k, v] of emailMap) {
      if (k === "address") {
        v = v.replace(/,\s/g, ",\n");
        emailbodyStr += v + `\n`;
      } else {
        v.length && (emailbodyStr += v + `\n\n`);
      }
    }
    const responseData = {
      supportsAid: true,
      mpData: mp,
      greeting: createGreeting(mp),
      subject: getRandomResponse(subject),
      body: emailbodyStr,
    };
    return responseData;
  });
};

module.exports = { generateEmail };
