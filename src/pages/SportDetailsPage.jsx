
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchSport } from '../utils/sportsAPICall'; 


const SportDetailsPage = () => {
  const { sportId } = useParams();
  const navigate = useNavigate();


  const [sport, setSport] = useState(null);

  useEffect(() => {
    fetchSport(sportId, setSport);
  }, [sportId]); 

  return sport ? (
    <>
      <h1>Sport Details</h1>
      <h2>{sport.name}</h2>
      <h3>{sport.location}</h3>
      <h4>{sport.venue}</h4>
      <ul>
        {sport.priorXp && sport.priorXp.map(currentXp => (
          <li key={currentXp}>{currentXp}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/allsports')}>Back to All Sports</button>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

export default SportDetailsPage;
