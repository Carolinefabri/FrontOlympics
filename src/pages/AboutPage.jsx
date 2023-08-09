import React, { useState } from "react";
import axios from "axios";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';


const About = () => {
  return (
      <div>
    <NavBar />
    <img className="aboutphoto" src="../images/about.jpg" alt="aboutit"></img>
    <Footer />
   
    </div>
  );
};

export default About;
