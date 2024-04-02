import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/products/all');
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchProductsByCategory = async (category: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/products?category=${category}`);
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchProductByName = async (name: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/products?name=${name}`);
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export const fetchProductById = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/products/${id}`);
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}