import { Link, useParams } from 'react-router-dom';
import { Category } from '../types';
import { useEffect, useState } from 'react';
import { fetchCategoriesByGeneralCategory } from '../api/categories';

export const CategoryPage = () => {
  const { generalCategory } = useParams();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const _cat = await fetchCategoriesByGeneralCategory(generalCategory || null)
        setCategories(_cat)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [generalCategory]);

  return (
    <>
      <h2>{generalCategory}</h2>
      {categories.map((cat) => (
        <Link to={`/products/${cat.urlName}`} key={cat.id}>
          <div>{cat.name}</div>
        </Link>
      ))}
    </>
  )
}
