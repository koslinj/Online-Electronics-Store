import { CartItem, useCart } from '@/providers/CartProvider'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

export const OneCartItem = ({ item }: { item: CartItem }) => {
  const { addOne, removeOne } = useCart();

  const formattedPrice = item.product.price.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return (
    <div key={item.product.id} className="p-3 flex justify-between items-center flex-wrap gap-y-2">
      <div className="flex flex-wrap items-center">
        <img
          className="w-28"
          src={item.product.imageUrl}
          alt={item.product.name}
        />
        <p>{item.product.name}</p>
      </div>
      <div className="flex gap-1 items-center">
        <p className='text-lg mr-5'>{formattedPrice}</p>
        <button
          className='hover:bg-gray-200 rounded-md duration-150 flex justify-center items-center p-2'
          onClick={() => removeOne(item.product)}
        >
          <FaMinus className='size-5' />
        </button>
        <p className='text-lg w-7 font-semibold rounded-md text-center'>{item.quantity}</p>
        <button
          className='hover:bg-gray-200 rounded-md duration-150 flex justify-center items-center p-2'
          onClick={() => addOne(item.product)}
        >
          <FaPlus className='size-5' />
        </button>
      </div>
    </div>
  )
}
