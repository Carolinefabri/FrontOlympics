import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {API_URL} from '../config/config.index';

const AllSportsPage = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchSports() {
    try {
      const response = await axios.get(`${API_URL}/sports`);    
      if (response.status === 200) {
        setSports(response.data.sports);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSports();
  }, []);

  return (
    <div className="backgroundAllSports">
      <Sidebar />
  
    <h1 style={{ textAlign: 'center', margin: '20px 0' }}>ALL SPORTS</h1>
    <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Game time. Choose your adventure!</h3>
   <div className="scale-in-hor-center">
      <div className="all-sports">
        {sports.map((sport) => (
          <div
            key={sport.id}
            className="sport-card"
            style={{
              display: "block",
              border: "1px solid lightgrey",
              margin: "1rem 0",
            }}
          >
            <Link to={`/allsports/${sport.id}`}>
              <img src={sport.image} alt={sport.name} className="sport-image" />
              <span className="sport-name">{sport.name}</span>
            </Link>
          </div>
      
        ))}
      </div>
    </div>
    </div>
  );
};

export default AllSportsPage;