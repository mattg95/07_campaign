/* eslint react-hooks/exhaustive-deps: 0 */ // --> turns eslint warning message off

import React, { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import "./App.scss";

import TypeForm from "./TypeForm";
import TextBox from "./TextBox";
import MpForm from "./MpForm";
import DisplayMp from "./DisplayMp";
import SendEmail from "./SendEmail";
import IntroContent from "./IntroContent";
import ThankyouScreen from "./thankyouScreen";

import { store } from "./store";

import {
  setEmailBody,
  setEmailSubject,
  setWindowWidth,
  setGreeting,
  setMpData,
  setEmailWithGreeting,
  setPositiveTypeformResponse,
} from "./actions";

require("dotenv").config({ path: "../.env" });

const socket = socketIOClient();

const App = () => {
  const responseId = useSelector((state) => state.responseId);
  const mpData = useSelector((state) => state.mpData);
  const generatedEmailBody = useSelector((state) => state.generatedEmailBody);
  const emailSubject = useSelector((state) => state.emailSubject);
  const greeting = useSelector((state) => state.greeting);
  const emailWithGreeting = useSelector((state) => state.emailWithGreeting);
  const positiveTypeFormResponseReturned = useSelector(
    (state) => state.positiveTypeFormResponseReturned
  );
  const width = useSelector((state) => state.width);
  const emailVisible = useSelector((state) => state.emailVisible);
  const emailSent = useSelector((state) => state.emailSent);

  const displayMpRef = useRef(null);
  const emailBoxRef = useRef(null);

  useEffect(() => {
    socket.on("typeform-incoming", ({ formToken, generatedEmail }) => {
      if (formToken === responseId) {
        store.dispatch(setEmailBody(generatedEmail.body));
        store.dispatch(setEmailSubject(generatedEmail.subject));
        store.dispatch(setMpData(generatedEmail.mpData));
        store.dispatch(setEmailWithGreeting(generatedEmail.greeeting));
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
