import React from "react";
import Popup from "reactjs-popup";

const sendEmail = ({ subject, body, mpEmailAddress, passDataUpstream }) => {
  const copyToClipboard = (itemToCopy) => {
    const el = document.createElement("textarea"); //creating a text area to be removed later (bit hacky)
    el.value = itemToCopy;
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
    document.body.removeChild(el);
    passDataUpstream({ copied: true });
  };

  const getFullEmailLink = (mpEmailAddress) =>
    mpEmailAddress +
    "?Subject=" +
    encodeURIComponent(subject) +
    "&Body=" +
    encodeURIComponent(body) +
    "&bcc=campaign@point7percent.org";

  return (
    <div className="send-email">
      <h2 className="secondary-header send-email-header">Send your email</h2>
      <p className="explanation send-explanation">
        We don't send the email from our servers as it has more impact if it
        comes from your email address. Click 'Open email service' to be sent to
        your default email service.
      </p>
      <a
        href={"mailto:" + getFullEmailLink(mpEmailAddress)}
        className="btn btn-primary btn-lg cta send-button"
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          passDataUpstream({ emailSent: true });
        }}
      >
        OPEN EMAIL SERVICE
      </a>
      <p className="explanation">
        Alternatively, you can copy and paste the email and MP email address
        into your email service manually.
      </p>
      <div className="popup-container">
        <Popup
          trigger={() => (
            <div className="copy-button-container">
              <button className="btn btn-outline-primary copy-button">
                Copy MP email address
              </button>
            </div>
          )}
          closeOnDocumentClick
          onOpen={() => copyToClipboard(mpEmailAddress)}
          className="copy-popup"
        >
          <span> Copied to clipboard </span>
        </Popup>
        <Popup
          trigger={() => (
            <div className="copy-button-container">
              <button className="btn btn-primary copy-button">
                Copy email
              </button>
            </div>
          )}
          closeOnDocumentClick
          onOpen={() => {
            copyToClipboard(body);
            passDataUpstream({ emailSent: true });
          }}
          className="copy-popup"
        >
          <span> Copied to clipboard </span>
        </Popup>
      </div>
      <p className="explanation campaign-explanation">
        Your email will also be send to campaign@point7percent.org for campaign
        monitoring
      </p>
    </div>
  );
};
export default sendEmail;
