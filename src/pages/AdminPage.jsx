
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CountdownTimer from '../components/CountdownTimer';
import '../App.css'; // Importe o arquivo de estilos global
import pageAdminImage from "/images/hero.png"; 
import newsImage from "/images/wordsnews.png"; 
import newsImage1 from "/images/wordsnews1.png"; 
import newsImage2 from "/images/wordsnews2.png"; 
import bookImage from "/images/book.png"; 
import parisImage from "/images/paris.png"; 

const AdminPage = ({ user }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/allsports');
  };

  return (
   
    <div className="App"> {/* Use a classe "App" para aplicar estilos globais */}
    
    <Sidebar />
  
      <div className="countdown-container">
        <h2 className="countdown-title"> Olympic Paris 2024 </h2>
        <h3>The Journey Begins in...</h3>
       <strong class="contador"> <CountdownTimer targetDate={new Date('2024-07-26T00:00:00')}/></strong>
      </div>
      <section>
    <img className="pageAdminImage " src={pageAdminImage} alt="pageAdminImage" /> 
    </section>
    <section>
    <img className="newsImage " src={newsImage} alt="newsImageImage" /> 
    </section>
    <section>
    <img className="newsImage1 " src={newsImage1} alt="newsImageImage1" /> 
    </section>
    <section>
    <img className="newsImage2 " src={newsImage2} alt="newsImageImage" /> 
    </section>
    <section>
    <img className="bookImage " src={bookImage} alt="newsImageImage" /> 
    </section>
    <section>
    <img className="parisImage " src={parisImage} alt="parisImage" /> 
    </section>
      <button className="bttadmin" onClick={handleGetStarted}><strong>Get Started</strong></button>
    </div>
  );
};

export default AdminPage;