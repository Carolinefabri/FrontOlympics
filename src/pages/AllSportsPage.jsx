import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBarAdmin from '../components/NavBarAdmin'; 
import Sidebar from "../components/Sidebar";

const AllSportsPage = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchSports() {
    try {
      const response = await axios.get("http://localhost:5005/sports");
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
    <div>
      <Sidebar />
      <div className="all-sports">
        <h1>All Sports</h1>
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
  );
};

export default AllSportsPage;