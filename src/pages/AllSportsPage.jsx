import React, { useState, useEffect } from "react";
import { Link , useParams, useNavigate } from 'react-router-dom';
import axios from "axios"; 

const AllSportsPage = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true); // Adicione o estado de carregamento

  async function fetchSports() {
    try {
      const response = await axios.get('http://localhost:5005/sports');
      if (response.status === 200) {
        setSports(response.data.sports);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Defina o estado de carregamento como falso, independentemente do resultado
    }
  }

  useEffect(() => {
    fetchSports();
  }, []);

  return (
    <div className="all-sports">
      <h1>All Sports</h1>
      {loading ? ( // Renderize um indicador de carregamento se estiver carregando
        <p>Loading...</p>
      ) : (
        sports.map(sport => (
          <Link to={`/allsports/${sport.id}`} key={sport.id} className="sport-card">
            <img src={sport.image} alt={sport.name} className="sport-image" />
            <span className="sport-name">{sport.name}</span>
          </Link>
        ))
      )}
    </div>
  ) 
}

export default AllSportsPage;
