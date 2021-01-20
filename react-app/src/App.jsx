import "./App.scss";
import { Container, Row, Col } from "react-bootstrap";

import TypeForm from "./TypeForm";
import TextBox from "./TextBox";
import ArrowDown from "./arrow-down.svg";

require("dotenv").config({ path: "../.env" });

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1 className="text-center title">0.7% Campaign</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center intro-para">
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
            <div className="text-center">
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
            <div className="text-center">
              <TypeForm className="typeform" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    // Cookie banner here
  );
}

export default App;
