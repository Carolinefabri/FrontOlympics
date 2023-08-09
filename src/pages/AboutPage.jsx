import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import aboutImage from "/images/about.png"; 

const About = () => {
  return (
    <div>
      <NavBar />
      <img className="aboutphoto" src={aboutImage} alt="aboutit" /> 
    </div>
  );
};

export default About;