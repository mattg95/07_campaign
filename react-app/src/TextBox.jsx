import React from "react";
import EdiText from "react-editext";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const TextBox = ({ editedRes, generatedEmail, passDataUpstream }) => {
  const copyToClipboard = () => {
    let text = "";
    text = editedRes ? editedRes : generatedEmail.body;
    const el = document.createElement("textarea"); //creating a text area to be removed later (bit hacky)
    el.value = text;
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
        <h2 className="secondary-header">3.Edit your email</h2>
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
          value={editedRes ? editedRes : generatedEmail.body} // validates the webhook response token against the response id from the embedded tyeform widget
          onSave={(val) => {
            passDataUpstream({ editedRes: val }); //if the user edits the text box, a new property called editedResponse is set in state
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
      </div>
    </div>
  );
};

export default TextBox;
