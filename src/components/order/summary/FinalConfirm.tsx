import { useCart } from '@/providers/CartProvider'
import { User } from '@/types'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { FaChevronRight } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

interface Props {
  method: {
    price: number
  },
  payment: {
    price: number
  },
  user: User
}

export const FinalConfirm = ({ user, method, payment }: Props) => {
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()

  const cartSum = cart.reduce((total, item) => total + item.quantity * item.product.price, 0)
  const restSum = method?.price + payment?.price

  const formattedMainSum = cartSum.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  const formattedRestSum = restSum.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  const formattedSum = (cartSum + restSum).toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  const handleSubmit = async () => {
    try {
      const body = {
        user: user.username,
        items: cart.map(it => (
          {
            quantity: it.quantity,
            productId: it.product.id
          }
        ))
      }
      const response = await axios.post('http://localhost:8080/api/orders', body);
      clearCart()
      navigate("/order/confirmation", { replace: true })
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div className='bg-white p-4 rounded-xl'>
      <div className='text-lg py-4 space-y-1 border-b-[3px] border-gray-400 border-dotted'>
        <div className='flex justify-between items-center gap-y-5 gap-x-10'>
          <p>Produkty i usługi</p>
          <p>{formattedMainSum}</p>
        </div>
        <div className='flex justify-between items-center gap-y-5 gap-x-10'>
          <p>Dostawa i płatność</p>
          <p>{formattedRestSum}</p>
        </div>
      </div>
      <div className='py-5 flex justify-between items-center'>
        <p className='text-xl'>Do zapłaty</p>
        <p className='text-2xl font-bold'>{formattedSum}</p>
      </div>
      <div
        onClick={() => handleSubmit()}
        className="cursor-pointer flex gap-2 items-center justify-center text-white bg-green-600 hover:bg-green-700 active:bg-green-900 p-3 w-full rounded-lg duration-200"
      >
        <p className="text-lg font-semibold">Kupuję i płacę</p>
        <FaChevronRight className="size-5 translate-y-0.5" />
      </div>
    </div>
  )
}
