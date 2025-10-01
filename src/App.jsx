import React from "react";
import CollegeNavbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Courses from "./components/Courses";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <CollegeNavbar />
      <HeroSection />
      <About />
      <Courses />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
