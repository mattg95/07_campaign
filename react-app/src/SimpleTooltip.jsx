import React from "react";
import Warper from "./Warper";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

//

const SimpleTooltip = ({ message }) => {
  function copyToClipboard(text) {
    const el = document.createElement("textarea"); //creating a text area to be removed later (bit hacky)
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
  return (
    {
      message,
    },
    (
      <Popup
        trigger={(open) => (
          <button className="button" onClick={copyToClipboard(message)}>
            Copy Email
          </button>
        )}
        position="right center"
        closeOnDocumentClick
      >
        <span> Response copied to clipboard </span>
      </Popup>
    )
  );
};

export default Warper(SimpleTooltip);
