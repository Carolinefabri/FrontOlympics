import React, { useState, useEffect } from 'react';
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
      <NavBar />
      <h2>Welcome, {username}</h2>
      {userId && <p>User ID: {userId}</p>}
      <Footer />
    </div>
  );
};

export default AdminPage;
