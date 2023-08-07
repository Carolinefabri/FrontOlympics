import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const SportsPage = () => {
  const {user} = useParams ()
  const [userSports, setUserSports] = useState([]);

  useEffect(() => {
    fetchUserSports();
  }, []);

  const fetchUserSports = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/favorites/${user}`);
    
      setUserSports(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Sports Page</h1>
      <h2>User Sports</h2>
      {userSports.map(({sport}) => (
        <div key={sport._id}>
          <h3>Sport: {sport.name}</h3>
          <p>Location: {sport.location}</p>
          <p>Venue: {sport.venue}</p>
          <p>Date: {sport.date}</p>
         
        </div>
      ))}
    </div>
  );
};

export default SportsPage;
