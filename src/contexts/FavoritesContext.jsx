import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavoritesContext = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favoriteSports, setFavoriteSports] = useState([]);

  const addFavorite = (sport) => {
    setFavoriteSports((prevFavorites) => [...prevFavorites, sport]);
  };

  const removeFavorite = (sportId) => {
    setFavoriteSports((prevFavorites) =>
      prevFavorites.filter((sport) => sport.id !== sportId)
    );
  };

  const isFavorite = (sportId) => {
    return favoriteSports.some((sport) => sport.id === sportId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteSports, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
