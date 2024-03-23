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
      <h2 className='text-3xl font-bold mb-2 ml-1'>{categoryEntity?.name}</h2>
      <div className='flex'>
        <Filter filters={Object.entries(filters)} />
        <div>
          <div className='flex gap-2'>
            {filteredProducts.map((product) => (
              <Link key={product.id} to={encodeURIComponent(product.name)}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}