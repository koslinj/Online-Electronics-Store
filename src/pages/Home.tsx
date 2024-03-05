import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProducts(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-red-500">HOME</h1>
      
      <ul>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};
