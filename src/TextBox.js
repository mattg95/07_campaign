import React, { useState } from "react";
import EdiText from "react-editext";
import { Formik, Form } from "formik";
import Select from "react-select";

import PostCode from "./MpForm.js";

const emailStrings = require("./emailStrings.json");

const TextBox = () => {
  const [state, setState] = useState({
    q1Res: "",
    q2Res: "",
    q3Res: "",
    editedRes: "",
  });

  const getRandomRes = (inputArr) => {
    const randomNum = Math.floor(Math.random() * inputArr.length);
    return inputArr[randomNum];
  };

  return (
    <div className="surveyQuestions">
      <Formik>
        <Form>
          <label htmlFor="q1">
            Which of the following describes your relationship with the
            conservative government?
          </label>
          <Select
            options={emailStrings.survey[0]}
            name="q1"
            onChange={({ value }) => {
              setState({ ...state, q1Res: getRandomRes(value) });
            }}
          />
          <label htmlFor="q2">How do you feel about the aid budget cut?</label>
          <Select
            options={emailStrings.survey[1]}
            name="q2"
            onChange={({ value }) => {
              setState({ ...state, q2Res: getRandomRes(value) });
            }}
          />
          <label htmlFor="q3">Do you have family in developing countries</label>
          <Select
            options={emailStrings.survey[2]}
            name="q3"
            onChange={({ value }) => {
              setState({ ...state, q3Res: getRandomRes(value) });
            }}
          />
        </Form>
      </Formik>
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
      {console.log(state)}
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
