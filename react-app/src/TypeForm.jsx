import React, { useEffect, useRef, useState } from "react";
import * as typeformEmbed from "@typeform/embed";
import TextBox from "./TextBox";

const TypeForm = () => {
  const myRef = useRef(null);
  const [state, setState] = useState({ isClosed: false, responseId: "" });

  useEffect(() => {
    var element = document.getElementById("emailBox");
    typeformEmbed.makeWidget(
      myRef.current,
      `https://z8ivgb8lhnl.typeform.com/to/YbkRDwtc`,
      {
        hideFooter: true,
        hideHeaders: true,
        opacity: 0,
        onSubmit: ({ response_id }) => {
          setState({ ...state, responseId: response_id });
          setTimeout(() => {
            element.scrollIntoView();
            // setState({ ...state, isClosed: true });
          }, 3000);
        },
      }
    );
  }, [myRef]);

  return (
    <div>
      <div
        ref={myRef}
        className={`typeform-widget ${state.isClosed ? "closed" : ""}`}
        id="typeform"
      />
      <div id="emailBox">
        <TextBox responseId={state.responseId} />
      </div>
    </div>
  );
};

export default TypeForm;
