import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import NavBarAdmin from '../components/NavBarAdmin';
import {API_URL} from '../config/config.index';

const SportsPage = () => {
  const { user } = useParams();
  const [userSports, setUserSports] = useState([]);

  useEffect(() => {
    fetchUserSports();
  }, []);

  const fetchUserSports = async () => {
    try {
      const response = await axios.get( `${API_URL}/favorites/${user}`);   
      setUserSports(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFavorite = async (favoriteId) => {
    try {
      await axios.delete(`http://localhost:5005/favorites/${favoriteId}/removefavorite/${user}`);
      fetchUserSports();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <NavBarAdmin />
  <div className="sport-container">
    <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Your Favorite Sports</h1>
    <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Get Ready for Game Day!</h3>
   
        <div className="sport-list">
          {userSports.map(({ sport, _id }) => (
            <div key={_id} className="sport-card">
              <h3>Sport: {sport.name}</h3>
              <p>Location: {sport.location}</p>
              <p>Venue: {sport.venue}</p>
              <p>Date: {sport.date}</p>
              <div className="sport-image-container">
              <img src={sport.image} className="sport-image" alt={sport.name} />
            </div>
              <p>Comments {sport.comments}</p>
              <div className="heart-icon">
                <FontAwesomeIcon icon={solidHeart} style={{ color: 'red', fontSize: '20px' }} />
                <button onClick={() => handleDeleteFavorite(_id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsPage;