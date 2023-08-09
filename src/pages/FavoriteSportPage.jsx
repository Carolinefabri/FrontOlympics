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
  const [commentText, setCommentText] = useState('');
  const [updatingCommentId, setUpdatingCommentId] = useState(null);

 



  useEffect(() => {
    fetchUserSports();
  }, []);


  const handleSubmitComment = async (id) => {
    try {
     console.log(id)
      const response = await axios.post(`${API_URL}/favorites/${id}/comments`, { text: commentText });
      // Atualize o estado com o novo comentário
     /* setSport((prevSport) => ({
        ...prevSport,
        comments: [...prevSport.comments, response.data],
      })); */
      // Limpe o campo de texto do comentário
      fetchUserSports();
      setCommentText('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const fetchUserSports = async () => {
    try {
      const response = await axios.get( `${API_URL}/favorites/${user}`);   
      setUserSports(response.data);
     
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleUpdateComment = async (favoriteId, commentId) => {
    try {
      await axios.put(`${API_URL}/favorites/${favoriteId}/comments/${commentId}`, { text: commentText });
      setUpdatingCommentId(null); 
      fetchUserSports();
      setCommentText('');
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
          {userSports.map(({sport,_id,comments} ) => (
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
  <button onClick={()=> handleSubmitComment(_id)}>Submit</button>
</div>


<p>Comments</p>
              {comments.map((comment) => (
                <div key={comment._id}>
                  {updatingCommentId === comment._id ? (
                    <div>
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
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

              <div className="heart-icon">
                <FontAwesomeIcon icon={solidHeart} style={{ color: 'red', fontSize: '20px' }} />
                <button onClick={() => handleDeleteFavorite(_id)}>Delete</button>
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