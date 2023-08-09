import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../App.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="home-container">
      <NavBar />
      <div className="image-container">
        <img className="homephoto" src="../images/home.png" alt="homepage" />
        <button className="register" onClick={handleGetStarted} >
          <strong>JOIN NOW</strong>
        </button>
      </div>
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
  );
};

export default HomePage;