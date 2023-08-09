import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import NavBarAdmin from '../components/NavBarAdmin';
import { API_URL } from '../config/config.index';

const SportsPage = () => {
  const { user } = useParams();
  const [userSports, setUserSports] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [updatingCommentId, setUpdatingCommentId] = useState(null);
  const [commentUpdates, setCommentUpdates] = useState({});

  useEffect(() => {
    fetchUserSports();
  }, []);

  const fetchUserSports = async () => {
    try {
      const response = await axios.get(`${API_URL}/favorites/${user}`);
      setUserSports(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitComment = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/favorites/${id}/comments`, { text: commentText });
      fetchUserSports();
      setCommentText('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleUpdateComment = async (favoriteId, commentId) => {
    try {
      const updatedText = commentUpdates[commentId];
      if (updatedText) {
        await axios.put(`${API_URL}/favorites/${favoriteId}/comments/${commentId}`, { text: updatedText });
        setUpdatingCommentId(null);
        fetchUserSports();
        setCommentUpdates((prevUpdates) => ({
          ...prevUpdates,
          [commentId]: '',
        }));
      }
    } catch (error) {
      console.error('Error updating comment:', error);
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
      <NavBarAdmin />
      <div className="sport-container">
        <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Your Favorite Sports</h1>
        <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Get Ready for Game Day!</h3>
        <div className="sport-list">
          {userSports.map(({ sport, _id, comments }) => (
            <div key={_id} className="sport-card">
              <h3>Sport: {sport.name}</h3>
              <p>Location: {sport.location}</p>
              <p>Venue: {sport.venue}</p>
              <p>Date: {sport.date}</p>
              <div className="sport-image-container">
                <img src={sport.image} className="sport-image" alt={sport.name} />
              </div>
              <div className="comment-form">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                />
                <button onClick={() => handleSubmitComment(_id)}>Submit</button>
              </div>
              {comments.map((comment) => (
                <div key={comment._id}>
                  {updatingCommentId === comment._id ? (
                    <div>
                      <textarea
                        value={commentUpdates[comment._id] || comment.text}
                        onChange={(e) =>
                          setCommentUpdates((prevUpdates) => ({
                            ...prevUpdates,
                            [comment._id]: e.target.value,
                          }))
                        }
                        placeholder="Update your comment..."
                      />
                      <button onClick={() => handleUpdateComment(_id, comment._id)}>Update</button>
                    </div>
                  ) : (
                    <div>
                      <p>{comment.text}</p>
                      <button onClick={() => setUpdatingCommentId(comment._id)}>Update</button>
                    </div>
                  )}
                </div>
              ))}
              <button onClick={() => handleDeleteFavorite(_id)}>Delete</button>
              <div className="heart-icon">
                <FontAwesomeIcon icon={solidHeart} style={{ color: 'red', fontSize: '20px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  );
};

export default SportsPage;
