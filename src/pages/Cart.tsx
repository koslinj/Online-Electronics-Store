import { useCart } from "@/providers/CartProvider"

export const Cart = () => {
  const { cart, addItemToCart, removeItemFromCart, clearCart } = useCart();

  return (
    <div>
      <p>Cart</p>
      {cart.items.map(item => (
        <p>{item.product.name}</p>
      ))}
    </div>
  )
}
