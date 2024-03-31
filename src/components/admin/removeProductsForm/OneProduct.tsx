import { Product } from '@/types'
import { BsTrash } from 'react-icons/bs'

export const OneProduct = ({ product }: { product: Product }) => {

  const formattedPrice = product.price.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return (
    <div className="flex justify-between items-center border-b-2 border-b-gray-400 mb-3 ms:mb-10 min-w-72">
      <div className="flex gap-4 items-center flex-wrap">
        <img className="size-20 sm:size-36 object-contain" src={product.imageUrl} alt={product.name} />
        <div className='space-y-1'>
          <p className='font-bold break-words'>{product.name}</p>
          <p>{formattedPrice}</p>
          <p>{product.categoryName}</p>
        </div>
      </div>
      <button type="submit" className="p-2 mr-4 bg-red-600 hover:bg-red-700 hover:scale-110 duration-200 border-2 border-black rounded-xl">
        <BsTrash className="size-6 text-white" />
      </button>
    </div>
  )
}
