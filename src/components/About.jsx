import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <section id="about" className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4">About Us</h2>
        <Row>
          <Col md={6}>
            <p>
              Safa College of Arts and Science has been providing quality education for over a decade.
              Our mission is to nurture talent and provide an environment for holistic growth.
            </p>
          </Col>
          <Col md={6}>
            <img
              src="https://www.safacollege.ac.in/source/Files/image/Academics%20Section%20Photo/6.jpg"
              alt="College"
              className="img-fluid rounded"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
