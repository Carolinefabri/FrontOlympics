import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../App.css';
import Footer from '../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="app-container">
      {/* NavBar */}
      <NavBar />

      {/* Conteúdo principal */}
      <div className="home-container">
        <div className="image-container">
          <img className="homephoto" src="../images/home.png" alt="homepage" />
    
          <button className="shake-top" onClick={handleGetStarted}>
            <strong>JOIN NOW</strong>
          </button>
        </div>
        {/* Resto do conteúdo */}
        <div>
          <img className="serviceshome" src="../images/services.png" alt="homepage" />
        </div>
        <div>
          <img className="sportshome" src="../images/sports.png" alt="homepage" />
        </div>
        <div>
          <img className="testemunhahome" src="../images/testemunha.png" alt="homepage" />
        </div>
        <div>
          <img className="subscribehome" src="../images/subscribe.png" alt="homepage" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
