import React, { useEffect, useState } from "react";
import EdiText from "react-editext";

const emailStrings = require("./emailStrings.json");

const TextBox = () => {
  const [state, setState] = useState({
    response: "",
    post: "",
    responseToPost: "",
  });
  useEffect(() => {
    const callApi = async () => {
      const response = await fetch("/api/webhook");
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);

      return body;
    };
    callApi()
      .then((res) => setState({ response: res.express }))
      .catch((err) => console.log(err));
  }, []);

  console.log(state);

  const getRandomRes = (inputArr) => {
    const randomNum = Math.floor(Math.random() * inputArr.length);
    return inputArr[randomNum];
  };

  return (
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
      // value={Object.values(state).join(" ")} //converts state object into a string to display
      onSave={(val) => {
        setState({ ...state, editedRes: val }); //if the user edits the text box, a new property called editedResponse is set in state
      }}
    />
  );
};

export default TextBox;
