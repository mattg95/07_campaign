const { subject, survey, main } = require("./emailStrings.json");
const { getAnswerIndex, getRandomResponse } = require("./serverFunctions.js");
const {questionKeys, religions} = require("./serverKeys")

export const countryLinksHandler = () => {
  const choiceIndex:number = getAnswerIndex("Z4awe4sDljLR");
  const choiceObj: Object | undefined = survey[questionKeys["Z4awe4sDljLR"]][choiceIndex];
  if (choiceObj === undefined) return;
  else {
    const sentence: string = getRandomResponse(choiceObj.synonyms);
    const countryNameData = answers.find(
      ({ field: { id } }) => id === "MRPxTl6j1QAw"
    );
    const sentenceWithCountry = sentence.replace(
      /COUNTRY_NAME/g,
      countryNameData.text
    );
    return sentenceWithCountry;
  }
};

export const religionHandler = () => {
  const choiceIndex: number = getAnswerIndex("IdqRPd6SUMVh");
  if ([7, 8].includes(choiceIndex)) return;
  else {
    const { adj, noun } = religions[choiceIndex];
    let sentence: string = getRandomResponse(survey.religion);
    sentence = sentence
      .replace("RELIGIOUS_DENONYM_NOUN", noun)
      .replace("RELIGIOUS_DENONYM_ADJ", adj);
    return sentence
  }
};

export const motivationsHandler = () => {
  const thisId = "wKGNjgRDml1H";
  const thisField = fields.find(({ id }) => id === thisId);
  const thisAnswers = answers.find(({ field: { id } }) => id === thisId);
  let choiceIndex: number[] = [];
  //this gets the synomys array based on the index of the survey multiple choice-
  thisField.choices.forEach((choice, i) => {
    if (thisAnswers.choices.labels.includes(choice.label)) {
      choiceIndex.push(i);
    }
  });
  const synonymns = choiceIndex.map((ele) => {
    return survey[questionKeys[thisId]][ele];
  });
  const sentenceArr = synonymns.map((ele) => {
    return ele && getRandomResponse(ele.synonyms);
  });
  return sentenceArr.length ? sentenceArr.join(" ") || ""
  
};

export const conservativesHandler = () => {
  const choiceIndex: number = getAnswerIndex("EejpFBEzP9wK");
  // The first 3 choices for survey.conservative have sentences in emailStrings.json about being a conservative
  const memberOfConservatives: boolean = choiceIndex < 4;

   getMpByPostcode(postcode.text).then((mp) => {
    if (memberOfConservatives && mp.party === "Conservative") {
      const choiceIndex = getAnswerIndex("EejpFBEzP9wK");
      const choiceObj = survey[questionKeys["EejpFBEzP9wK"]][choiceIndex];
      if (choiceObj.synonyms.length > 0) {
        return getRandomResponse(choiceObj.synonyms)
      }
    }
    else return ""
  
  })
}
