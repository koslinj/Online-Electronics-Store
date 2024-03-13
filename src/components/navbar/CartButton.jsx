import { useTranslation } from 'react-i18next'
import { FiShoppingCart } from 'react-icons/fi'

export const CartButton = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer rounded-t-md p-2 group-hover:bg-green-200">
      <FiShoppingCart className="size-6" />
      <p className="text-xs">{t('cart')}</p>
    </div>
  )
}
