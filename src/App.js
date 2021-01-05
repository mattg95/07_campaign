import "./App.scss";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import TextBox from "./TextBox.js";
import Helmet from "react-helmet";

require("dotenv").config({ path: "../.env" });

function App({ context }) {
  const guidedTrackScript = document.createElement("script");
  guidedTrackScript.src = "https://www.guidedtrack.com/assets/jquery_gt.js";
  guidedTrackScript.async = true;
  document.body.appendChild(guidedTrackScript);

  const interpreterScript = document.createElement("script");
  interpreterScript.src="https://www.guidedtrack.com/assets/interpreter.js";
  interpreterScript.async = true
  document.body.appendChild(interpreterScript);

  // const onStartScript = document.createElement("script");
  // onStartScript.innerHTML=`$(window).on("start", function (event, data) {console.log(data)});`;
  // onStartScript.type="text/javascript"
  // onStartScript.async = true
  // document.body.appendChild(onStartScript);
  // console.log(document.body)

  console.log(window)


  // const cssScript = document.createElement("script");
  // cssScript.src="https://www.guidedtrack.com/assets/guidedtrack.css";
  // cssScript.async = true
  // cssScript.type="text/css"
  // document.body.appendChild(cssScript);

  console.log(document.body)



  return (
    <div className="App">
      <Helmet>
  
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
