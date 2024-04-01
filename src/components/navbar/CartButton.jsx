import { useTranslation } from 'react-i18next'
import { FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export const CartButton = () => {
  const { t } = useTranslation()
  return (
    <Link to="cart">
      <div
        className="px-3 flex flex-col justify-center items-center cursor-pointer rounded-md p-2 hover:bg-gray-200 duration-200 hover:shadow-lg group"
      >
        <FiShoppingCart className="size-6" />
        <p className="text-xs">{t('cart')}</p>
      </div>
    </Link>
  )
}
