/* eslint react-hooks/exhaustive-deps: 0 */ // --> turns eslint warning message off

import React from "react";
import EdiText from "react-editext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { setCopied, setEmailWithGreeting } from "../redux/actions";

import { store } from "../redux/store";

const TextBox = () => {
  const { emailWithGreeting } = store.getState();
  const copyToClipboard = (itemToCopy) => {
    const el = document.createElement("textarea"); //creating a text area to be removed later (bit hacky)
    el.value = itemToCopy;
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied();
  };
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
            rows: 15,
          }}
          saveButtonContent="Apply"
          cancelButtonContent={<strong>Cancel</strong>}
          editButtonContent="Edit Your Email"
          editOnViewClick={true}
          value={emailWithGreeting} // validates the webhook response token against the response id from the embedded tyeform widget
          onSave={(val) => {
            setEmailWithGreeting(val);
          }}
        />
        <Popup
          trigger={() => (
            <div className="copy-button-container">
              <button className="btn btn-outline-primary copy-button">
                Copy
              </button>
            </div>
          )}
          closeOnDocumentClick
          onOpen={() => copyToClipboard(emailWithGreeting)}
          className="copy-popup"
        >
          <span> Copied to clipboard </span>
        </Popup>
      </div>
    </div>
  );
};

export default TextBox;
