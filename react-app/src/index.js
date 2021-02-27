import React from "react";
import ReactDOM from "react-dom";
import TagManager from "react-gtm-module";
import { Router } from "@reach/router";
import HttpsRedirect from "react-https-redirect";

import App from "./App";
import PrivacyPolicy from "./PrivacyPolicy";

import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";

const tagManagerArgs = {
  gtmId: "GTM-MWBT83W",
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(
  <HttpsRedirect>
    <Router>
      <App path="/" />
      <PrivacyPolicy path="/privacy-policy" />
      <About path="/about" />
    </Router>
    <Footer />
  </HttpsRedirect>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
