import { Link, useParams } from 'react-router-dom';
import { Category } from '../types';
import { useEffect, useState } from 'react';
import { fetchCategoriesByUrlGeneralCategory } from '../api/categories';

export const CategoryPage = () => {
  const { generalCategory } = useParams();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const _cat = await fetchCategoriesByUrlGeneralCategory(generalCategory!)
        setCategories(_cat)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [generalCategory]);

  return (
    <>
      <h2 className='text-3xl text-gray-600 my-8'>
        <span className='font-bold text-black'>Kategorie</span><br />
        w {categories[0]?.generalCategory}
      </h2>
      <div>
        {categories.map((cat) => (
          <Link to={`/products/${cat.urlName}`} key={cat.id}>
            <div className='text-xl mt-3 font-semibold italic hover:underline'>{cat.name}</div>
          </Link>
        ))}
      </div>
    </>
  )
}
