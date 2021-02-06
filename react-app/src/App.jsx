/* eslint react-hooks/exhaustive-deps: 0 */ // --> turns eslint warning message off

import React, { useEffect, useState, useRef } from "react";
import HttpsRedirect from "react-https-redirect";
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
    width: window.innerWidth,
    responseId: "",
    mpData: { error: "Could not find MP" },
    generatedEmailBody: "Your email will appear here",
    emailSubject: "",
    positiveTypeFormResponseReturned: false,
    mpEmailAddress: "",
    greeting: "",
    emailWithGreeting: "",
    emailVisible: false,
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
    width,
    emailVisible,
  } = state;

  const displayMpRef = useRef(null);

  useEffect(() => {
    socket.on("typeform-incoming", ({ formToken, generatedEmail }) => {
      if (formToken === responseId) {
        setState({
          ...state,
          generatedEmailBody: generatedEmail.body,
          emailSubject: generatedEmail.subject,
          mpData: generatedEmail.mpData,
          greeting: generatedEmail.greeting,
          emailWithGreeting: generatedEmail.greeting + generatedEmail.body,
          positiveTypeFormResponseReturned: generatedEmail.supportsAid,
        });
      }
    });
  }, [responseId]);

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

  useEffect(() => {
    setState({
      ...state,
      emailWithGreeting: greeting + generatedEmailBody,
    });
  }, [generatedEmailBody, greeting]);

  const handleWindowSizeChange = () => {
    setState({ ...state, width: window.innerWidth });
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  let isMobile = width && width <= 768;

  useEffect(() => {
    setTimeout(() => {
      const { current } = displayMpRef;
      if (current) {
        if (isMobile) {
          if (positiveTypeFormResponseReturned) {
            console.log("should be scrolling");
            console.log(current);
            current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      }
    }, 3000);
  }, [displayMpRef, positiveTypeFormResponseReturned]);

  const passDataUpstream = (data) => {
    Object.keys(data).forEach((key) => {
      setState({ ...state, [key]: data[key] });
    });
  };

  return (
    <HttpsRedirect>
      <div className="App">
        <Container>
          <Row>
            <Col>
              <IntroContent />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="typeform">
                <TypeForm
                  passDataUpstream={passDataUpstream}
                  isMobile={isMobile}
                />
              </div>
            </Col>
          </Row>
          {positiveTypeFormResponseReturned && (
            <>
              <Row>
                <Col>
                  <div ref={displayMpRef}>
                    <DisplayMp
                      mpData={mpData}
                      mpEmailAddress={mpEmailAddress}
                    />
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
              {emailVisible && (
                <div>
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
                </div>
              )}
            </>
          )}
        </Container>
      </div>
    </HttpsRedirect>

    // Cookie banner here
  );
};

export default App;
