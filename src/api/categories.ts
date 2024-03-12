import axios from "axios";

export const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/categories");
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchCategoryByUrlName = async (name: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/categories?name=${name}`);
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchCategoriesByUrlGeneralCategory = async (generalCategory: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/categories?generalCategory=${generalCategory}`);
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};