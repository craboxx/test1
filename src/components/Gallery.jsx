import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Gallery = () => {
  const images = [
    "https://www.safacollege.ac.in/source/Files/image/Academics%20Section%20Photo/12.jpg",
    "https://www.safacollege.ac.in/source/Files/image/Academics%20Section%20Photo/13.jpg",
    "https://www.safacollege.ac.in/source/Files/image/Academics%20Section%20Photo/DSC_8110.JPG",
  ];

  return (
    <section id="gallery" className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4">Gallery</h2>
        <Row>
          {images.map((img, index) => (
            <Col md={4} key={index} className="mb-3">
              <Image src={img} rounded fluid />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Gallery;
