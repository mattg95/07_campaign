import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import TagManager from "react-gtm-module";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

const tagManagerArgs = {
  gtmId: "GTM-MWBT83W",
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
