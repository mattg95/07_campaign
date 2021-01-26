import React from "react";

const sendEmail = ({
  mpData: { full_name, name },
  generatedEmail,
  mpEmailAddress,
}) => {
  const createEmailBody = () => {
    const mpName = full_name ? full_name : name;
    return `Dear ${mpName},\n${Object.values(generatedEmail.body).join("")}`;
  };
  return (
    <div>
      <h2 className="secondary-header">4. Send your email</h2>
      <a
        href={
          "mailto:" +
          mpEmailAddress +
          "?Subject=" +
          encodeURIComponent(generatedEmail.subject) +
          "&Body=" +
          encodeURIComponent(createEmailBody())
        }
        className="btn btn-primary send-email-button"
        target="_blank"
      >
        SEND EMAIL
      </a>
      <p className="explanation">
        This will open your email service in a different window
      </p>
    </div>
  );
};
export default sendEmail;
