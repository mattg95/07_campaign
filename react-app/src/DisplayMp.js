import React from "react";

const DisplayMp = ({
  state: {
    data: { constituency, full_name, party },
    mpEmail,
    error,
  },
  body,
  subject,
}) => (
  <div>
    <div>{constituency}</div>
    <div>{full_name}</div>
    <div>{party}</div>
    {error && <div>{error}</div>}
    <a
      href={
        "mailto:" +
        mpEmail +
        "?Subject=" +
        encodeURIComponent(subject) +
        "&Body=" +
        encodeURIComponent(Object.values(body).join(" "))
      }
    >
      {mpEmail}
    </a>
  </div>
);
export default DisplayMp;
