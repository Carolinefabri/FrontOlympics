import { Link } from 'react-router-dom'; // Importe Link de 'react-router-dom'
import React, { useState, useEffect } from "react"; // Importe useState e useEffect da 'react'

const SportsList = () => {
  const [sports, setSports] = useState([]);

  async function getSports() {
    try {
      const response = await fetch('https://sua-api.com/sports'); // Substitua pela URL correta da sua API de esportes
      if (response.ok) {
        const sportsData = await response.json();
        setSports(sportsData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSports();
  }, []);

  return (
    <>
      {sports.map(oneSport => (
        <Link
          to={`/sport/${oneSport.id}`} // Substitua pelo caminho correto para a página de detalhes do esporte
          key={oneSport.id}
          style={{ display: 'block', border: '1px solid lightgrey', margin: '1rem 0' }}
        >
          <h2>{oneSport.name}</h2>
          {/* Você pode adicionar mais informações do esporte aqui, se necessário */}
        </Link>
      ))}
    </>
  );
}

export default SportsList;
