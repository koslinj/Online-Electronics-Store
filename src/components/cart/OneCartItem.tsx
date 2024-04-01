import { CartItem, useCart } from '@/providers/CartProvider'

export const OneCartItem = ({item}: {item: CartItem}) => {
  const { addOne, removeOne } = useCart();
  
  return (
    <div key={item.product.id} className="p-3 flex justify-between items-center">
      <div className="flex items-center">
        <img
          className="w-28"
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
  )
}
