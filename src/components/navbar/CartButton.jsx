import { useTranslation } from 'react-i18next'
import { FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useCart } from '@/providers/CartProvider'

export const CartButton = () => {
  const { t } = useTranslation()
  const { cart } = useCart();

  return (
    <Link to="cart">
      <div
        className="min-w-16 px-3 flex flex-col justify-center items-center cursor-pointer rounded-md p-2 group-hover:bg-gray-200 duration-200 hover:shadow-lg group"
      >
        <FiShoppingCart className="size-6" />
        <p className="text-xs">{t('cart')}</p>
        {cart.length > 0 && (
          <div className='absolute top-1 right-1 text-base font-semibold bg-blue-600 text-white size-6 rounded-full flex justify-center items-center'>
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </div>
        )}
      </div>
    </Link>
  )
}
