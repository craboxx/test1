import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Courses = () => {
  const courses = [
    { title: "Bachelor of Arts", description: "Arts stream programs." },
    { title: "Bachelor of Science", description: "Science stream programs." },
    { title: "Computer Science", description: "Modern CS courses." },
  ];

  return (
    <section id="courses" className="py-5">
      <Container>
        <h2 className="text-center mb-4">Our Courses</h2>
        <Row>
          {courses.map((course, index) => (
            <Col md={4} key={index} className="mb-3">
              <Card className="h-100 shadow">
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Courses;
