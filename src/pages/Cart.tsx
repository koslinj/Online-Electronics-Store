import { CartHeader } from "@/components/cart/CartHeader";
import { CartItems } from "@/components/cart/CartItems";
import { CartSummary } from "@/components/cart/CartSummary";

export const Cart = () => {


  return (
    <div>
      <CartHeader />
      <div className="flex gap-5 items-start">
        <div className="max-w-4xl flex-grow">
          <CartItems />
        </div>
        <CartSummary />
      </div>
    </div>

  )
}
