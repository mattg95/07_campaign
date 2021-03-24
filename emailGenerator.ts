import { conservativesHandler } from "./formResponseHandlers";

const { getMpByPostcode } = require("./apiCalls");
const {
  getRandomResponse,
  getAnswerIndex,
  createGreeting,
} = require("./serverFunctions");
const { religions, questionKeys } = require("./serverKeys");
const { subject, survey, main } = require("./emailStrings.json");
const {
  countryLinksHandler,
  religionHandler,
  motivationsHandler,
} = require("./formResponseHandlers");

exports.generateEmail = ({ answers, definition: { fields } }) => {
  let supportsAid: boolean = true;
  let memberOfConservatives: boolean = false;
  const postcode: string | undefined = answers.find(({ field: { id } }) => id === "hgdzZ05GxSAs");

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

  //this is the 'router' that handles all question responses based on their id

  answers.forEach(({ text, field, choice }) => {
    if (field.id === "gil6UCe4dG9T") {
      if (choice.label === "No") {
        supportsAid = false;
        return Promise.resolve({
          supportsAid: false,
          mpData: {},
          greeting: "",
          subject: "",
          body: "",
        });
      }
      return;
    }
    if (field.id === "EejpFBEzP9wK") {
      //conservatives handler
      emailMap.set("conservative", conservativesHandler());
   
    }
    //religion handler
    if (field.id === "IdqRPd6SUMVh") {
      emailMap.set("religion", religionHandler());
    }
    //countryLinksHandler
    if (field.id === "Z4awe4sDljLR") {
      emailMap.set("countryLinks", countryLinksHandler());
    }
    // moivations handler
    if (field.id === "wKGNjgRDml1H") {
      emailMap.set("motivation", motivationsHandler());
    }
    //meetMp handler
    if (field.id === "vdZgYVyiLE13") {
      if (getAnswerIndex("vdZgYVyiLE13") === 0) {
        emailMap.set("meetMp", getRandomResponse(survey.meetMp));
      }
    }
    //meetMp double check hanlder
    if (field.id === "UhNb2Z5nqHtb") {
      if (getAnswerIndex("UhNb2Z5nqHtb") === 0) {
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
        emailbodyStr += v;
      } else {
        v.length && (emailbodyStr += v + `\n\n`);
      }
    }
    return Promise.resolve({
      supportsAid: true,
      mpData: mp,
      greeting: createGreeting(mp),
      subject: getRandomResponse(subject),
      body: emailbodyStr,
    });
     
    
};
