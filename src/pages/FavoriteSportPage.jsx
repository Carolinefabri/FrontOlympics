import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavoritesContext } from '../contexts/FavoritesContext';

const FavoriteSportPage = () => {
  const { favoriteSports, removeFavorite, isFavorite } = useFavoritesContext();
  const navigate = useNavigate();

  const handleRemoveFavorite = async (sportId) => {
    try {
      const response = await fetch('/favoriteport', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sportId }),
      });

      if (response.ok) {
        removeFavorite(sportId); // Remove from context
      }
    } catch (error) {
      console.error('Error removing favorite sport:', error);
    }
  };

  return (
    <div>
      <h1>Your Favorite Sports</h1>
      <ul>
        {favoriteSports.map(sport => (
          <li key={sport.id}>
            <h3>{sport.name}</h3>
            <button onClick={() => handleRemoveFavorite(sport.id)}>
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/allsports')}>Back to All Sports</button>
    </div>
  );
};

export default FavoriteSportPage;
