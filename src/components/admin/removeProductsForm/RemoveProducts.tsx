import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react";
import { Product } from "@/types";
import { OneProduct } from "./OneProduct";
import axios from "axios";
import { Pagination, Select } from "antd";

export const RemoveProduct = () => {
  const { t } = useTranslation()

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const [pageSize, setPageSize] = useState(5)
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const searchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products`, {
        params: { search: searchQuery }
      });
      setSearching(true)

      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

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
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="p-4 pr-0 border-2 border-gray-400 rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-4">{t('remove_product')}</h2>
      <div className="max-h-[600px] overflow-y-auto">
        <div>
          <input
            type="text"
            placeholder="Search products by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button onClick={searchProducts}>Search</button>
        </div>
        {!searching &&
          <>
            <Pagination
              pageSize={pageSize}
              current={currentPage}
              onChange={(page) => setCurrentPage(page)}
              total={totalElements}
            />
            <Select
              defaultValue={5}
              style={{ width: 120 }}
              onChange={(value) => setPageSize(value)}
              options={[
                { value: 5, label: '5 / page' },
                { value: 10, label: '10 / page' },
                { value: 20, label: '20 / page' },
                { value: 50, label: '50 / page' },
              ]}
            />
          </>
        }
        {products.map((product) => (
          <OneProduct key={product.id} product={product} setProducts={setProducts} />
        ))}
      </div>
    </div>
  )
}
