import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/products');
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};