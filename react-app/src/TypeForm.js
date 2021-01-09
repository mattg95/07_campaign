import React, { useEffect, useRef } from "react";
import * as typeformEmbed from "@typeform/embed";

const TypeForm = () => {
  const myRef = useRef(null);

  useEffect(() => {
    typeformEmbed.makeWidget(
      myRef.current,
      `https://z8ivgb8lhnl.typeform.com/to/YbkRDwtc`,
      {
        hideFooter: true,
        hideHeaders: true,
        opacity: 0,
      }
    );
  }, [myRef]);

  return <div ref={myRef} className="typeform-widget" />;
};

export default TypeForm;
