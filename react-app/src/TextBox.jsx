import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import EdiText from "react-editext";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import MpForm from "./FindMp";

const socket = socketIOClient();

const TextBox = ({ responseId }) => {
  //the responseId comes from the embeded typeform
  const [state, setState] = useState({
    formToken: "", //the form token comes from the webhook response
    editedRes: "",
    copied: false,
    generatedEmail: { body: "your email will appear here" },
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

  function copyToClipboard() {
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
  }

  return (
    <div>
      {/* {Object.keys(state.generatedEmail).length !== 0 && ( */}
      <div>
        <h2 className="secondary-header">2.Edit your email</h2>
        <EdiText
          viewContainerClassName="emailBox"
          type="textarea"
          inputProps={{
            placeholder: "your email will appear here",
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

        <Popup
          trigger={(open) => <button className="button">Copy</button>}
          position="right center"
          closeOnDocumentClick
          onOpen={copyToClipboard}
        >
          <span> Copied to clipboard </span>
        </Popup>

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
