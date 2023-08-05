import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchSport } from '../utils/sportsAPICall'; 


const SportDetailsPage = () => {
  const { sportId } = useParams()
  const navigate = useNavigate()

  const [sport, setSport] = useState()

  useEffect(() => {
    fetchSport(sportId, setSport)
  }, [])

  const handleDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5005/sports/${sportId}`);
      if (response.status === 200) {
        // Faça algo com os detalhes do esporte, se necessário
        navigate('/allsports/:id');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
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
      <button onClick={handleDetails}>Back to All Sports</button>
    </>
  ) : (
    <h1>Loading...</h1>
  )
}

export default SportDetailsPage
