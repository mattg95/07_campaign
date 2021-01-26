import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { Container, Row, Col } from "react-bootstrap";

import TypeForm from "./TypeForm";
import TextBox from "./TextBox";
import ArrowDown from "./arrow-down.svg";
import MpForm from "./MpForm";
import DisplayMp from "./DisplayMp";
import SendEmail from "./SendEmail";

import "./App.scss";

require("dotenv").config({ path: "../.env" });

const socket = socketIOClient();

const App = () => {
  const [state, setState] = useState({
    responseId: "",
    mpData: {},
    error: "",
    generatedEmail: { body: "your email will appear here" },
    editedResponse: "",
    emailCopied: false,
    mpEmailAddress: "",
  });

  useEffect(() => {
    socket.on("typeform-incoming", ({ formToken, generatedEmail }) => {
      if (formToken === state.responseId) {
        setState({ ...state, generatedEmail: generatedEmail });
      }
    });
  }, [state.responseId]);

  useEffect(() => {
    if (state.mpData) {
      const { name, full_name } = state.mpData;
      const mpName = full_name ? full_name : name;
      if (mpName) {
        setState({
          ...state,
          mpEmailAddress:
            mpName.toLowerCase().replace(" ", ".") + ".mp@parliament.uk",
        });
      }
    }
  }, [state.mpData]);

  const passDataUpstream = (data) => {
    setState({ ...state, [Object.keys(data)]: data[Object.keys(data)] });
  };

  console.log(state);
  return (
    <div className="App">
      <Container className="text-center">
        <Row>
          <Col>
            <h1 className=" title">0.7% Campaign</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className=" intro-para">
              Info about our campaign. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="">
              <h2 className="secondary-header">1. Fill out the form</h2>
              <p className="explanation">
                This will generate an email to send to your MP
              </p>
              <a href="#typeform">
                <img src={ArrowDown} className="arrow-down" />
              </a>
            </div>
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
              <MpForm passDataUpstream={passDataUpstream} error={state.error} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="">
              {state.mpData && (
                <DisplayMp
                  mpData={state.mpData}
                  mpEmailAddress={state.mpEmailAddress}
                />
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div id="textBox" className="">
              <TextBox
                passDataUpstream={passDataUpstream}
                generatedEmail={state.generatedEmail}
                editedRes={state.editedResponse}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="">
              {state.mpData && state.generatedEmail && (
                <SendEmail
                  mpData={state.mpData}
                  generatedEmail={state.generatedEmail}
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
