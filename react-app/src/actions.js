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
export const setEmailWithGreeting = (greeting) => {
  return {
    type: "generatedEmailBody/setEmailWithGreeting",
    payload: greeting,
  };
};
export const setPositiveTypeformResponse = (typeformResponse) => {
  return {
    type: "generatedEmailBody/setEmailWithGreeting",
    payload: typeformResponse,
  };
};
export const setGreeting = (greeting) => {
  return {
    type: "greeting/setGreeting",
    payload: greeting,
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
    type: "generatedEmailBody/copied",
  };
};
export const setResponseId = (id) => {
  return {
    type: "responseId/setResponseId",
    payload: id,
  };
};
