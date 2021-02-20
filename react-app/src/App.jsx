/* eslint react-hooks/exhaustive-deps: 0 */ // --> turns eslint warning message off

import React, { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";
import { Container, Row, Col } from "react-bootstrap";

import TypeForm from "./TypeForm";
import TextBox from "./TextBox";
import MpForm from "./MpForm";
import DisplayMp from "./DisplayMp";
import SendEmail from "./SendEmail";
import IntroContent from "./IntroContent";
import Footer from "./Footer";
import ThankyouScreen from "./thankyouScreen";

import "./App.scss";

require("dotenv").config({ path: "../.env" });

const socket = socketIOClient();

const App = () => {
  const [state, setState] = useState({
    width: window.innerWidth,
    responseId: "",
    mpData: { error: "Could not find MP", name: "", full_name: "" },
    generatedEmailBody: "Your email will appear here",
    emailSubject: "",
    positiveTypeFormResponseReturned: false,
    greeting: "",
    emailWithGreeting: "",
    emailVisible: false,
    emailSent: false,
  });

  const {
    responseId,
    mpData,
    generatedEmailBody,
    emailSubject,
    greeting,
    emailWithGreeting,
    positiveTypeFormResponseReturned,
    width,
    emailVisible,
    emailSent,
  } = state;

  const displayMpRef = useRef(null);
  const emailBoxRef = useRef(null);

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
      const { full_name } = mpData;
      if (full_name) {
        setState({
          ...state,
          greeting: `Dear ${full_name},\n`,
        });
      }
    }
  }, [mpData.name, mpData.full_name]);

  useEffect(() => {
    setState({
      ...state,
      emailWithGreeting: greeting + generatedEmailBody,
    });
  }, [generatedEmailBody, greeting]);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://static.addtoany.com/menu/page.js";
    document.body.appendChild(script);
  }, [emailSent]);

  // const handleWindowSizeChange = () => {
  //   setState({ ...state, width: window.innerWidth });
  // };

  // console.log(state);

  // useEffect(() => {
  //   window.addEventListener("resize", handleWindowSizeChange);
  //   return () => {
  //     window.removeEventListener("resize", handleWindowSizeChange);
  //   };
  // }, []);

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

  const passDataUpstream = (data) => {
    Object.keys(data).forEach((key) => {
      setState({ ...state, [key]: data[key] });
    });
  };

  return (
    <div>
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
                    <DisplayMp mpData={mpData} />
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
                      <div ref={emailBoxRef}>
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
                          mpEmailAddress={mpData.mpEmailAddress}
                          body={emailWithGreeting}
                          subject={emailSubject}
                          passDataUpstream={passDataUpstream}
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
      <div className="footer">
        <Container>
          <Footer />
        </Container>
      </div>
    </div>
  );
};

export default App;
