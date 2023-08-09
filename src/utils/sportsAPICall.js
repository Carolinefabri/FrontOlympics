import { API_URL } from '../config/config.index';

export const fetchSport = async (sportId) => {
  try {
    const response = await fetch(`${API_URL}/sports/${sportId}`);
    if (response.ok) {
      const parsedSport = await response.json();
      return parsedSport;
    } else {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }
  } catch (error) {
    console.error('Error fetching sport:', error);
    throw error;
  }
};
