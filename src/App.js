import "./App.scss";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import TextBox from "./TextBox.js";
import Helmet from "react-helmet";

require("dotenv").config({ path: "../.env" });

function App() {
  return (
    <div className="App">
      <Helmet>
        <script src="https://www.guidedtrack.com/assets/jquery_gt.js"></script>

        <script src="https://www.guidedtrack.com/assets/interpreter.js"></script>

        <link
          rel="stylesheet"
          type="text/css"
          href="https://www.guidedtrack.com/assets/guidedtrack.css"
        />
      </Helmet>
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">0.7% Campaign</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center">
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
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center">
              <TextBox />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    // Cookie banner here
  );
}

export default App;