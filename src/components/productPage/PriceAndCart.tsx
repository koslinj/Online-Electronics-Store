import { Product } from "@/types";
import { useTranslation } from "react-i18next";
import { CartPart } from "./CartPart";

interface Props {
  product: Product | undefined
}

export const PriceAndCart = ({ product }: Props) => {
  const { t } = useTranslation()

  const formattedPrice = product?.price.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return (
    <div className="p-1 md:p-5 border-2 border-gray-400 rounded-xl flex gap-y-1 flex-col text-right">
      <p className="text-2xl">{formattedPrice}</p>
      <p>{t('lowest')}</p>
      <p className="text-gray-700 line-through mb-6">{formattedPrice}</p>
      <CartPart product={product} />
    </div>
  )
}