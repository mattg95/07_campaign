import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import EdiText from "react-editext";

import MpForm from "./FindMp";
import SimpleTooltip from "./SimpleTooltip";

const socket = socketIOClient();

const TextBox = ({ responseId }) => {
  //the responseId comes from the embeded typeform
  const [state, setState] = useState({
    formToken: "", //the form token comes from the webhook response
    editedRes: "",
    copied: false,
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

  const copyToClipboard = () => {
    let text = "";
    text = state.editedRes ? state.editedRes : state.generatedEmail.body;
    const el = document.createElement("textarea"); //creating a text area to be removed later (bit hacky)
    el.value = text;
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
    document.body.removeChild(el);
    setState({ ...state, copied: true });
  };

  return (
    <div>
      {/* {Object.keys(state.generatedEmail).length !== 0 && ( */}
      <div>
        <h2 className="secondary-header">2.Edit your email</h2>
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
        <button onClick={() => copyToClipboard()}>
          Copy Email to Clipboard
        </button>
        <span>{state.copied && "Copied to clipboard"}</span>
        <div className="text-center">
          <MpForm
            body={state.generatedEmail.body}
            subject={state.generatedEmail.subject}
          />
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default TextBox;
