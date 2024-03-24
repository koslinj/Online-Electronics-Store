import axios from "axios";

export const fetchFilters = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/filters");
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};