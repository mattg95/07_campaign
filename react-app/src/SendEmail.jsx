import React from "react";

const sendEmail = ({ subject, body, mpEmailAddress, passDataUpstream }) => {
  return (
    <div className="send-email">
      <h2 className="secondary-header">Send your email</h2>
      <p className="explanation">
        This will open your email service in a different window
      </p>
      <a
        href={
          "mailto:" +
          mpEmailAddress +
          "?Subject=" +
          encodeURIComponent(subject) +
          "&Body=" +
          encodeURIComponent(body) +
          "&bcc=campaign@point7percent.org"
        }
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
