import axios from "axios";

export const fetchAddressesByUsername = async (username: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/addresses?username=${username}`);
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};