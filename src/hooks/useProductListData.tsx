import { useEffect, useState } from 'react';
import { Category, Product } from '@/types'; // Import types as needed
import { fetchProductsByCategory } from '@/api/products';
import { fetchCategoryByUrlName } from '@/api/categories';

export const useProductListData = (category: string | undefined) => {
  const [allProducts, setAllProducts] = useState([]);
  const [categoryEntity, setCategoryEntity] = useState<Category>();
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});

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
        Object.keys(uniqueFilters)
          .sort() // Sort filter names alphabetically
          .forEach(filterName => {
            updatedFilters[filterName] = Array.from(uniqueFilters[filterName]);
          });
        setFilters(updatedFilters);

        const _catEntity = await fetchCategoryByUrlName(category!);
        setCategoryEntity(_catEntity);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (category) {
      fetchData();
    }
  }, [category]);

  return { allProducts, categoryEntity, filters };
};