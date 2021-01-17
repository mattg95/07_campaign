import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import EdiText from "react-editext";

import MpForm from "./FindMp";

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
  function copyToClipboard(text) {
    const el = document.createElement("textarea"); //creating a text area to be removed later (bit hacky)
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  return (
    <div>
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
      <button onClick={copyToClipboard(state.generatedEmail.body)}>
        Copy Email
      </button>

      <div className="text-center">
        <MpForm
          body={state.generatedEmail.body}
          subject={state.generatedEmail.subject}
        />
      </div>
    </div>
  );
};

export default TextBox;
