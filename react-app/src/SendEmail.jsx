import React from "react";

const sendEmail = ({ subject, body, mpEmailAddress, passDataUpstream }) => {
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
      <p className="explanation campaign-explanation">
        This will open your email service in a different tab
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
        SEND EMAIL
      </a>
    </div>
  );
};
export default sendEmail;
