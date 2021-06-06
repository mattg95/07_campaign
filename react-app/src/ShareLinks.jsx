/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";

const ShareLinks = () => {
  return (
    <div className="share-links">
      <p className="explanation">Please share this campaign!</p>
      <div
        className="a2a_kit a2a_kit_size_50 a2a_default_style"
        data-a2a-url="https://www.point7percent.org/"
        data-a2a-title="The 0.7% Commitment"
      >
        <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
        <a className="a2a_button_facebook"></a>
        <a className="a2a_button_twitter"></a>
        <a className="a2a_button_email"></a>
        <a className="a2a_button_whatsapp"></a>
      </div>
    </div>
  );
};

export default ShareLinks;
