import { FiShoppingCart } from 'react-icons/fi'

export const CartButton = () => {
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer rounded-t-md p-2 group-hover:bg-green-200">
      <FiShoppingCart className="size-6" />
      <p className="text-xs">Koszyk</p>
    </div>
  )
}
