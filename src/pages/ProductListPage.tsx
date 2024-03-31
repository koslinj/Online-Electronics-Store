import { Link, useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useFiltering } from '@/hooks/useFiltering';
import { useProductListData } from '@/hooks/useProductListData';
import { Filter } from '@/components/filter/Filter';

export const ProductListPage = () => {
  const { category } = useParams();
  const { allProducts, categoryEntity, filters } = useProductListData(category);

  const { filteredProducts } = useFiltering(allProducts);

  return (
    <div className='mt-8'>
      <h2 className='text-4xl font-semibold mb-2 ml-1'>{categoryEntity?.name}</h2>
      <div className='flex justify-start items-start'>
        <Filter filters={Object.entries(filters)} />
        <div className='flex gap-2 flex-wrap ml-5'>
          {filteredProducts.map((product) => (
            <Link key={product.id} to={encodeURIComponent(product.name)}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}