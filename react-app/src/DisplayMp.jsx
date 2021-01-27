import React from "react";

const DisplayMp = ({
  mpData: { constituency, full_name, party, name, error },
  mpEmailAddress,
}) => (
  <div>
    <h2 className="secondary-header">2. Find Your Mp</h2>
    <div className="mpCard">
      <div>{error}</div>
      <div>{constituency}</div>
      <div>{name}</div>
      <div>{full_name}</div>
      <div>{party}</div>
      <div>{mpEmailAddress}</div>
    </div>
  </div>
);
export default DisplayMp;
