import axios from "axios";

export const fetchCategoriesByGeneralCategory = async (generalCategory: string | null) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/categories?generalCategory=${generalCategory}`);
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};