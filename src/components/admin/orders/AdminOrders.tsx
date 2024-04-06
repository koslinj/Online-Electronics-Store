import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react";
import { Order, Product } from "@/types";
import axios from "axios";
import { SearchProps } from "antd/es/input";
import { OneOrder } from "./OneOrder";
import { fetchOrdersPaginable } from "@/api/orders";


export const AdminOrders = () => {
  const { t } = useTranslation()

  const [orders, setOrders] = useState<Order[]>([]);
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
      fetchOrders();
    }
  }, [currentPage, pageSize, searching]);

  const fetchOrders = async () => {
    try {
      const res = await fetchOrdersPaginable(currentPage, pageSize) // Adjust size as needed
      if (res) {
        const { data, total } = res
        setOrders(data);
        setTotalElements(total);
      } else console.error("Something went wrong")
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    if (value === '') return
    try {
      const response = await axios.get(`http://localhost:8080/api/orders`, {
        params: { search: searchQuery }
      });
      setSearching(true)

      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }

  return (
    <div className="p-4 pr-0 border-2 border-gray-400 rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-4">{t('orders')}</h2>
      <div>
        {/* <div className="flex justify-between mr-8 flex-wrap gap-2">
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
        </div> */}
        {orders?.map((order) => (
          <OneOrder key={order.id} order={order} setOrders={setOrders} />
        ))}
      </div>
    </div>
  )
}
