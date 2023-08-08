import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../App.css";
const NavbarAdmin = () => {
    const location = useLocation();
  
    return (
      <nav className="NavBar">
        <ul>
      {location.pathname !== '/admin' && (
            <li><Link to="/admin">Admin</Link></li>
          )}
          {location.pathname !== '(`/favorites/${user})' && (
            <li><Link to="(`/favorites/${user})">Favorites</Link></li>
          )}
       
          {/* Add more conditionals for other links */}
        </ul>
      </nav>
    );
  };

  
export default NavbarAdmin;