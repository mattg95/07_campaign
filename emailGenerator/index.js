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
    if (field.id === questionKeys.get("supportsAid")) {
      if (choice.label === "No") {
        supportsAid = false;
      }
      return;
    }
    if (field.id === questionKeys.get("religion")) {
      const religionChoiceIndex = getAnswerIndex(
        questionKeys.get("religion"),
        fields,
        answers
      );
      religion = religionHandler(religionChoiceIndex);
      emailMap.set("religion", religion);
    }
    if (field.id === questionKeys.get("countryLinks")) {
      const countryLinkschoiceIndex = getAnswerIndex(
        questionKeys.get("countryLinks"),
        fields,
        answers
      );
      const countryLinks = countryLinksHandler(
        countryLinkschoiceIndex,
        answers
      );
      emailMap.set("countryLinks", countryLinks);
    }
    if (field.id === questionKeys.get("motivation")) {
      const motivations = motivationHandler(
        questionKeys.get("motivation"),
        fields,
        answers
      );
      emailMap.set("motivation", motivations);
    }
    if (field.id === questionKeys.get("meetMp")) {
      if (getAnswerIndex(questionKeys.get("meetMp"), fields, answers) === 0) {
        emailMap.set("meetMp", getRandomResponse(survey.meetMp));
      }
    }
    if (field.id === questionKeys.get("meetMpDoubleCheck")) {
      if (
        getAnswerIndex(
          questionKeys.get("meetMpDoubleCheck"),
          fields,
          answers
        ) === 0
      ) {
        emailMap.set("meetMp", getRandomResponse(survey.meetMp));
      }
    }
    if (field.id === questionKeys.get("name")) {
      const randomSignoff = getRandomResponse(main.signoff);
      emailMap.set("name", `${randomSignoff},\n${text}`);
    }
    if (field.id === questionKeys.get("homeAddress")) {
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
    const conservativeChoiceIndex = getAnswerIndex(
      "EejpFBEzP9wK",
      fields,
      answers
    );
    const conservativeResponse = conservativeHandler(
      conservativeChoiceIndex,
      mp
    );
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
