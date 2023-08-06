import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSport } from '../utils/sportsAPICall';

const SportDetailsPage = () => {
  const { id } = useParams();
  const [sport, setSport] = useState(null);
  const navigate = useNavigate();

  const [isFavorited, setIsFavorited] = useState(false);
  const handleToggleFavorite = () => {
    setIsFavorited(prevIsFavorited => !prevIsFavorited);
  };
  


  useEffect(() => {
    const fetchSportData = async () => {
      console.log('Fetching sport data for ID:', id);

      try {
        const fetchedSport = await fetchSport(id);
        console.log('Fetched sport:', fetchedSport);
        setSport(fetchedSport);
      } catch (error) {
        console.error('Error fetching sport:', error);
      }
    };

    fetchSportData();
  }, [id]);

  console.log('Sport state:', sport);

  return sport ? (
    
    <div className="sport-card">
   <h1>Sport Details</h1>
   
   <img src={sport[0].image} alt={sport[0].name} className= "sport-image" />
    <span><h2>{sport[0].name}</h2></span>
    <h3>Location: {sport[0].location}</h3>
    <h4>Venue:  {sport[0].venue}</h4>
    <h4>Date:  {sport[0].date}</h4>
{/* Render other details */}

      <button onClick={() => navigate('/allsports')}>Back to All Sports</button>
      <button onClick={() => navigate('/FavoriteSport')}>Favorite</button>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
  
};

export default SportDetailsPage;