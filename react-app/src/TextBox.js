import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import EdiText from "react-editext";
const emailStrings = require("./emailStrings.json");

const socket = socketIOClient();

socket.on("connect", function () {
  console.log("client socket connected");
});
const TextBox = () => {
  const [state, setState] = useState({
    response: "",
    post: "",
    responseToPost: "",
  });
  useEffect(() => {}, []);

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
