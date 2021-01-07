import React from "react";

const DisplayMp = ({
  state: {
    data: { constituency, full_name, party, name },
  },
  body,
  subject,
}) => {
  const createMpEmail = () => {
    const mpName = full_name ? full_name : name;
    return mpName.toLowerCase().replace(" ", ".") + ".mp@parliament.uk";
  };
  return (
    <div className="mpCard">
      <div>{constituency}</div>
      <div>{name}</div>
      <div>{full_name}</div>
      <div>{party}</div>
      <div> {createMpEmail()}</div>
      <a
        href={
          "mailto:" +
          createMpEmail() +
          "?Subject=" +
          encodeURIComponent(subject) +
          "&Body=" +
          encodeURIComponent(Object.values(body).join(""))
        }
        className="btn btn-primary"
      >
        SEND EMAIL
      </a>
    </div>
  );
};
export default DisplayMp;
