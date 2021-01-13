import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import EdiText from "react-editext";

const socket = socketIOClient();

const TextBox = ({ responseId }) => {
  //the responseId comes from the embeded typeform
  const [state, setState] = useState({
    formToken: "", //the form token comes from the webhook response
  });

  useEffect(() => {
    let isMounted = true;
    socket.on("typeform-incoming", ({ data: { form_response } }) => {
      if (isMounted) setState({ formToken: form_response.token });
    });
    return () => {
      isMounted = false;
    };
  }, []);

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
      value={responseId === state.formToken ? "data" : ""} // validates the webhook response token against the response id from the embedded tyeform widget
      // onSave={(val) => {
      //   setState({ ...state, editedRes: val }); //if the user edits the text box, a new property called editedResponse is set in state
      // }}
    />
  );
};

export default TextBox;
