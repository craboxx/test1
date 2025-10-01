import React from "react";
import { Container, Button } from "react-bootstrap";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section text-center text-white d-flex align-items-center justify-content-center">
      <Container>
        <h1>Welcome to Safa College of Arts and Science</h1>
        <p>Empowering students for a brighter future</p>
        <Button variant="success" href="#courses">Explore Courses</Button>
      </Container>
    </div>
  );
};

export default HeroSection;
