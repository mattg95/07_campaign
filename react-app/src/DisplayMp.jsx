import React from "react";

const DisplayMp = ({
  mpData: { constituency, full_name, party, name, error, mpEmailAddress },
}) => {
  return (
    <div className="displayMP" id="displayMP">
      <h2 className="secondary-header">Find Your MP</h2>
      <div className="mpCard text-center">
        <div className="error">{error}</div>
        <div>{constituency}</div>
        <div>{name}</div>
        <div>{full_name}</div>
        <div>{party}</div>
        <div className="mpEmailAddress">{mpEmailAddress}</div>
      </div>
    </div>
  );
};
export default DisplayMp;
