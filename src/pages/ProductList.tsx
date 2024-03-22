import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { Filter } from '@/components/filter/Filter';
import { useFiltering } from '@/hooks/useFiltering';
import { useProductListData } from '@/hooks/useProductListData';
import { useFilterHandling } from '@/hooks/useFilterHandling';

export const ProductList = () => {
  const { category } = useParams();
  const { allProducts, categoryEntity, filters } = useProductListData(category);
  const { handleFilterChange } = useFilterHandling();

  const { filteredProducts } = useFiltering(allProducts);

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