
import './App.css';
import { Container, Row, Col } from "react-bootstrap";
import PostCode from './PostCode.js'

function App() {
  return (
    <div className="App">
      <PostCode />
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
              consequat.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>{/* Form elements go here */}</Col>
        </Row>
      </Container>
    </div>
    // Cookie banner here
  );
}

export default App;
