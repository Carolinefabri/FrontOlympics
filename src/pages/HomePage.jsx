// src/pages/HomePage.jsx
import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
       <NavBar />
      <h1>Welcome to Paris Olympics Adventures</h1>
      {/* Conteúdo adicional da página inicial */}
      <Footer />
    </div>
  );
};

export default HomePage;
