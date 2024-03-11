import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/products');
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchProductsByCategory = async (category: string | null) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/products?category=${category}`);
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};