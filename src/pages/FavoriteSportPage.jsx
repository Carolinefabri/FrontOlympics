import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const SportsPage = () => {
  const { user } = useParams();
  const [userSports, setUserSports] = useState([]);
  const [commentText, setCommentText] = useState('');


  useEffect(() => {
    fetchUserSports();
  }, []);


  const handleSubmitComment = async () => {
    try {
      console.log(sport)
      const response = await axios.post(`${API_URL}/favorites/${id}/comments`, { text: commentText });
      // Atualize o estado com o novo comentário
      setSport((prevSport) => ({
        ...prevSport,
        comments: [...prevSport.comments, response.data],
      }));
      // Limpe o campo de texto do comentário
      setCommentText('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const fetchUserSports = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/favorites/${user}`);
    
      setUserSports(response.data);
      console.log(response.data)
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

  const handleDeleteFavorite = async (favoriteId) => {
    try {
      await axios.delete(`${API_URL}/favorites/${favoriteId}/removefavorite/${user}`); 
      fetchUserSports();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return userSports ? (
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
      </div>
    </div>
  ):
  (<h1>Loading</h1>)
  
};

export default SportsPage;