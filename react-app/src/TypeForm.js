import React, { useEffect, useRef, useState } from "react";
import * as typeformEmbed from "@typeform/embed";
import TextBox from "./TextBox";

const TypeForm = () => {
  const myRef = useRef(null);
  const [state, setState] = useState("");

  useEffect(() => {
    typeformEmbed.makeWidget(
      myRef.current,
      `https://z8ivgb8lhnl.typeform.com/to/YbkRDwtc`,
      {
        hideFooter: true,
        hideHeaders: true,
        opacity: 0,
        onSubmit: ({ response_id }) => setState(response_id),
      }
    );
  }, [myRef]);

  return (
    <div>
      <div ref={myRef} className="typeform-widget" />
      <TextBox responseId={state} />
    </div>
  );
};

export default TypeForm;
