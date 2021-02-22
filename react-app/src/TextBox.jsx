/* eslint react-hooks/exhaustive-deps: 0 */ // --> turns eslint warning message off

import React from "react";
import EdiText from "react-editext";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const TextBox = ({ emailBody, passDataUpstream }) => {
  const copyToClipboard = () => {
    const el = document.createElement("textarea"); //creating a text area to be removed later (bit hacky)
    el.value = emailBody;
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
    document.body.removeChild(el);
    passDataUpstream({ copied: true });
  };

  return (
    <div>
      <div>
        <h2 className="secondary-header">Edit your email</h2>
        <EdiText
          viewContainerClassName="emailBox"
          type="textarea"
          inputProps={{
            placeholder: "Your email will appear here",
          }}
          saveButtonContent="Apply"
          cancelButtonContent={<strong>Cancel</strong>}
          editButtonContent="Edit Your Email"
          value={emailBody} // validates the webhook response token against the response id from the embedded tyeform widget
          onSave={(val) => {
            passDataUpstream({ emailWithGreeting: val }); //if the user edits the text box, a new property called editedResponse is set in state
          }}
        />

        <Popup
          trigger={(open) => (
            <div className="copy-button-container">
              <button className="btn btn-outline-primary copy-button">
                Copy
              </button>
            </div>
          )}
          closeOnDocumentClick
          onOpen={copyToClipboard}
          className="copy-popup"
        >
          <span> Copied to clipboard </span>
        </Popup>
        <p className="explanation">
          Personalising your email will distinguish it from others and is much
          more likely to grab your MP’s attention.
        </p>
      </div>
    </div>
  );
};

export default TextBox;
