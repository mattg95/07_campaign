import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { Container, Row, Col } from "react-bootstrap";

import TypeForm from "./TypeForm";
import TextBox from "./TextBox";
import MpForm from "./MpForm";
import DisplayMp from "./DisplayMp";
import SendEmail from "./SendEmail";

import "./App.scss";
import IntroContent from "./IntroContent";

require("dotenv").config({ path: "../.env" });

const socket = socketIOClient();

const App = () => {
  const [state, setState] = useState({
    responseId: "",
    mpData: {},
    postcodeError: "",
    generatedEmailBody: "Your email will appear here",
    emailSubject: "",
    emailCopied: false,
    mpEmailAddress: "",
    greeting: "",
    emailWithGreeting: "",
    postcodeDropdownOpen: false,
  });

  const {
    responseId,
    mpData,
    postcodeError,
    generatedEmailBody,
    emailSubject,
    emailCopied,
    mpEmailAddress,
    greeting,
    emailWithGreeting,
    postcodeDropdownOpen,
  } = state;

  useEffect(() => {
    socket.on("typeform-incoming", ({ formToken, generatedEmail }) => {
      if (formToken === state.responseId) {
        setState({
          ...state,
          generatedEmailBody: generatedEmail.body,
          emailSubject: generatedEmail.subject,
          mpData: generatedEmail.mpData,
          greeting: generatedEmail.greeting,
        });
      }
    });
  }, [state.responseId]);

  useEffect(() => {
    setState({
      ...state,
      emailWithGreeting: greeting + generatedEmailBody,
    });
  }, [generatedEmailBody, greeting]);

  useEffect(() => {
    if (mpData) {
      const { name, full_name } = mpData;
      const mpName = full_name ? full_name : name;
      if (mpName) {
        setState({
          ...state,
          mpEmailAddress:
            mpName.toLowerCase().replace(" ", ".") + ".mp@parliament.uk",
          greeting: `Dear ${mpName},\n`,
        });
      }
    }
  }, [mpData]);

  const passDataUpstream = (data) => {
    setState({ ...state, [Object.keys(data)]: data[Object.keys(data)] });
  };

  console.log(state);
  return (
    <div className="App">
      <Container className="text-center">
        <Row>
          <Col>
            <IntroContent />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className=" typeform">
              <TypeForm passDataUpstream={passDataUpstream} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="">
              {Object.keys(mpData).length > 0 && (
                <DisplayMp mpData={mpData} mpEmailAddress={mpEmailAddress} />
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div id="mpForm" className="">
              {emailSubject && (
                <MpForm
                  passDataUpstream={passDataUpstream}
                  postcodeError={postcodeError}
                  postcodeDropdownOpen={postcodeDropdownOpen}
                />
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div id="emailBox" className="">
              {Object.keys(mpData).length > 0 && (
                <TextBox
                  passDataUpstream={passDataUpstream}
                  emailBody={emailWithGreeting}
                  subject={emailSubject}
                />
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="">
              {Object.keys(mpData).length > 0 && (
                <SendEmail
                  mpEmailAddress={mpEmailAddress}
                  body={emailWithGreeting}
                  subject={emailSubject}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    // Cookie banner here
  );
};

export default App;
