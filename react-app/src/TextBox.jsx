import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import EdiText from "react-editext";

const socket = socketIOClient();

const TextBox = ({ responseId }) => {
  //the responseId comes from the embeded typeform
  const [state, setState] = useState({
    formToken: "", //the form token comes from the webhook response
    editedRes: "",
    generatedEmail: {},
  });

  useEffect(() => {
    let isMounted = true;
    socket.on("typeform-incoming", ({ formToken, generatedEmail }) => {
      // console.log(formToken, generatedEmail);
      if (isMounted) setState({ ...state, formToken: formToken });
      if (state.formToken === responseId) {
        setState({ ...state, generatedEmail: generatedEmail });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
  console.log(state);

  return (
    <EdiText
      viewContainerClassName="emailBox"
      type="textarea"
      inputProps={{
        placeholder: "your email will appear here", //placeholder isn't working
        rows: 10,
      }}
      saveButtonContent="Apply"
      cancelButtonContent={<strong>Cancel</strong>}
      editButtonContent="Edit Your Email"
      value={state.editedRes ? state.editedRes : state.generatedEmail.body} // validates the webhook response token against the response id from the embedded tyeform widget
      onSave={(val) => {
        setState({ ...state, editedRes: val }); //if the user edits the text box, a new property called editedResponse is set in state
      }}
    />
  );
};

export default TextBox;
