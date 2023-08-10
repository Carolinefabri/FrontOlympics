import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';
import {API_URL} from '../config/config.index';
import backgroundParisImage from "/images/parissignup.jpg"; 




const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleGetStarted = () => {
    navigate('/login');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { userName, email, password, profilePicture } = formData;
      const formDataToSend = new FormData();
      formDataToSend.append("userName", userName);
      formDataToSend.append("email", email);
      formDataToSend.append("password", password);


      const response = await axios.post(
        
        `${API_URL}/user/signup`,

        formDataToSend
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <NavBar />
    <img className="backgroundParisImage " src={backgroundParisImage } alt="background.signup" /> 
      <div className="bodyBox-up">
      <div className="box-up">
        <span className="borderline-up"></span>
        <span className="borderline1-up"></span>
      
      <form onSubmit={handleSubmit}>  
         <h2>Sign Up</h2>
        <label className="inputBox-up" htmlFor="userName">
          <span className="span-up">UserName</span>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
        <i></i>
        </label>
        <label className="inputBox-up" htmlFor="email">
        <span className="span-up">E-mail:</span>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
          <i></i>
        </label>

        <label className="inputBox-up"htmlFor="Password" >
        <span className="span-up">Password</span>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
          <i></i>
        </label>
  
      <div className="links">
          <a href="#">Already have an account?? </a>
          <a onClick={handleGetStarted}>Login </a>
          </div>
          <button type="submit">Sign Up</button>
    </form>
    </div>
    </div>
      </div>
  );
};

export default SignUp;