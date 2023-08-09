import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarAdmin from '../components/NavBarAdmin';
import '../App.css';

const AdminPage = ({ user }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/allsports');
  };

  return (



      <div>
              <NavBarAdmin />
      <img className="adminpage" src="../images/admin.png" alt="adminpage" />
      <button class="bttadmin" onClick={handleGetStarted}>Get started</button>
    </div>
  );
};

export default AdminPage;