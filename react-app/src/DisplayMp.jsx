import React from "react";

const DisplayMp = ({
  data: { constituency, full_name, party, name },
  body = "",
  subject = "",
}) => {
  const createMpEmail = () => {
    const mpName = full_name ? full_name : name;
    return mpName.toLowerCase().replace(" ", ".") + ".mp@parliament.uk";
  };
  const createEmailBody = () => {
    const mpName = full_name ? full_name : name;
    return `Dear ${mpName},\n${Object.values(body).join("")}`;
  };
  return (
    <div>
      <div className="mpCard">
        <div>{constituency}</div>
        <div>{name}</div>
        <div>{full_name}</div>
        <div>{party}</div>
        <div> {createMpEmail()}</div>
      </div>
      <h2 className="secondary-header">4. Send your email</h2>
      <p className="explanation">
        This will open your email service in a different tab
      </p>
      <a
        href={
          "mailto:" +
          createMpEmail() +
          "?Subject=" +
          encodeURIComponent(subject) +
          "&Body=" +
          encodeURIComponent(createEmailBody())
        }
        className="btn btn-primary send-email-button"
        target="_blank"
      >
        SEND EMAIL
      </a>
    </div>
  );
};
export default DisplayMp;
