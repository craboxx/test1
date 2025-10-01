import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 text-center">
      <Container>
        &copy; {new Date().getFullYear()} Safa College of Arts and Science. All Rights Reserved.
      </Container>
    </footer>
  );
};

export default Footer;
