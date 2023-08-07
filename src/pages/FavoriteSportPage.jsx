import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleAddComment = async (favoriteId, comment) => {
    try {
      await axios.put(`/favorites/${favoriteId}`, { comment });
      // Update the local state to reflect the new comment
      setFavorites((prevFavorites) =>
        prevFavorites.map((favorite) =>
          favorite._id === favoriteId ? { ...favorite, comments: [{ text: comment, date: new Date() }] } : favorite
        )
      );
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteFavorite = async (favoriteId) => {
    try {
      await axios.delete(`/favorites/${favoriteId}`);
      // Update the local state to remove the deleted favorite
      setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite._id !== favoriteId));
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };

  return (
    <div>
      <h1>Favorites</h1>
      {loading ? (
        <p>Loading...</p>
      ) : favorites.length > 0 ? (
        favorites.map((favorite) => (
          <div key={favorite._id}>
            <h2>{favorite.sport.name}</h2>
            <img src={favorite.sport.image} alt={favorite.sport.name} className="sport-image" />
            <h3>Location: {favorite.sport.location}</h3>
            <h4>Venue: {favorite.sport.venue}</h4>
            <h4>Date: {favorite.sport.date}</h4>
            <p>Comment: {favorite.comments[0]?.text || 'No comment'}</p>
            <button onClick={() => handleDeleteFavorite(favorite._id)}>Remove from Favorites</button>
            <div>
              <input
                type="text"
                value={favorite.comments[0]?.text || ''}
                onChange={(e) => handleAddComment(favorite._id, e.target.value)}
                placeholder="Add a comment..."
              />
              <button onClick={() => handleAddComment(favorite._id, favorite.comments[0]?.text)}>
                Save Comment
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
