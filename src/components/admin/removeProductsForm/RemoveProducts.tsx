import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react";
import { Product } from "@/types";
import { OneProduct } from "./OneProduct";
import axios from "axios";
import { SearchProps } from "antd/es/input";
import { SearchProductAdmin } from "./SearchProductAdmin";
import { PaginationAdmin } from "./PaginationAdmin";


export const RemoveProduct = () => {
  const { t } = useTranslation()

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const [pageSize, setPageSize] = useState(5)
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearchChange = (e: any) => {
    if (e.target.value === '') {
      setSearching(false)
    }
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    if (!searching) {
      fetchProducts();
    }
  }, [currentPage, pageSize, searching]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products?page=${currentPage - 1}&size=${pageSize}`); // Adjust size as needed
      setProducts(response.data.content);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    if (value === '') return
    try {
      const response = await axios.get(`http://localhost:8080/api/products`, {
        params: { search: searchQuery }
      });
      setSearching(true)

      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }

  return (
    <div className="p-4 pr-0 border-2 border-gray-400 rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-4">{t('remove_product')}</h2>
      <div>
        <div className="flex justify-between mr-8 flex-wrap gap-2">
          <SearchProductAdmin
            handleSearchChange={handleSearchChange}
            onSearch={onSearch}
            searchQuery={searchQuery}
          />
          <PaginationAdmin
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalElements={totalElements}
            searching={searching}
          />
        </div>
        {products.map((product) => (
          <OneProduct key={product.id} product={product} setProducts={setProducts} />
        ))}
      </div>
    </div>
  )
}
