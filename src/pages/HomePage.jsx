// src/pages/HomePage.jsx
import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import VideoComponent from "../components/VideoComponent";


const HomePage = () => {
  return (
    <div>
       <NavBar />
      <VideoComponent />
      <Footer />
    </div>
  );
};
export default HomePage;
