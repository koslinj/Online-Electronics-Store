import { useCart } from '@/providers/CartProvider'
import { useTranslation } from 'react-i18next'
import { FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface Props {
  method: {
    price: number
  },
  payment: {
    price: number
  }
}

export const FinalConfirm = ({ method, payment }: Props) => {
  const { cart } = useCart()

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
      <Link to='/'>
        <div
          className="flex gap-2 items-center justify-center text-white bg-green-600 hover:bg-green-700 active:bg-green-900 p-3 w-full rounded-lg duration-200"
        >
          <p className="text-lg font-semibold">Kupuję i płacę</p>
          <FaChevronRight className="size-5 translate-y-0.5" />
        </div>
      </Link>
    </div>
  )
}
