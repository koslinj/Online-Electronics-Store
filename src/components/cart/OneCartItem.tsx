import { CartItem, useCart } from '@/providers/CartProvider'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { BsTrash } from 'react-icons/bs'
import { Link } from 'react-router-dom';

export const OneCartItem = ({ item }: { item: CartItem }) => {
  const { addOne, removeOne, removeAll } = useCart();

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
        <Link to={`/products/${item.product.categoryUrl}/${encodeURIComponent(item.product.name)}`}>
          <p className='text-lg hover:underline font-semibold'>{item.product.name}</p>
        </Link>
      </div>
      <div className="flex flex-wrap gap-5 items-center">
        <p className='text-lg'>{formattedPrice}</p>
        <div className='flex gap-1 items-center'>
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
        <button onClick={() => removeAll(item.product)} className="hover:bg-gray-200 p-2 rounded-md duration-150">
          <BsTrash className="size-6" />
        </button>
      </div>
    </div>
  )
}
