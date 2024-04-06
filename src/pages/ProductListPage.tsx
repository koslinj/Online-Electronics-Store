import { Link, useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useFiltering } from '@/hooks/useFiltering';
import { useProductListData } from '@/hooks/useProductListData';
import { Filter } from '@/components/filter/Filter';
import { PaginationProducts } from '@/components/PaginationProducts';
import { useEffect, useState } from 'react';
import { Product } from '@/types';

export const ProductListPage = () => {
  const { category } = useParams();
  const { allProducts, categoryEntity, filters } = useProductListData(category);

  const [currentProducts, setCurrentProducts] = useState<Product[]>([])

  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const [pageSize, setPageSize] = useState(6)
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const { filteredProducts } = useFiltering(allProducts, setTotalElements, setCurrentPage);

  useEffect(() => {
    const indexOfLastProduct = currentPage * pageSize;
    const indexOfFirstProduct = indexOfLastProduct - pageSize;
    const curr = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    console.log(currentPage)
    console.log(pageSize)

    setCurrentProducts(curr)
  }, [filteredProducts, currentPage, pageSize])

  return (
    <div className='mt-8'>
      <h2 className='text-4xl font-semibold mb-2 ml-1'>{categoryEntity?.name}</h2>
      <div className='flex justify-start items-start'>
        <Filter filters={Object.entries(filters)} />
        <div>
          <PaginationProducts
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalElements={totalElements}
            searching={searching}
          />
          <div className='flex gap-2 flex-wrap ml-5'>
            {currentProducts.map((product) => (
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