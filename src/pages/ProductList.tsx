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
  const [producers, setProducers] = useState<string[]>([]);
  const [ramValues, setRamValues] = useState<string[]>([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categoryEntity, setCategoryEntity] = useState<Category>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _prod = await fetchProductsByCategory(category!);
        setAllProducts(_prod);
        const uniqueProducerNames = new Set<string>();
        const uniqueRamValues = new Set<string>();
        _prod.forEach((json: Product) => {
          for (let i = 0; i < json.filterNames.length; ++i) {
            // TODO nie robic tego tak manualnie ifami ...
            // powinienem jakos z bazy ciagnac wszystkie rodzaje Filtrow ktore sa uzywane dla tego typu produktow
            // np dla Laptopow gamingowych
            if (json.filterNames[i] == "Producent") uniqueProducerNames.add(json.filterValues[i]);
            else uniqueRamValues.add(json.filterValues[i]);
          }
        })
        const arrayOfUniqueProducerNames = Array.from(uniqueProducerNames)
        const arrayOfUniqueRamValues = Array.from(uniqueRamValues)

        setProducers(arrayOfUniqueProducerNames)
        setRamValues(arrayOfUniqueRamValues)

        const _catEntity = await fetchCategoryByUrlName(category!);
        setCategoryEntity(_catEntity);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [category]);

  const { filteredProducts } = useFiltering(allProducts);

  const handleFilterChange = (filterName: any, filterValue: any) => {
    const currentProducers = searchParams.getAll(filterName);

    if (currentProducers.includes(filterValue)) {
      const updatedProducers = currentProducers.filter(producer => producer !== filterValue);

      setSearchParams(params => {
        params.delete(filterName);
        updatedProducers.forEach(producer => {
          params.append(filterName, producer);
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
      <Filter
        options={producers}
        // TODO powinienem jakos z bazy ciagnac wszystkie rodzaje Filtrow ktore sa uzywane dla tego typu produktow
        // np dla Laptopow gamingowych
        filterName={"Producent"}
        onFilterChange={handleFilterChange}
      />
      <Filter
        options={ramValues}
        // TODO powinienem jakos z bazy ciagnac wszystkie rodzaje Filtrow ktore sa uzywane dla tego typu produktow
        // np dla Laptopow gamingowych
        filterName={"Pamięć RAM"}
        onFilterChange={handleFilterChange}
      />
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