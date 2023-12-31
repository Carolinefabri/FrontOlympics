import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useResolvedPath } from 'react-router-dom';
import { fetchSport } from '../utils/sportsAPICall';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import {API_URL} from '../config/config.index';

const SportDetailsPage = () => {
  const { id } = useParams();

  const [sport, setSport] = useState(null);
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [eventTemperature, setEventTemperature] = useState(null);
 
  const [isFavorited, setIsFavorited] = useState(false);

  const navigate = useNavigate();

 
  

  const handleToggleFavorite = () => {
    setIsFavorited((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchSportData = async () => {
      console.log('Fetching sport data for ID:', id);

      try {
        const fetchedSport = await fetchSport(id);
        console.log('Fetched sport:', fetchedSport);
        setSport(fetchedSport);

        // Fetch current temperature for the event location
        if (fetchedSport[0].location) {
          const currentLocationTemperature = await getCurrentTemperature(fetchedSport[0].location);
          setCurrentTemperature(currentLocationTemperature);
        }

        // Fetch temperature for the event location on the event date
        if (fetchedSport[0].location && fetchedSport[0].date) {
          const eventLocationTemperature = await getTemperatureForEventDate(
            fetchedSport[0].location,
            fetchedSport[0].date
          );
          setEventTemperature(eventLocationTemperature);
        }

        // Check if the sport is favorited and get the favorite ID and comment
        const response = await axios.get(`/favorites?sport=${id}`);
        if (response.data.length > 0) {
          setIsFavorited(true);
        }
      } catch (error) {
        console.error('Error fetching sport:', error);
      }
    };

    fetchSportData();
  }, [id]);

  
  // Função para obter a temperatura atual para uma localização usando a API do WeatherAPI
  const getCurrentTemperature = async (location) => {
    const apiKey = '4af68545586849c3a13134128230608';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.current && data.current.temp_c) {
        return data.current.temp_c;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching current temperature:', error);
      return null;
    }
  };

  // Função para obter a temperatura para uma localização e data usando a API do WeatherAPI
  const getTemperatureForEventDate = async (location, date) => {
    const apiKey = '4af68545586849c3a13134128230608';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
      location
    )}&dt=${encodeURIComponent(date)}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.forecast && data.forecast.forecastday && data.forecast.forecastday.length > 0) {
        const forecast = data.forecast.forecastday[0];
        return forecast.day.avgtemp_c;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching temperature for event date:', error);
      return null;
    }
  };
  const handleAddtofavorite = async () => {
    try {
      const user = localStorage.getItem("user")
      console.log(user)
      const response = await axios.get(`${API_URL}/favorites/${id}/addfavorite/${user}`)  
      handleToggleFavorite()  
      navigate(`/favorites/${user}`)
      
    }
    catch (error) {
      console.error('Error :', error);
      return null;
    }
  };
  
  return sport ? (
    <div>
      <Sidebar />
      <div className="backgroundDetails">
   
        <div className="sport-carddetails">
        <div className="roll-in-left">
          <div className="sport-cardcontent">
            <div className="sport-image-container">
              <img src={sport[0].image} alt={sport[0].name} className="sport-image-details" />
            </div>
            <div className="sport-info">
              <h1>{sport[0].name}</h1>
              <h3>Location: {sport[0].location}</h3>
              <h4>Venue: {sport[0].venue}</h4>
              <h4>Date: {sport[0].date}</h4>
              {/* Display current temperature if available */}
              {currentTemperature && <p>Current Temperature: {currentTemperature} °C</p>}
              {/* Display temperature for event date if available */}
              {eventTemperature && <p>Temperature on Event Day: {eventTemperature} °C</p>}
            </div>
          </div>
          <div className="button-container">
            <button onClick={() => navigate('/allsports')}>All Sports</button>
            <span style={{ marginRight: '10px' }}></span>
            <button className="heart" onClick={handleAddtofavorite}>
              <FontAwesomeIcon icon={solidHeart} style={{ color: 'red', fontSize: '20px' }} />
            </button>
          </div>
      {/* Add the link to check hotels in a specific region */}
          
      <p className="acomodacao"><strong>Don't have an accommodation yet?</strong></p>
            <a
          href="https://www.trivago.pt/pt/lm/hoteis-paris-franca?search=200-22235;dr-20230817-20230818"
          target="_blank"  // Para abrir o link em uma nova aba
          rel="noopener noreferrer"  className="acomodacao1" // Recomendado por motivos de segurança
>
  <p><strong>Check out our partners</strong></p>
</a>
        </div>
      </div>
    </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );

};

export default SportDetailsPage;