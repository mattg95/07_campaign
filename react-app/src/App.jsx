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
            <div id="mpForm" className="">
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
            <div className="">
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
