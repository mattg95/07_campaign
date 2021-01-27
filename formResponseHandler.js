const { getMpByPostcode } = require("./api-functions");
const { subject, survey, main } = require("./emailStrings.json");

exports.generateEmail = ({ answers, definition: { fields } }) => {
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
  ]);
  //these map the question ids from the form onto our json object
  const questionKeys = {
    gil6UCe4dG9T: "supportAid",
    wKGNjgRDml1H: "motivation",
    MRPxTl6j1QAw: "whichCountry",
    Z4awe4sDljLR: "countryLinks",
    EejpFBEzP9wK: "conservative",
    IdqRPd6SUMVh: "religion",
    vdZgYVyiLE13: "meetMp",
    ghzBmQTQ2npF: "emailAddress",
    uLPPjjg5B0Bn: "homeAddress",
    hgdzZ05GxSAs: "postcode",
    daZZA6TwyMP5: "name",
  };

  const religions = [
    { adj: "Christian", noun: "Christian" },
    { adj: "Muslim", noun: "Muslim" },
    { adj: "Hindu", noun: "Hindu" },
    { adj: "Sikh", noun: "Sikh" },
    { adj: "Jewish", noun: "Jew" },
    { adj: "Buddhist", noun: "Buddhist" },
    { adj: "religious", noun: "person of faith" },
  ];

  const getRandomResponse = (inputArr) => {
    return inputArr[Math.floor(Math.random() * inputArr.length)];
  };

  //this gets the index of the answer e.g. in a multiple choice, the first choice is index 0
  const getAnswerIndex = (idProp) => {
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
    return mpName ? `${salutation} ${mpName},\n` : "";
  };

  const populateMainResponseData = (emailMap, supportsAid, mp) => {
    //adds 'main' content from emailString.Json
    const mainContent =
      getRandomResponse(main.sentence1) +
      getRandomResponse(main.sentence2) +
      getRandomResponse(main.sentence3);
    emailMap.set("mainContent", mainContent);
    let emailbodyStr = "";
    console.log(emailMap);
    for (const [k, v] of emailMap) {
      if (k === "name") {
        emailbodyStr += v + `\n`;
      } else if (k === "address") {
        emailbodyStr += v;
      } else {
        v.length && (emailbodyStr += v + `\n\n`);
      }
    }
    const responseData = {
      mpData: mp,
      greeting: supportsAid ? createGreeting(mp) : "",
      subject: supportsAid ? getRandomResponse(subject) : "",
      body: supportsAid ? emailbodyStr : "",
    };

    console.log(responseData);
    return responseData;
  };

  //this is the 'router' that handles all question responses based on their id

  answers.forEach(({ text, field, choice }) => {
    if (field.id === "gil6UCe4dG9T") {
      if (choice.label === "No") {
        supportsAid = false;
      }
    }
    if (field.id === "EejpFBEzP9wK") {
      //conservatives handler
      const choiceIndex = getAnswerIndex("EejpFBEzP9wK");
      // The first 3 choices for survey.conservative have sentences in emailStrings.json about being a conservative
      memberOfConservatives = choiceIndex < 3;
    }

    //religion handler
    if (field.id === "IdqRPd6SUMVh") {
      const choiceIndex = getAnswerIndex("IdqRPd6SUMVh");
      if ([7, 8].includes(choiceIndex)) return;
      else {
        const { adj, noun } = religions[choiceIndex];
        let sentence = getRandomResponse(survey.religion);
        sentence = sentence
          .replace(/\[RELIGIOUS_DEMONYM_NOUN\]/g, noun)
          .replace(/\[RELIGIOUS_DEMONYM_ADJ\]/g, adj);
        emailMap.set("religion", sentence);
      }
    }
    //countryLinksHandler
    if (field.id === "Z4awe4sDljLR") {
      const choiceIndex = getAnswerIndex("Z4awe4sDljLR");
      const synonyms = survey[questionKeys["Z4awe4sDljLR"]][choiceIndex];
      if (synonyms === undefined) return;
      else {
        const sentence = getRandomResponse(synonyms);
        const countryNameData = answers.find(
          ({ field: { id } }) => id === "MRPxTl6j1QAw"
        );
        const sentenceWithCountry = sentence.replace(
          /COUNTRY_NAME/g,
          countryNameData.text
        );
        emailMap.set("countryLinks", sentenceWithCountry);
      }
    }
    //moivations handler
    // if (field.id === "wKGNjgRDml1H") {
    //   const thisId = "wKGNjgRDml1H";
    //   const thisField = fields.find(({ id }) => id === thisId);
    //   const thisAnswers = answers.find(({ field: { id } }) => id === thisId);
    //   let choiceIndex = [];
    //   //this gets the synomys array based on the index of the survey multiple choice-
    //   thisField.choices.forEach((choice, i) => {
    //     if (thisAnswers.choices.labels.includes(choice.label)) {
    //       choiceIndex.push(i);
    //     }
    //   });
    //   const synoynms = choiceIndex.map((ele) => {
    //     return survey[questionKeys[thisId]][ele];
    //   });
    //   const sentenceArr = synoynms.map((ele) => {
    //     ele && getRandomResponse(ele);
    //   });
    //   sentenceArr.length && (emailObj.motivation = sentenceArr.join(" "));
    // }
    //meetMp handler
    if (field.id === "vdZgYVyiLE13") {
      emailMap.set("meetMp", getRandomResponse(survey.meetMp));
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

  return getMpByPostcode(postcode.text).then((mp) => {
    if (memberOfConservatives && mp.party === "Conservative") {
      const choiceIndex = getAnswerIndex("EejpFBEzP9wK");
      const synonyms = survey[questionKeys["EejpFBEzP9wK"]][choiceIndex];
      if (synonyms.length > 0) {
        emailMap.set("conservative", getRandomResponse(synonyms));
      }
    }
    return populateMainResponseData(emailMap, supportsAid, mp);
  });
};
