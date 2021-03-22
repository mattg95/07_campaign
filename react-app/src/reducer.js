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
  if (action.type === "generatedEmailBody/setMpData") {
    return {
      ...state,
      mpData: action.payload,
    };
  }
  if (action.type === "generatedEmailBody/setGreeting") {
    return {
      ...state,
      emailWithGreeting: action.payload,
    };
  }
  if (action.type === "generatedEmailBody/setGreeting") {
    return {
      ...state,
      emailWithGreeting: action.payload,
    };
  }
  if (action.type === "generatedEmailBody/copied") {
    return {
      ...state,
      copied: true,
    };
  }
  return state;
}
