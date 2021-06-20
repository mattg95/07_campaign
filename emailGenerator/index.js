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
const { religions, questionKeys } = require("./keys");

const generateEmail = ({ answers, definition: { fields } }) => {
  let supportsAid = true;
  let memberOfConservatives = false;
  const postcode = answers.find(({ field: { id } }) => id === "hgdzZ05GxSAs");

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
  //these map the question ids from the form onto our json object

  //this is the 'router' that handles all question responses based on their id

  answers.forEach(({ text, field, choice, phone_number }) => {
    if (field.id === "gil6UCe4dG9T") {
      if (choice.label === "No") {
        supportsAid = false;
      }
      return;
    }
    if (field.id === "EejpFBEzP9wK") {
      //conservatives handler
      const choiceIndex = getAnswerIndex("EejpFBEzP9wK", fields, answers);
      // The first 3 choices for survey.conservative have sentences in emailStrings.json about being a conservative
      memberOfConservatives = choiceIndex < 4;
    }

    //religion handler
    if (field.id === "IdqRPd6SUMVh") {
      const religions = religionHandler("IdqRPd6SUMVh", fields, answers);
      emailMap.set("religion", religions);
    }
    //countryLinksHandler
    if (field.id === "Z4awe4sDljLR") {
      const counryLinks = countryLinksHandler("Z4awe4sDljLR", fields, answers);
      emailMap.set("countryLinks", counryLinks);
    }
    // moivations handler
    if (field.id === "wKGNjgRDml1H") {
      const motivations = motivationHandler("wKGNjgRDml1H", fields, answers);
      emailMap.set("motivation", motivations);
    }
    //meetMp handler
    if (field.id === "vdZgYVyiLE13") {
      if (getAnswerIndex("vdZgYVyiLE13", fields, answers) === 0) {
        emailMap.set("meetMp", getRandomResponse(survey.meetMp));
      }
    }
    //meetMp double check hanlder
    if (field.id === "UhNb2Z5nqHtb") {
      if (getAnswerIndex("UhNb2Z5nqHtb", fields, answers) === 0) {
        emailMap.set("meetMp", getRandomResponse(survey.meetMp));
      }
    }

    //name handler
    if (field.id === "daZZA6TwyMP5") {
      const randomSignoff = getRandomResponse(main.signoff);
      emailMap.set("name", `${randomSignoff},\n${text}`);
    }
    //address handler
    if (field.id === "uLPPjjg5B0Bn") {
      emailMap.set("address", text);
    }
    // phone number handler
    if (field.id === "lm89BWs2VeY2") {
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
      const choiceIndex = getAnswerIndex("EejpFBEzP9wK", fields, answers);
      const choiceObj = survey[questionKeys["EejpFBEzP9wK"]][choiceIndex];
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

module.exports = { getRandomResponse, generateEmail };
