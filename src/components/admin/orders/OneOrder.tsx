import { Order } from '@/types'
import { ConfigProvider, Select, message } from 'antd'
import axios from 'axios'
import { format } from 'date-fns'
import { Dispatch, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaChevronDown, FaInfoCircle, FaSearch } from 'react-icons/fa'

const filterOption = (input: any, option: any) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

interface Props {
  order: Order
  setOrders: Dispatch<SetStateAction<Order[]>>
}

const states = ["Oczekuje na zatwierdzenie", "Zatwierdzone", "W dostawie", "Dostarczone"]
const statesObjects = states.map(state => ({ label: state, value: state }));

export const OneOrder = ({ order, setOrders }: Props) => {
  const { t } = useTranslation()
  const [focused, setFocused] = useState(false)
  const formatStr = 'dd/MM/yyyy'
  const formattedSum = order.sum.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  const handleUpdate = async (id: number, value: string) => {
    try {
      const formData = new FormData();
      formData.append('state', value);

      await axios.put(`http://localhost:8080/api/orders/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setOrders(prevOrders => {
        return prevOrders.map(order => {
          if (order.id === id) {
            return { ...order, state: value };
          }
          return order;
        });
      });
      message.info({
        content:
          <div className='flex items-center gap-3'>
            <FaInfoCircle className='size-10 text-blue-500' />
            <p className='text-xl'>Stan zamówienia zmieniony!</p>
          </div>,
        icon: <></>
      });
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div className="flex justify-between items-center border-b-2 border-b-gray-400 mt-3 py-5 text-center">
      <p className='font-bold text-2xl w-[180px]'>{order.state}</p>
      <div className='space-y-2'>
        <p className='font-semibold text-xl'>{format(order.createdAt, formatStr)}</p>
        <p className='text-xl italic'>{order.user}</p>
      </div>
      <p className='font-semibold text-xl'>{formattedSum}</p>
      <div className='flex flex-col items-center justify-center gap-5'>
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
            showSearch
            onDropdownVisibleChange={() => setFocused(!focused)}
            suffixIcon={focused ? <FaSearch color="rgb(100 100 100)" /> : <FaChevronDown color="rgb(100 100 100)" />}
            placeholder={t('choose_state')}
            optionFilterProp="children"
            value={order.state}
            onChange={(value) => {handleUpdate(order.id, value); console.log(value) }}
            filterOption={filterOption}
            options={statesObjects}
            style={{
              width: "240px"
            }}
          />
        </ConfigProvider>
      </div>
    </div>
  )
}
