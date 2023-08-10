import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CountdownTimer from '../components/CountdownTimer';
import '../App.css'; // Importe o arquivo de estilos global

const AdminPage = ({ user }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/allsports');
  };

  return (
    <div className="App"> {/* Use a classe "App" para aplicar estilos globais */}
      <Sidebar />
      
      <div className="countdown-container">
        <h2 className="countdown-title"> Paris 2024</h2>
        <h3>The Journey Begins in...</h3>
       <strong class="contador"> <CountdownTimer targetDate={new Date('2024-07-26T00:00:00')}/></strong>
      </div>

    
      <button className="bttadmin" onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default AdminPage;
