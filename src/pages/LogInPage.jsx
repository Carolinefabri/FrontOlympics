import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import {API_URL} from '../config/config.index';
import backgroundImage from "/images/login.png"; 

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const nav = useNavigate();


  const handleGetStarted = () => {
    navigate('/signup');
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/user/login`, {     
        email,
        password,
      });

      const { token, user } = data; // Destructure the token and user data from the response

      // Store the token and user data in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", user._id); // Convert user object to string before saving

      // Redirect to a different page after successful login
      nav('/admin');

    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.error);
    }
  };


  return (
    <div>
      <NavBar /> 
      <img className="backgroundImage" src={backgroundImage} alt="background.login" /> 
      <div className="bodyBox">
      <div className="box">
        <span className="borderline"></span>
        <span className="borderline1"></span>
        
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <label className="inputBox">
            <span>Email:</span>
            <input
              type="email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />
              <i></i>
          </label>
          <label className="inputBox">
          <span>Password:</span>
            <input
              type="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          <i></i>
          </label>
        <div className="links">
          <a onClick={handleGetStarted}>Don't have a account yet? </a>
          <a onClick={handleGetStarted}>Sign Up</a>
          </div>
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default LogIn;