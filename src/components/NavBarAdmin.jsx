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
          {location.pathname !== '/favorites/64d20eb44a606b49bc394f01' && (
            <li><Link to="/favorites/64d20eb44a606b49bc394f01">Favorites</Link></li>
          )}
           {location.pathname !== '/allsports' && (
            <li><Link to="/allsports">All Sports</Link></li>
          )}
       
          {/* Add more conditionals for other links */}
        </ul>
      </nav>
    );
  };

  
export default NavbarAdmin;