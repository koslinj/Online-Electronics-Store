import { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { fetchProducts } from '../api/products';
import { MainCarousel } from '@/components/MainCarousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shadcn/components/ui/carousel';
import { data } from "@/data/data"
import { NewsCard } from '@/components/NewsCard';
import { Link } from 'react-router-dom';

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
            <Link key={product.id} to={`/products/${product.categoryUrl}/${encodeURIComponent(product.name)}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>

      <div className='border-t-2 border-gray-400 my-10 py-5'>
        <h2 className="text-4xl font-bold">Wybrane dla Ciebie</h2>
        <h3 className="text-2xl text-gray-600 mb-4">Na podstawie ostatnio oglądanych produktów</h3>
        <div className="mx-auto max-w-7xl mt-4">
          <Carousel
            opts={{ duration: 36, dragFree: true, slidesToScroll: 'auto' }}
            className="md:mx-12"
          >
            <CarouselContent className='py-2 px-6'>
              {products.slice(8, 14).map((product) => (
                <CarouselItem key={product.id} className="basis-1/3">
                  <Link to={`/products/${product.categoryUrl}/${encodeURIComponent(product.name)}`}>
                    <ProductCard product={product} />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-gray-500 size-10 hidden md:flex" />
            <CarouselNext className="border-gray-500 size-10 hidden md:flex" />
          </Carousel>
        </div>
      </div>

      <div className='border-t-2 border-gray-400 my-10 py-5'>
        <h2 className="text-4xl font-bold mb-4">Aktualności</h2>
        <div className="mx-auto max-w-7xl mt-4">
          <Carousel
            opts={{ duration: 36, dragFree: true, slidesToScroll: 'auto' }}
            className="md:mx-12"
          >
            <CarouselContent className='py-2 px-2'>
              {data.map((data) => (
                <CarouselItem key={data.title} className="basis-1/3">
                  <NewsCard data={data} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-gray-500 size-10 hidden md:flex" />
            <CarouselNext className="border-gray-500 size-10 hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
