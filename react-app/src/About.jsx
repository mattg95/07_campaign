import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import matt from "./assets/matt.jpg";
import robert from "./assets/robert.jpg";
import natasha from "./assets/natasha.jpg";
import sanjay from "./assets/sanjay.jpg";
import sean from "./assets/sean.jpg";
import sahil from "./assets/sahil.jpg";

const About = () => {
  return (
    <div className="about">
      <Container>
        <Row>
          <Col>
            <h1 className="title">About Us</h1>
            <h2>Who are we?</h2>
            <p>
              The 0.7% Commitment is a grassroots UK campaign aiming to change
              the government’s intentions to suspend its foreign aid
              commitments. We’re a group of volunteers, all UK citizens, who
              came together to try and convince our government to do the right
              thing. You can see some of our photos and names below.
            </p>
            <div class="image-grid">
              <div class="grid-item">
                <figure>
                  <img src={matt} alt="Matt" />
                  <figcaption>Matt</figcaption>
                </figure>
              </div>
              <div class="grid-item">
                <figure>
                  <img src={sanjay} alt="Sanjay" />
                  <figcaption>Sanjay</figcaption>
                </figure>
              </div>
              <div class="grid-item">
                <figure>
                  <img src={natasha} alt="Natasha" />
                  <figcaption>Natasha</figcaption>
                </figure>
              </div>
              <div class="grid-item">
                <figure>
                  <img src={sahil} alt="Sahil" />
                  <figcaption>Sahil</figcaption>
                </figure>
              </div>
              <div class="grid-item">
                <figure>
                  <img src={robert} alt="Robert" />
                  <figcaption>Robert</figcaption>
                </figure>
              </div>
              <div class="grid-item">
                <figure>
                  <img src={sean} alt="Sean" />
                  <figcaption>Sean</figcaption>
                </figure>
              </div>
            </div>

            <h2>Why are we doing this?</h2>
            <p>
              The United Kingdom is at a pivotal moment in its history. We have
              recently left the EU. The end of the coronavirus pandemic is in
              sight – at least for our country. And our government has been
              voted in to deliver a Global Britain, delivering on our
              international ambitions. Boris Johnson was voted into power with a
              manifesto that promised to “proudly maintain our commitment to
              spend 0.7 per cent of GNI on development” and bolster global
              institutions to protect our interests overseas.
            </p>
            <p>
              This is the most crucial time for our country to stand tall on the
              global stage. Instead, we are witnessing our government break its
              international commitments. Breaking promises to those who need our
              help the most, and to voters at a time when trust in British
              government has never been lower. Millions of lives, our
              international reputation and our democratic foundations are all
              being put at risk by this decision.
            </p>
            <h2>Why complete the survey?</h2>
            <p>
              We have researched the most effective ways to persuade our MPs to
              carry the right message to the government. We created the survey
              so that people could create compelling emails and letters to write
              to their MP, that makes use of our research while incorporating
              their beliefs and wishes. We hope this will make it easier for
              constituents to contact their MPs about the foreign aid
              commitment.
            </p>
            <h2>Why do we ask for your personal information in the survey?</h2>
            <p>
              We collect your information primarily to complete the email that
              is generated at the end of the survey. MPs can only make enquiries
              on behalf of their constituents, so the email needs to include
              this information so they can recognise you as a constituent.
            </p>
            <p>
              We collect your email address to contact you according to your
              choices during the survey. For example, if you said you would like
              to request a meeting with your MP, then we will use your email
              address to help support you with your meeting.
            </p>
            <p>
              We will not share your personal information with third party
              marketers/advertisers, we promise we will not send you spam or
              fundraising emails, and you control how we use your personal data.
              Our survey, website and email platform use encryption when
              collecting data and are highly secure, so your data is safe. You
              can read more about data privacy in our policy
              <a href="https://www.point7percent.org/privacy-policy"> here</a>.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
