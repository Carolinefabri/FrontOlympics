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
      <h1>Welcome, {user}!</h1>
      <p>
        Get ready to immerse yourself in a unique experience, where the Olympic
        Games come to life in the beautiful city of Paris.{' '}
      </p>
      <p>
        Embark on this journey with us and discover the Olympic spirit in an
        entirely new way.
      </p>

      <button onClick={handleGetStarted}>Get started</button>
    </div>
  );
};

export default AdminPage;
