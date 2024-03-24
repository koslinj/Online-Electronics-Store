import { useState, useEffect } from "react";
import { fetchCategories } from "@/api/categories";
import { useTranslation } from "react-i18next";

export const CategoryInput = ({ categoryName, setCategoryName }) => {
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation()

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
    <div>
      <label>
        <p className='text-lg font-semibold'>{t("category")}</p>
        <select
          className='p-1 outline-none border-gray-400 border-2 rounded-md'
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        >
          <option value="">{t('choose_category')}</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </label>
    </div>
  )
}
