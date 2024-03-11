import { Link, useParams } from 'react-router-dom';
import { Product } from '../types';
import { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '../api/products';
import { ProductCard } from '../components/ProductCard';

export const ProductList = () => {
  const { category } = useParams();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const _prod = await fetchProductsByCategory(category || null)
        setProducts(_prod)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2>{category}</h2>
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </>
  )
}