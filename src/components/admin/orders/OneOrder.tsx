import { Order } from '@/types'
import { message } from 'antd'
import axios from 'axios'
import { format } from 'date-fns'
import { Dispatch, SetStateAction } from 'react'
import { FaInfoCircle } from 'react-icons/fa'

interface Props {
  order: Order
  setOrders: Dispatch<SetStateAction<Order[]>>
}

export const OneOrder = ({ order, setOrders }: Props) => {
  const formatStr = 'dd/MM/yyyy'
  const formattedSum = order.sum.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  const handleUpdate = async (id: number) => {
    try {
      // await axios.put(`http://localhost:8080/api/products/${id}`);
      // setProducts(prev => prev.filter(item => item.id !== id))
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
    <div className="flex justify-between items-center border-b-2 border-b-gray-400 mb-3">
      <div>
        <p>{order.state}</p>
        <p>{format(order.createdAt, formatStr)}</p>
        <p>{order.user}</p>
        <p>{formattedSum}</p>
      </div>
      <button
        onClick={() => handleUpdate(order.id)}
        type="submit"
        className="p-2 mr-4 hover:scale-110 duration-200 border-2 border-black rounded-xl"
      >
        Zapisz
      </button>
    </div>
  )
}
