/* eslint react-hooks/exhaustive-deps: 0 */ // --> turns eslint warning message off

import React, { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import "./App.scss";

import TypeForm from "./components/TypeForm";
import TextBox from "./components/TextBox";
import MpForm from "./components/MpForm";
import DisplayMp from "./components/DisplayMp";
import SendEmail from "./components/SendEmail";
import IntroContent from "./components/IntroContent";
import ThankyouScreen from "./components/thankyouScreen";

import { store } from "./redux/store";

import {
  setEmailBody,
  setEmailSubject,
  setWindowWidth,
  setGreeting,
  setMpData,
  setEmailWithGreeting,
  setPositiveTypeformResponse,
} from "./redux/actions";

import {
  responseId,
  mpData,
  generatedEmailBody,
  emailSubject,
  greeting,
  emailWithGreeting,
  positiveTypeformResponseReturned,
  width,
  emailVisible,
  emailSent,
} from "./redux/selectors";

require("dotenv").config({ path: "../.env" });

const socket = socketIOClient();

const App = () => {
  const displayMpRef = useRef(null);
  const emailBoxRef = useRef(null);

  useEffect(() => {
    socket.on("typeform-incoming", ({ formToken, generatedEmail }) => {
      if (formToken === responseId) {
        store.dispatch(setEmailBody(generatedEmail.body));
        store.dispatch(setEmailSubject(generatedEmail.subject));
        store.dispatch(setMpData(generatedEmail.mpData));
        store.dispatch(setGreeting(generatedEmail.greeeting));
        store.dispatch(
          setEmailWithGreeting(generatedEmail.greeeting + generatedEmail.body)
        );
        store.dispatch(setPositiveTypeformResponse(generatedEmail.supportsAid));
      }
    });
  }, [responseId]);

  useEffect(() => {
    if (mpData) {
      const { full_name } = mpData;
      const greeting = `Dear ${full_name},\n`;
      if (full_name) {
        store.dispatch(setGreeting(greeting));
      }
    }
  }, [mpData.name, mpData.full_name]);

  useEffect(() => {
    store.dispatch(setEmailWithGreeting(greeting + generatedEmailBody));
  }, [generatedEmailBody, greeting]);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://static.addtoany.com/menu/page.js";
    document.body.appendChild(script);
  }, [emailSent]);

  const handleWindowSizeChange = () => {
    store.dispatch(setWindowWidth(window.innerWidth));
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
            current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      }
    }, 3000);
  }, [displayMpRef, positiveTypeFormResponseReturned]);

  //once the emailBox postcode is rendered on click of 'Continue with this MP', this scrolls the page down to it
  useEffect(() => {
    const { current } = emailBoxRef;
    current &&
      current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
  }, [emailVisible, emailBoxRef]);

  return (
    <div className="main">
      <Container>
        <Row>
          <Col>
            <IntroContent />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="typeform">
              <TypeForm isMobile={isMobile} />
            </div>
          </Col>
        </Row>
        {positiveTypeFormResponseReturned && (
          <>
            <Row>
              <Col>
                <div ref={displayMpRef}>
                  <DisplayMp mpData={mpData} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div id="mpForm" className="">
                  <MpForm />
                </div>
              </Col>
            </Row>
            {emailVisible && (
              <div>
                <Row>
                  <Col>
                    <div ref={emailBoxRef}>
                      <TextBox
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
                        mpEmailAddress={mpData.mpEmailAddress}
                        body={emailWithGreeting}
                        subject={emailSubject}
                      />
                    </div>
                  </Col>
                </Row>
                {emailSent && (
                  <Row>
                    <Col>
                      <ThankyouScreen />
                    </Col>
                  </Row>
                )}
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default App;
