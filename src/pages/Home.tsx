import { useState, useEffect } from 'react';
import { Category, Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { TopNavbar } from '../components/navbar/TopNavbar';
import { BottomNavbar } from '../components/navbar/BottomNavbar';
import { fetchCategories } from '../api/categories';
import { fetchProducts } from '../api/products';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const _cat = await fetchCategories()
        const _prod = await fetchProducts()
        setCategories(_cat)
        setProducts(_prod)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <TopNavbar />
      <BottomNavbar categories={categories} />
      <h1 className="text-red-500">HOME</h1>
      <ul>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};
