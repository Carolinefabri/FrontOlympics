export const fetchSport = async (sportId, setSport) =>  {
  try {
    const response = await fetch(`http://localhost:5005/sports/${sportId}`);
    if (response.status === 200) {
      const parsedSport = await response.json();
      setSport(parsedSport);
    }
  } catch (error) {
    console.error(error);
  }
};

