import React, { useEffect, useRef, useState } from "react";
import * as typeformEmbed from "@typeform/embed";

const TypeForm = ({ passDataUpstream, isMobile }) => {
  const myRef = useRef(null);
  const buttonRef = useRef(null);
  let mpForm;
  const [typeformWidgetOpen, setTypeformWidgetOpen] = useState(true);

  useEffect(() => {
    !isMobile &&
      typeformEmbed.makeWidget(
        myRef.current,
        `https://z8ivgb8lhnl.typeform.com/to/YbkRDwtc`,
        {
          hideScrollbars: true,
          opacity: 0,
          onSubmit: ({ response_id }) => {
            passDataUpstream({ responseId: response_id });
            setTimeout(() => {
              setTypeformWidgetOpen(false);
            }, 3000);
          },
        }
      );
    const mobileTypeform = typeformEmbed.makePopup(
      `https://z8ivgb8lhnl.typeform.com/to/YbkRDwtc`,
      {
        mode: "popup",
        openValue: 50,
        autoClose: 3,
        onSubmit: ({ response_id }) => {
          passDataUpstream({ responseId: response_id });
        },
      }
    );
    buttonRef.current.addEventListener("click", () => {
      isMobile
        ? mobileTypeform.open()
        : myRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  }, [myRef, mpForm, passDataUpstream, isMobile]);

  return (
    <div>
      <div className="call-to-action text-center">
        <button ref={buttonRef} className="btn btn-primary btn-lg">
          1. Fill out the form
        </button>
        <p className="explanation">
          This will generate an email to send to your MP
        </p>
      </div>
      <div
        ref={myRef}
        className={`typeform-widget ${typeformWidgetOpen ? "" : "closed"}`}
        id="typeform"
      />
    </div>
  );
};

export default TypeForm;
