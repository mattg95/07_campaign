/* eslint react-hooks/exhaustive-deps: 0 */ // --> turns eslint warning message off

import React from "react";
import EdiText from "react-editext";

import "reactjs-popup/dist/index.css";

const TextBox = ({ emailBody, passDataUpstream }) => {
  return (
    <div className="edit-email">
      <div>
        <h2 className="secondary-header send-email-header">Edit your email</h2>
        <p className="explanation">
          Personalising your email will distinguish it from others and is much
          more likely to grab your MP’s attention.
        </p>
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
      </div>
    </div>
  );
};

export default TextBox;
