import React, { useEffect, useRef } from "react";
import * as typeformEmbed from "@typeform/embed";

const TypeForm = ({ passDataUpstream }) => {
  const myRef = useRef(null);

  useEffect(() => {
    const textBox = document.getElementById("textBox");
    typeformEmbed.makeWidget(
      myRef.current,
      `https://z8ivgb8lhnl.typeform.com/to/YbkRDwtc`,
      {
        hideFooter: true,
        hideHeaders: true,
        opacity: 0,
        onSubmit: ({ response_id }) => {
          passDataUpstream({ responseId: response_id });
          setTimeout(() => {
            textBox.scrollIntoView();
          }, 3000);
        },
      }
    );
  }, [myRef]);

  return (
    <div>
      {/* potentially use state to close typform widget after completion */}
      <div ref={myRef} className={`typeform-widget `} id="typeform" />
    </div>
  );
};

export default TypeForm;
