import { useMemo } from "react";
import { Product } from "@/types";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useCart } from "@/providers/CartProvider";
import { useTranslation } from "react-i18next";

interface Props {
  product: Product | undefined
}

export const PriceAndCart = ({ product }: Props) => {
  const { t } = useTranslation()
  const { add } = useCart();

  const formattedPrice = product?.price.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    add(product!, 3)
  }

  return (
    <div className="p-1 md:p-5 border-2 border-gray-400 rounded-xl flex flex-col text-right">
      <p className="text-2xl">{formattedPrice}</p>
      <p>{t('lowest')}</p>
      <p className="text-gray-700 line-through">{formattedPrice}</p>
      <button
        onClick={handleAddToCart}
        className="p-3 flex items-center justify-center gap-3 duration-200 rounded-lg bg-green-600 hover:bg-green-800 text-white"
      >
        <MdOutlineAddShoppingCart className="size-7" />
        <p>{t('addToCart')}</p>
      </button>
    </div>
  )
}