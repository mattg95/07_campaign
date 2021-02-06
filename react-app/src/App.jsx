/* eslint react-hooks/exhaustive-deps: 0 */ // --> turns eslint warning message off

import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { Container, Row, Col } from "react-bootstrap";

import TypeForm from "./TypeForm";
import TextBox from "./TextBox";
import MpForm from "./MpForm";
import DisplayMp from "./DisplayMp";
import SendEmail from "./SendEmail";
import IntroContent from "./IntroContent";

import "./App.scss";

require("dotenv").config({ path: "../.env" });

const socket = socketIOClient();

const App = () => {
  const [state, setState] = useState({
    responseId: "",
    mpData: { error: "Could not find MP" },
    generatedEmailBody: "Your email will appear here",
    emailSubject: "",
    positiveTypeFormResponseReturned: false,
    mpEmailAddress: "",
    greeting: "",
    emailWithGreeting: "",
  });

  const {
    responseId,
    mpData,
    generatedEmailBody,
    emailSubject,
    mpEmailAddress,
    greeting,
    emailWithGreeting,
    positiveTypeFormResponseReturned,
  } = state;

  useEffect(() => {
    socket.on("typeform-incoming", ({ formToken, generatedEmail }) => {
      if (formToken === responseId) {
        console.log(generatedEmail);
        setState({
          ...state,
          generatedEmailBody: generatedEmail.body,
          emailSubject: generatedEmail.subject,
          mpData: generatedEmail.mpData,
          greeting: generatedEmail.greeting,
          positiveTypeFormResponseReturned: generatedEmail.supportsAid,
        });
      }
    });
  }, [responseId]);

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
    Object.keys(data).forEach((key) => {
      setState({ ...state, [key]: data[key] });
    });
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={12} lg={6}>
            <IntroContent />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="typeform">
              <TypeForm passDataUpstream={passDataUpstream} />
            </div>
          </Col>
        </Row>
        {positiveTypeFormResponseReturned && (
          <>
            <Row>
              <Col>
                <div className="">
                  <DisplayMp mpData={mpData} mpEmailAddress={mpEmailAddress} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div id="mpForm" className="">
                  <MpForm passDataUpstream={passDataUpstream} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div id="emailBox" className="">
                  <TextBox
                    passDataUpstream={passDataUpstream}
                    emailBody={emailWithGreeting}
                    subject={emailSubject}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="">
                  <SendEmail
                    mpEmailAddress={mpEmailAddress}
                    body={emailWithGreeting}
                    subject={emailSubject}
                  />
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
    // Cookie banner here
  );
};

export default App;
