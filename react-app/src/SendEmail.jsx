import React from "react";

const sendEmail = ({ subject, body, mpEmailAddress }) => {
  return (
    <div className="send-email">
      <h2 className="secondary-header">4. Send your email</h2>
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
          encodeURIComponent(body)
        }
        className="btn btn-primary btn-lg cta send-button"
        target="_blank"
        rel="noreferrer"
      >
        SEND EMAIL
      </a>
    </div>
  );
};
export default sendEmail;
