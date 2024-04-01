import { CartItems } from "@/components/cart/CartItems";
import { useCart } from "@/providers/CartProvider"
import { useTranslation } from "react-i18next";
import { BsTrash } from 'react-icons/bs'

export const Cart = () => {
  const { t } = useTranslation()
  const { cart, addOne, removeOne, clearCart } = useCart();

  return (
    <div className="max-w-4xl">
      <div className="mb-2 mt-6 flex justify-between">
        <h1 className="text-4xl font-semibold">{t('cart')}</h1>
        {cart.length > 0 && (
          <button onClick={clearCart} className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-md duration-150">
            <BsTrash className="size-6" />
            <p>{t('clearCart')}</p>
          </button>
        )}
      </div>
      <CartItems />
    </div>
  )
}
