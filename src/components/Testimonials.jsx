import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Testimonials = () => {
  const testimonials = [
    { name: "John Doe", feedback: "Great college, excellent faculty!" },
    { name: "Jane Smith", feedback: "Loved the learning environment." },
    { name: "Alex Lee", feedback: "Highly recommend Safa College!" },
  ];

  return (
    <section id="testimonials" className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4">Testimonials</h2>
        <Row>
          {testimonials.map((t, i) => (
            <Col md={4} key={i} className="mb-3">
              <Card className="h-100 shadow">
                <Card.Body>
                  <Card.Text>"{t.feedback}"</Card.Text>
                  <Card.Subtitle className="text-muted mt-2">- {t.name}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
