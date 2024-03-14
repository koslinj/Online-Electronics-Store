import { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { fetchProducts } from '../api/products';
import { MainCarousel } from '@/components/MainCarousel';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const _prod = await fetchProducts()
        setProducts(_prod)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <MainCarousel />
      <h1 className="text-red-500">HOME</h1>
      <ul>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};
