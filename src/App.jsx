import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import AdminPage from './pages/AdminPage';
import AllSportsPage from './pages/AllSportsPage';
import SportDetailsPage from './pages/SportDetailsPage';
import FavoriteSportPage from './pages/FavoriteSportPage';
import { AuthContextWrapper } from "./context/Auth.context";
import IsPrivate from "./components/IsPrivate"; // Import the IsPrivate component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        {/* Wrap the protected routes with IsPrivate component */}
        <Route path="/admin" element={<IsPrivate><AdminPage /></IsPrivate>} />
        <Route path="/allsports" element={<IsPrivate><AllSportsPage /></IsPrivate>} />
        <Route path="/allsports/:id" element={<IsPrivate><SportDetailsPage /></IsPrivate>} />
    
        <Route path="/favorites/:user" element={<FavoriteSportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
