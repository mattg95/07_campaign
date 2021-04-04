const { getMpByPostcode } = require("../api-calls");
const {
  getRandomResponse,
  createGreeting,
  getAnswerIndex,
  getMainContent,
} = require("./helper-functions");
const { subject, survey, main } = require("./emailStrings.json");
const {
  motivationHandler,
  conservativeHandler,
  religionHandler,
  countryLinksHandler,
} = require("./responseHandlers");
const { questionKeys } = require("./keys");

const generateEmail = ({ answers, definition: { fields } }) => {
  let supportsAid = true;
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
  ]);

  answers.forEach(({ text, field, choice }) => {
    if (field.id === "gil6UCe4dG9T") {
      if (choice.label === "No") {
        supportsAid = false;
      }
      return;
    }
    //religion handler
    if (field.id === "IdqRPd6SUMVh") {
      religion = religionHandler("IdqRPd6SUMVh", fields, answers);
      emailMap.set("religion", religion);
    }
    //countryLinksHandler
    if (field.id === "Z4awe4sDljLR") {
      const countryLinks = countryLinksHandler("Z4awe4sDljLR", fields, answers);
      emailMap.set("countryLinks", countryLinks);
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
    const conservativeResponse = conservativeHandler(mp, fields, answers);
    emailMap.set("conservative", conservativeResponse);
    const mainContent = getMainContent();
    emailMap.set("mainContent", mainContent);

    let emailbodyStr = "";
    for (let [k, v] of emailMap) {
      if (k === "address") {
        v = v.replace(/,\s/g, ",\n");
        emailbodyStr += v;
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
