import { Link } from "react-router-dom"
import boltLogo from "@/images/bolt_logo.png"
import { LanguageButtons } from "../navbar/LanguageButtons"
import { useCart } from "@/providers/CartProvider"
import { useTranslation } from "react-i18next"
import { OrderStepIndicator } from "./OrderStepIndicator"

export const TopNavbarOrder = () => {
  const { t } = useTranslation()
  const { cart, orderingState } = useCart();

  return (
    <div className="px-1 lg:px-6 py-1 flex gap-x-20 items-center justify-between lg:justify-center max-w-7xl mx-auto flex-wrap">
      <Link to="/">
        <div className="flex items-center">
          <img src={boltLogo} alt="Bolt Logo" width={50} />
          <p className="hidden lg:block leading-4 text-xl">ELECTRO<br />store</p>
        </div>
      </Link>
      <div className="flex flex-grow gap-4 items-center">
        {orderingState === 'inProgress' && (
          <>
            <OrderStepIndicator index={1} name="Koszyk" state="done" />
            <div className="h-[3px] bg-gray-400 flex-grow"></div>
            <OrderStepIndicator index={2} name="Dostawa i płatność" state="inProgress" />
            <div className="h-[3px] bg-gray-400 flex-grow"></div>
            <OrderStepIndicator index={3} name="Podsumowanie" state="future" />
          </>
        )}
        {orderingState === 'summary' && (
          <>
            <OrderStepIndicator index={1} name="Koszyk" state="done" />
            <div className="h-[3px] bg-gray-400 flex-grow"></div>
            <OrderStepIndicator index={2} name="Dostawa i płatność" state="done" />
            <div className="h-[3px] bg-gray-400 flex-grow"></div>
            <OrderStepIndicator index={3} name="Podsumowanie" state="inProgress" />
          </>
        )}
      </div>
      <LanguageButtons />
    </div>
  )
}
