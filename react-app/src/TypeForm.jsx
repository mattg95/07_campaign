import React, { useEffect, useRef, useState } from "react";
import * as typeformEmbed from "@typeform/embed";

const TypeForm = ({ passDataUpstream, isMobile }) => {
  const typeformComponent = useRef(null);
  const buttonRef = useRef(null);
  const [typeformWidgetOpen, setTypeformWidgetOpen] = useState(true);

  const mobileTypeform = typeformEmbed.makePopup(
    `https://z8ivgb8lhnl.typeform.com/to/YbkRDwtc`,
    {
      mode: "popup",
      autoClose: 3,
      onSubmit: ({ response_id }) => {
        passDataUpstream({ responseId: response_id });
      },
      onClose: ({ response_id }) => {
        passDataUpstream({ responseId: response_id });
      },
    }
  );

  useEffect(() => {
    !isMobile &&
      typeformEmbed.makeWidget(
        typeformComponent.current,
        `https://z8ivgb8lhnl.typeform.com/to/YbkRDwtc`,
        {
          hideScrollbars: true,
          hideHeaders: true,
          opacity: 0,
          onSubmit: ({ response_id }) => {
            passDataUpstream({ responseId: response_id });
            setTimeout(() => {
              setTypeformWidgetOpen(false);
            }, 3000);
          },
        }
      );
  }, [typeformComponent, passDataUpstream, isMobile]);

  return (
    <div>
      <div className="call-to-action text-center">
        <button
          ref={buttonRef}
          onClick={(e) => {
            e.preventDefault();
            isMobile
              ? mobileTypeform.open()
              : typeformComponent.current.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                });
          }}
          className="btn btn-primary btn-lg main-cta"
        >
          Fill out the survey to email your MP{" "}
        </button>
        <p className="explanation">
          <strong>We will draft an email</strong> based on your survey
          responses,{" "}
          <strong>written to have the maximum impact on your MP.</strong> With
          your help we can safeguard the support so many need.
        </p>
      </div>
      <div
        ref={typeformComponent}
        className={`typeform-widget ${typeformWidgetOpen ? "" : "closed"}`}
        id="typeform"
      />
    </div>
  );
};

export default TypeForm;
