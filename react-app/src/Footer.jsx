import { Link } from "@reach/router";
import React from "react";
import { Col, Row } from "react-bootstrap";

const Footer = () => (
  <div id="Footer">
    <Row>
      <Col>
        <h3 className="text-center">The 0.7% Campaign</h3>
      </Col>
    </Row>
    <Row>
      <Col xs={12} lg={6}>
        <Link to="privacy-policy">Privacy Policy</Link>
        {/* <Link to="about"> */}
        Who we are
        {/* </Link> */}
      </Col>
      <Col xs={12} lg={6}>
        <a href="mailto:email@example.com">email@example.com</a>
        <a href="https://concepts.effectivealtruism.org/concepts/aid-effectiveness/">
          Further reading on aid
        </a>
      </Col>
    </Row>
  </div>
);
export default Footer;
