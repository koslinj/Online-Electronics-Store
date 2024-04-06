import { Link, useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useFiltering } from '@/hooks/useFiltering';
import { useProductListData } from '@/hooks/useProductListData';
import { Filter } from '@/components/filter/Filter';
import { PaginationProducts } from '@/components/PaginationProducts';
import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { SearchProps } from 'antd/es/input';
import axios from 'axios';
import { SearchProductAdmin } from '@/components/admin/removeProductsForm/SearchProductAdmin';

export const ProductListPage = () => {
  const { category } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const [pageSize, setPageSize] = useState(6)
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const [currentProducts, setCurrentProducts] = useState<Product[]>([])

  const { allProducts, setAllProducts, categoryEntity, filters } = useProductListData(
    category,
    searching,
    setSearching,
    setSearchQuery
  );
  const { filteredProducts } = useFiltering(allProducts, setTotalElements, setCurrentPage);

  useEffect(() => {
    const indexOfLastProduct = currentPage * pageSize;
    const indexOfFirstProduct = indexOfLastProduct - pageSize;
    const curr = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    setCurrentProducts(curr)
  }, [filteredProducts, currentPage, pageSize])

  const handleSearchChange = (e: any) => {
    if (e.target.value === '') {
      setSearching(false)
    }
    setSearchQuery(e.target.value)
  }

  const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    if (value === '') return
    try {
      const response = await axios.get(`http://localhost:8080/api/products`, {
        params: { search: searchQuery, category: category }
      });
      setSearching(true)

      setAllProducts(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }

  return (
    <div className='mt-8'>
      <h2 className='text-4xl font-semibold mb-4 ml-1'>{categoryEntity?.name}</h2>
      <div className='flex justify-start items-start'>
        <Filter filters={Object.entries(filters)}>
          <div>
            <h3 className="text-lg font-bold mb-1">Szukaj</h3>
            <SearchProductAdmin
              handleSearchChange={handleSearchChange}
              onSearch={onSearch}
              searchQuery={searchQuery}
            />
          </div>
        </Filter>
        <div>
          <div className='flex items-center justify-between mt-3 mb-6'>
            <PaginationProducts
              pageSize={pageSize}
              setPageSize={setPageSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalElements={totalElements}
              searching={searching}
            />
          </div>
          <div className='flex gap-2 flex-wrap ml-5'>
            {!searching && currentProducts.map((product) => (
              <Link key={product.id} to={encodeURIComponent(product.name)}>
                <ProductCard product={product} />
              </Link>
            ))}
            {searching && filteredProducts.map((product) => (
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