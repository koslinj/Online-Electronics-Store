import { Link, useParams } from 'react-router-dom';
import { Category, Product } from '../types';
import { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '../api/products';
import { ProductCard } from '../components/ProductCard';
import { fetchCategoryByUrlName } from '../api/categories';

export const ProductList = () => {
  const { category } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categoryEntity, setCategoryEntity] = useState<Category>();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const _prod = await fetchProductsByCategory(category!)
        setProducts(_prod)

        const _catEntity = await fetchCategoryByUrlName(category!)
        setCategoryEntity(_catEntity)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
      <h2 className='text-2xl font-bold m-4'>{categoryEntity?.name}</h2>
      <div className='flex gap-2'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}