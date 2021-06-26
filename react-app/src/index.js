import React from "react";
import ReactDOM from "react-dom";
import TagManager from "react-gtm-module";
import { Router } from "@reach/router";
import HttpsRedirect from "react-https-redirect";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import App from "./pages/App";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import About from "./pages/About";

const tagManagerArgs = {
  gtmId: "GTM-MWBT83W",
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(
  <HttpsRedirect>
    <Provider store={store}>
      <Router>
        <App path="/" />
        <PrivacyPolicy path="/privacy-policy" />
        <About path="/about" />
      </Router>
      <Footer />
    </Provider>
  </HttpsRedirect>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
