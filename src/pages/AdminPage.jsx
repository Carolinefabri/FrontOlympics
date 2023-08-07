import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importe o componente Link
import NavBar from '../components/NavBar';
import axios from 'axios';

const AdminPage = () => {
  const userId = useAuth(); // Get the userId using the useAuth hook
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/user/${userId}`);
      setUsername(response.data.username);
    } catch (error) {
      console.error(error);
    }
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
