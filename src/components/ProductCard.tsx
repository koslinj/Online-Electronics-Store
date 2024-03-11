import { Product } from "../types"
import { MdOutlineAddShoppingCart } from "react-icons/md";

interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="group relative w-56 rounded-md flex flex-col items-center p-2 pb-16 h-80 before:absolute before:h-[1px] before:w-48 before:bottom-0 before:bg-gray-300 cursor-pointer hover:shadow-card duration-200">
      <img className='w-full' src={product.imageUrl} alt={product.name} />
      <p className="w-full">{product.name}</p>
      <p className="absolute bottom-2 left-2">2 649,00 zł</p>
      <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 duration-200 text-green-600 rounded-lg border-2 border-green-600 p-1 hover:bg-green-600 hover:text-white">
        <MdOutlineAddShoppingCart className="w-5 h-5" />
      </div>
    </div>
  )
}
