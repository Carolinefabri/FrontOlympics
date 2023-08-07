// SportDetailsPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSport } from '../utils/sportsAPICall';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const SportDetailsPage = () => {
  const { id } = useParams();
  const [sport, setSport] = useState(null);
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  const handleToggleLike = async () => {
    try {
      if (isLiked) {
        // If the sport is already liked, remove it from favorites
        await axios.delete(`/favorites/${favoriteId}`);
        setIsLiked(false);
      } else {
        // If the sport is not liked, add it to favorites
        const response = await axios.post('/favorites', {
          sportId: id,
          comment: '', // Add any comment you want to save with the favorite
        });
        setIsLiked(true);
        setFavoriteId(response.data._id);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  useEffect(() => {
    const fetchSportData = async () => {
      console.log('Fetching sport data for ID:', id);

      try {
        const fetchedSport = await fetchSport(id);
        console.log('Fetched sport:', fetchedSport);
        setSport(fetchedSport);

        // Check if the sport is favorited and get the favorite ID
        const response = await axios.get(`/favorites?sportId=${id}`);
        if (response.data.length > 0) {
          setIsLiked(true);
          setFavoriteId(response.data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching sport:', error);
      }
    };

    fetchSportData();
  }, [id]);

  return sport ? (
    <div className="sport-card">
      <h1>Sport Details</h1>
      <img src={sport.image} alt={sport.name} className="sport-image" />
      <span>
        <h2>{sport.name}</h2>
      </span>
      <h3>Location: {sport.location}</h3>
      <h4>Venue: {sport.venue}</h4>
      <h4>Date: {sport.date}</h4>

      {/* Heart icon */}
      <FontAwesomeIcon
        icon={isLiked ? solidHeart : regularHeart}
        onClick={handleToggleLike}
        style={{ color: isLiked ? 'red' : 'black', cursor: 'pointer' }}
      />

      {/* ... Render other details ... */}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default SportDetailsPage;

