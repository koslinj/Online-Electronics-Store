import { useCart } from "@/providers/CartProvider"

export const Cart = () => {
  const { cart, addOne, removeOne, clearCart } = useCart();

  return (
    <div className="mt-8">
      <div className="max-w-lg">
        <p className="text-3xl font-semibold">Cart</p>
        {cart.map(item => (
          <div key={item.product.id} className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                className="w-20"
                src={item.product.imageUrl}
                alt={item.product.name}
              />
              <p>{item.product.name}</p>
            </div>
            <div className="flex gap-2">
              <p>{item.product.price * item.quantity}</p>
              <button onClick={() => removeOne(item.product)}>
                -
              </button>
              <p>{item.quantity}</p>
              <button onClick={() => addOne(item.product)}>
                +
              </button>
            </div>
          </div>
        ))}
        <button onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  )
}
