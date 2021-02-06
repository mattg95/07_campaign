import React, { useEffect, useRef, useState } from "react";
import * as typeformEmbed from "@typeform/embed";

const TypeForm = ({ passDataUpstream }) => {
  const myRef = useRef(null);
  const mpForm = document.getElementById("displayMP");
  const [width, setWidth] = useState(window.innerWidth);
  const [typeformWidgetOpen, setTypeformWidgetOpen] = useState(true);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  let isMobile = width <= 768;

  useEffect(() => {
    isMobile
      ? typeformEmbed.makePopup(
          `https://z8ivgb8lhnl.typeform.com/to/YbkRDwtc`,
          {
            mode: "popup",
            open: "scroll",
            openValue: 50,
            autoClose: 3,
            onSubmit: ({ response_id }) => {
              passDataUpstream({ responseId: response_id });
              setTypeformWidgetOpen(false);
            },
          }
        )
      : typeformEmbed.makeWidget(
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
  }, [myRef, mpForm, passDataUpstream, isMobile]);

  return (
    <div>
      <div
        ref={myRef}
        className={`typeform-widget ${typeformWidgetOpen ? "" : "closed"}`}
        id="typeform"
      />
    </div>
  );
};

export default TypeForm;
