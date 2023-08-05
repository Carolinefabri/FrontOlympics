import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 

const AllSportsPage = () => {
const [sports, setSports] = useState([]);

    async function fetchSports() {
      try {
        const response = await axios.get('http://localhost:5005/sports'); // Substitua pela URL correta da sua API de esportes
        if (response.status === 200) {
          setSports(response.data.sports);
        }
      } catch (error) {
        console.error(error);
      }
    }
    

  useEffect(() => {
    fetchSports();
  }, []);

  return (
    <>
     <h1>All Sports</h1>
     {sports.map(sport => (
  <Link key={sport.id} to={`/allsports/${sport.id}`}>
    {sport.name}
  </Link>
))}
    </>
  ) 
}

export default AllSportsPage;
