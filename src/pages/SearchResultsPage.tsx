import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

export const SearchResultsPage = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products`, {
          params: { search: searchQuery }
        });

        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (searchQuery) {
      fetchProducts();
    }
  }, [searchQuery]);

  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
