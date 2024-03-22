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
    <div className='flex mt-10'>
      <Filter filters={Object.entries(filters)} />
      <div>
        <h2 className='text-2xl font-bold m-4'>{categoryEntity?.name}</h2>
        <div className='flex gap-2'>
          {filteredProducts.map((product) => (
            <Link to={encodeURIComponent(product.name)}>
              <ProductCard key={product.id} product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}