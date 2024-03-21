import { useParams, useSearchParams } from 'react-router-dom';
import { Category, Product } from '../types';
import { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '../api/products';
import { ProductCard } from '../components/ProductCard';
import { fetchCategoryByUrlName } from '../api/categories';
import { Filter } from '@/components/filter/Filter';

export const ProductList = () => {
  const { category } = useParams();
  const [producerFilter, setProducerFilter] = useSearchParams()

  const [producers, setProducers] = useState<String[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryEntity, setCategoryEntity] = useState<Category>();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const _prod = await fetchProductsByCategory(category!)
        const uniqueProducerNames = new Set<String>();
        _prod.forEach((json: { producerName: String; }) => {
          uniqueProducerNames.add(json.producerName);
        })
        const arrayOfUniqueProducerNames = Array.from(uniqueProducerNames)

        setProducers(arrayOfUniqueProducerNames)
        setAllProducts(_prod)

        const _catEntity = await fetchCategoryByUrlName(category!)
        setCategoryEntity(_catEntity)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    const selectedProducers = producerFilter.getAll('producer');
    if (selectedProducers.length === 0) {
      setProducts(allProducts)
    } else {
      const filteredProducts = allProducts.filter(product => selectedProducers.includes(product.producerName as string));
      setProducts(filteredProducts)
    }
  }, [producerFilter, allProducts])

  return (
    <div className='flex mt-10'>
      <Filter producers={producers} producerFilter={producerFilter} setProducerFilter={setProducerFilter} />
      <div>
        <h2 className='text-2xl font-bold m-4'>{categoryEntity?.name}</h2>
        <div className='flex gap-2'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}