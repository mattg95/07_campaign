import React, { useEffect, useRef, useState } from "react";
import * as typeformEmbed from "@typeform/embed";

const TypeForm = ({ passDataUpstream }) => {
  const myRef = useRef(null);
  const mpForm = document.getElementById("displayMP");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    typeformEmbed.makeWidget(
      myRef.current,
      `https://z8ivgb8lhnl.typeform.com/to/YbkRDwtc`,
      {
        hideFooter: false,
        hideHeaders: false,
        opacity: 0,
        onSubmit: ({ response_id }) => {
          passDataUpstream({ responseId: response_id });
          setTimeout(() => {
            setIsOpen(false);
          }, 2000);
          setTimeout(() => {
            myRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 3000);
        },
      }
    );
  }, [myRef, mpForm, passDataUpstream]);

  return (
    <div>
      {/* potentially use state to close typform widget after completion */}
      <div
        ref={myRef}
        className={`typeform-widget ${isOpen ? "" : "closed"}`}
        id="typeform"
      />
    </div>
  );
};

export default TypeForm;
