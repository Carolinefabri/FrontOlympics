// src/pages/HomePage.jsx
import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';



const HomePage = () => {
  return (
    <div>
       <NavBar />
        <img className="homephoto" src="./public/images/home.jpg" alt="homepage"></img>
      <Footer />
    </div>
  );
};
export default HomePage;
