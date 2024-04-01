import { useCart } from "@/providers/CartProvider";
import { OneCartItem } from "./OneCartItem";

export const CartItems = () => {
  const { cart, addOne, removeOne } = useCart();

  return (
    <>
      {cart.length > 0 && (
        <div className="border-2 border-gray-400 rounded-xl divide-y-2 divide-gray-400">
          {cart.map(item => (
            <OneCartItem key={item.product.id} item={item} />
          ))}
        </div>
      )}
    </>
  )
}
