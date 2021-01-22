const { getMpByPostcode } = require("./api-functions");
const { subject, survey, main } = require("./emailStrings.json");

exports.generateEmail = ({ answers, definition: { fields } }) => {
  let supportsAid = true;

  const emailObj = {
    supportsAid: "",
    conservative: "",
    main: "",
    countryLinks: "",
    religion: "",
    motivation: "",
    meetMp: "",
    signoff: "",
    name: "",
    address: "",
  };

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

  async function asyncForEach(array, callback) {
    // modifies version of forEach, taken from https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
    for (let index = 0; index < array.length; index += 1) {
      await callback(array[index], index, array);
    }
  }

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
  //this is the 'router' that handles all question responses based on their id

  //codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
  https: const start = async () => {
    await asyncForEach(answers, async (answer) => {
      const { text, field, choice } = answer;
      if (field.id === "gil6UCe4dG9T") {
        if (choice.label === "No") {
          supportsAid = false;
        }
      }
      if (field.id === "EejpFBEzP9wK") {
        //conservatives hanlder
        const postcode = answers.find(
          ({ field: { id } }) => id === "hgdzZ05GxSAs"
        );

        const MP = await getMpByPostcode(postcode.text).then((mp) => {
          if (mp.party === "Conservative") {
            return "hey";
            const choiceIndex = getAnswerIndex("EejpFBEzP9wK");
            const synonyms = survey[questionKeys["EejpFBEzP9wK"]][choiceIndex];
            if (synonyms.length > 0) {
              emailObj.conservative = getRandomResponse(synonyms);
            }
          }
        });
        console.log(MP);
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
          emailObj.religion = sentence;
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
          emailObj.countryLinks = sentenceWithCountry;
        }
      }
      //moivations handler
      if (field.id === "wKGNjgRDml1H") {
        const thisId = "wKGNjgRDml1H";
        const thisField = fields.find(({ id }) => id === thisId);
        const thisAnswers = answers.find(({ field: { id } }) => id === thisId);
        let choiceIndex = [];
        //this gets the synomys array based on the index of the survey multiple choice-
        thisField.choices.forEach((choice, i) => {
          if (thisAnswers.choices.labels.includes(choice.label)) {
            choiceIndex.push(i);
          }
        });
        const synoynms = choiceIndex.map((ele) => {
          return survey[questionKeys[thisId]][ele];
        });
        const sentenceArr = synoynms.map((ele) => {
          ele && getRandomResponse(ele);
        });
        sentenceArr.length && (emailObj.motivation = sentenceArr.join(" "));
      }
      //name handler
      if (field.id === "daZZA6TwyMP5") {
        emailObj.name = `Yours sincerely,\n${text}`;
      }
      //address handler
      if (field.id === "uLPPjjg5B0Bn") {
        emailObj.address = text;
      }
    });
    return emailObj;
  };
  console.log(start());
  //adds 'main' content from emailString.Json
  emailObj.main += getRandomResponse(main.sentence1);
  emailObj.main += getRandomResponse(main.sentence2);
  emailObj.main += getRandomResponse(main.sentence3);
  const responseData = {
    subject: supportsAid ? getRandomResponse(subject) : "",
    body: supportsAid ? Object.values(emailObj).join("\n") : "",
  };
  return responseData;
};
