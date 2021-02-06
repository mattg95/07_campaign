import React from "react";

// import ArrowDown from "./assets/arrow-down.svg";

const IntroContent = () => (
  <div className="intro-content">
    <h1 className="title">0.7% Campaign</h1>
    <p className="intro-para">
      The 2019 Conservative Manifesto declared Britain would "proudly maintain
      our commitment to spend 0.7 per cent of GNI on development". But just one
      year later, the government intends to cut foreign aid indefinitely. At a
      time of unprecedented international crisis, with millions at risk of
      extreme poverty, Britain must show leadership - not break its commitments.
    </p>
    <div className="">
      <h2 className="secondary-header">
        1. Fill out the survey to email your MP
      </h2>
      <p className="explanation">
        <strong>We will draft an email</strong> based on your survey responses,
        <strong>written to have the maximum impact on your MP.</strong> With
        your help we can safeguard the support so many need.
      </p>
      {/* <a href="#typeform">
        <img
          src={ArrowDown}
          alt="arrow pointing down the webpage"
          className="arrow-down"
        />
      </a> */}
    </div>
  </div>
);
export default IntroContent;
