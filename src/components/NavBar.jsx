import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../App.css";
import sportsoulImage from "/images/sportsoul.png"; 

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="NavBar">
         <img className="sportsoulImage" src={sportsoulImage} alt="sportsoulImage" /> 
      <ul> 
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About It</Link></li>
        {location.pathname !== '/signup' && (
          <li><Link to="/signup">Sign Up</Link></li>
        )}
        {location.pathname !== '/login' && (
          <li><Link to="/login">Log In</Link></li>
        )}
        {/* Add more conditionals for other links */}
      </ul>
    </nav>
  );
};

export default Navbar;