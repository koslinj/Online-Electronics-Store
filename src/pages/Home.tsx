import { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { fetchProducts } from '../api/products';
import { MainCarousel } from '@/components/MainCarousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shadcn/components/ui/carousel';

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

      <div className='border-t-2 border-gray-400 my-10 py-5'>
        <h2 className="text-4xl font-bold mb-4">Polecamy</h2>
        <div className='flex flex-wrap gap-4'>
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
