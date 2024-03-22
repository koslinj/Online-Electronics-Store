import { useParams, useSearchParams } from 'react-router-dom';
import { Category, Product } from '../types';
import { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '../api/products';
import { ProductCard } from '../components/ProductCard';
import { fetchCategoryByUrlName } from '../api/categories';
import { Filter } from '@/components/filter/Filter';
import { useFiltering } from '@/hooks/useFiltering';

export const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [allProducts, setAllProducts] = useState([]);
  const [categoryEntity, setCategoryEntity] = useState<Category>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _prod = await fetchProductsByCategory(category!);
        setAllProducts(_prod);
        const uniqueFilters: { [key: string]: Set<string> } = {};
        _prod.forEach((json: Product) => {
          for (let i = 0; i < json.filterNames.length; ++i) {
            if (!uniqueFilters[json.filterNames[i]]) {
              uniqueFilters[json.filterNames[i]] = new Set<string>();
            }
            uniqueFilters[json.filterNames[i]].add(json.filterValues[i]);
          }
        });

        const updatedFilters: { [key: string]: string[] } = {};
        for (const filterName in uniqueFilters) {
          updatedFilters[filterName] = Array.from(uniqueFilters[filterName]);
        }
        setFilters(updatedFilters);

        const _catEntity = await fetchCategoryByUrlName(category!);
        setCategoryEntity(_catEntity);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [category]);

  const { filteredProducts } = useFiltering(allProducts);

  const handleFilterChange = (filterName: string, filterValue: string) => {
    const currentValues = searchParams.getAll(filterName);

    if (currentValues.includes(filterValue)) {
      const updatedValues = currentValues.filter(value => value !== filterValue);

      setSearchParams(params => {
        params.delete(filterName);
        updatedValues.forEach(value => {
          params.append(filterName, value);
        });
        return params;
      });
    } else {
      setSearchParams(params => {
        params.append(filterName, filterValue);
        return params;
      });
    }
  };

  return (
    <div className='flex mt-10'>
      {Object.entries(filters).map(([filterName, options]) => (
        <Filter
          key={filterName}
          options={options}
          filterName={filterName}
          onFilterChange={handleFilterChange}
        />
      ))}
      <div>
        <h2 className='text-2xl font-bold m-4'>{categoryEntity?.name}</h2>
        <div className='flex gap-2'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}