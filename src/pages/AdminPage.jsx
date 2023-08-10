import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../App.css';

const AdminPage = ({ user }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/allsports');
  };

  return (



      <div>
              <Sidebar />
     
      <button class="bttadmin" onClick={handleGetStarted}>Get started</button>
    </div>
  );
};

export default AdminPage;