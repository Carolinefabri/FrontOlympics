
export const fetchSport = async (sportId) => {
  try {
    const response = await fetch(`http://localhost:5005/sports/${sportId}`);
    if (response.status === 200) {
      const parsedSport = await response.json();
      return parsedSport; // Certifique-se de que parsedSport seja um objeto, não uma matriz
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
