export const setEmailBody = (emailBody) => {
  return {
    type: "generatedEmailBody/setEmailBody",
    payload: emailBody,
  };
};
export const setEmailSubject = (emailSubject) => {
  return {
    type: "generatedEmailSubject/setEmailSubject",
    payload: emailSubject,
  };
};
export const setMpData = (mpData) => {
  return {
    type: "mpData/setMpData",
    payload: mpData,
  };
};
export const setGreeting = (greeting) => {
  console.log(greeting);
  return {
    type: "greeting/setGreeting",
    payload: greeting,
  };
};
export const setEmailWithGreeting = (emailWithGreeting) => {
  return {
    type: "generatedEmailBody/setEmailWithGreeting",
    payload: emailWithGreeting,
  };
};
export const setPositiveTypeformResponse = (typeformResponse) => {
  return {
    type: "typeFormResponse/setPositiveTypeformResponse",
    payload: typeformResponse,
  };
};

export const setWindowWidth = (width) => {
  return {
    type: "windowWidth/setWindowWidth",
    payload: width,
  };
};
export const setEmailVisible = () => {
  return {
    type: "emailVisible/setEmailVisible",
  };
};
export const setEmailSent = () => {
  return {
    type: "emailSent/setEmailSent",
  };
};
export const setCopied = () => {
  return {
    type: "generatedEmailBody/setCopied",
  };
};
export const setResponseId = (id) => {
  return {
    type: "responseId/setResponseId",
    payload: id,
  };
};
