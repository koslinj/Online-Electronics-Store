import axios from "axios";

export const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/categories');
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};