//reducer
const initialState = {
  width: window.innerWidth,
  responseId: "",
  mpData: { error: "Could not find MP", name: "", full_name: "" },
  generatedEmailBody: "Your email will appear here",
  emailSubject: "",
  positiveTypeFormResponseReturned: false,
  greeting: "",
  emailWithGreeting: "",
  emailVisible: false,
  emailSent: false,
};

export function reducer(state = initialState, action) {
  if (action.type === "generatedEmailBody/setEmailBody") {
    return {
      ...state,
      generatedEmailBody: action.payload,
    };
  }
  if (action.type === "generatedEmailSubject/setEmailSubject") {
    return {
      ...state,
      emailSubject: action.payload,
    };
  }
  if (action.type === "mpData/setMpData") {
    return {
      ...state,
      mpData: action.payload,
    };
  }
  if (action.type === "generatedEmailBody/setEmailWithGreeting") {
    return {
      ...state,
      emailWithGreeting: action.payload,
    };
  }
  if (action.type === "windowWidth/setWindowWidth") {
    return {
      ...state,
      width: action.payload,
    };
  }
  if (action.type === "generatedEmailBody/setGreeting") {
    return {
      ...state,
      greeting: action.payload,
    };
  }
  if (action.type === "typeFormReturned/setPositiveTypeFormResponse") {
    return {
      ...state,
      positiveTypeFormResponseReturned: action.payload,
    };
  }
  if (action.type === "generatedEmailBody/setCopied") {
    return {
      ...state,
      copied: true,
    };
  }
  if (action.type === "emailVisible/setEmailVisible") {
    return {
      ...state,
      emailVisible: true,
    };
  }
  if (action.type === "emailSent/setEmailSent") {
    return {
      ...state,
      emailSent: true,
    };
  }
  if (action.type === "responseId/setResponseId") {
    return {
      ...state,
      responseId: action.payload,
    };
  }
  if (action.type === "typeFormResponse/setPositiveTypeformResponse") {
    return {
      ...state,
      positiveTypeFormResponseReturned: action.payload,
    };
  }
  return state;
}
