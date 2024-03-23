import { useState, useEffect } from "react";
import { fetchCategories } from "@/api/categories";

export const CategoryInput = ({ categoryName, setCategoryName }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await fetchCategories()
        const namesArray = data.map(item => item.name);
        setCategories(namesArray)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <label>
      <p className='text-lg font-semibold'>Kategoria</p>
      <select
        className='p-1 outline-none border-gray-400 border-2 rounded-md'
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      >
        <option value="">Wybierz kategorie...</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
    </label>
  )
}
