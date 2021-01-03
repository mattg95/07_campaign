import React, { useState, useEffect, useRef } from "react";
import EdiText from "react-editext";

import PostCode from "./MpForm.js";
import * as typeformEmbed from "@typeform/embed";

const emailStrings = require("./emailStrings.json");

const TextBox = () => {
  const myRef = useRef(null);
  const [state, setState] = useState({
    q1Res: "",
    q2Res: "",
    q3Res: "",
    editedRes: "",
  });
  useEffect(() => {
    typeformEmbed.makeWidget(
      myRef.current,
      `https://z8ivgb8lhnl.typeform.com/to/YbkRDwtc`,
      {
        hideFooter: true,
        hideHeaders: true,
        opacity: 50,
      }
    );
  }, [myRef]);

  const getRandomRes = (inputArr) => {
    const randomNum = Math.floor(Math.random() * inputArr.length);
    return inputArr[randomNum];
  };

  return (
    <div className="surveyQuestions">
      <div ref={myRef} />
      <EdiText
        viewContainerClassName="emailBox"
        type="text"
        inputProps={{
          placeholder: "your email will appear here", //placeholder isn't working
          rows: 5,
        }}
        saveButtonContent="Apply"
        cancelButtonContent={<strong>Cancel</strong>}
        editButtonContent="Edit Your Email"
        value={Object.values(state).join(" ")} //converts state object into a string to display
        onSave={(val) => {
          setState({ ...state, editedRes: val }); //if the user edits the text box, a new property called editedResponse is set in state
        }}
      />
      <PostCode
        body={
          state.editedRes.length
            ? state.editedRes
            : Object.values(state).join(" ") //if the user has edited the email, use the edited email. else join the responses
        }
        subject={getRandomRes(emailStrings.subject)} //subject is randomised
      />
    </div>
  );
};

export default TextBox;
