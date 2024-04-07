import { Link, useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useFiltering } from '@/hooks/useFiltering';
import { useProductListData } from '@/hooks/useProductListData';
import { Filter } from '@/components/filter/Filter';
import { PaginationProducts } from '@/components/PaginationProducts';
import { useEffect, useState } from 'react';
import { Product, Sorting } from '@/types';
import { SearchProps } from 'antd/es/input';
import axios from 'axios';
import { SearchProductAdmin } from '@/components/admin/removeProductsForm/SearchProductAdmin';
import { ConfigProvider, Select } from 'antd';

const sortingOptions = [
  {
    label: "Od A do Z",
    value: "Od A do Z"
  },
  {
    label: "Od Z do A",
    value: "Od Z do A"
  },
  {
    label: "Od najtańszych",
    value: "Od najtańszych"
  },
  {
    label: "Od najdroższych",
    value: "Od najdroższych"
  }
]

export const ProductListPage = () => {
  const { category } = useParams();

  const [sorting, setSorting] = useState<Sorting>('Od A do Z');

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

  const refreshCurrentProducts = (products: Product[]) => {
    const indexOfLastProduct = currentPage * pageSize;
    const indexOfFirstProduct = indexOfLastProduct - pageSize;
    const curr = products.slice(indexOfFirstProduct, indexOfLastProduct);

    setCurrentProducts(curr)
  }

  const { filteredProducts } = useFiltering(allProducts, setTotalElements, setCurrentPage, sorting, refreshCurrentProducts);

  useEffect(() => {
    refreshCurrentProducts(filteredProducts)
  }, [currentPage, pageSize])

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
      <div className='flex justify-start items-start flex-wrap md:flex-nowrap'>
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
          <div className='flex flex-wrap items-center justify-between gap-6 mt-3 mb-6'>
            <PaginationProducts
              pageSize={pageSize}
              setPageSize={setPageSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalElements={totalElements}
              searching={searching}
            />
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    colorTextPlaceholder: 'rgb(156 163 175)',
                    colorBorder: 'rgb(156 163 175)',
                    fontSizeIcon: 16,
                    fontSize: 16,
                    optionPadding: 10,
                    controlHeight: 40
                  }
                }
              }}
            >
              <Select
                optionFilterProp="children"
                value={sorting}
                onChange={(value) => setSorting(value)}
                options={sortingOptions}
                style={{
                  width: "190px"
                }}
              />
            </ConfigProvider>
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