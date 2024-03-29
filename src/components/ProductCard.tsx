import React, { MouseEventHandler, useMemo } from "react";
import { Product } from "../types"
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useCart } from "@/providers/CartProvider";

interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  const { addOne } = useCart();

  const formattedPrice = product.price.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  const sortedFilters = useMemo(() => {
    const filters = product.filterNames.map((name, index) => ({
      name,
      value: product.filterValues[index],
    }));

    return filters.sort((a, b) => a.name.localeCompare(b.name));
  }, [product.filterNames, product.filterValues]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    addOne(product)
  }

  return (
    <div className="group relative w-76 rounded-md flex flex-col items-center p-2 pb-16 h-110 before:absolute before:h-[1px] before:w-48 before:bottom-0 before:bg-gray-300 cursor-pointer hover:shadow-equal duration-200">
      <img className='max-w-56' src={product.imageUrl} alt={product.name} />
      <p className="w-full font-semibold">{product.name}</p>
      <div className="w-full mt-4">
        {sortedFilters.slice(0, 4).map((filter, index) => (
          <div className="flex justify-start gap-1" key={index}>
            <p className="text-sm">{filter.name}:</p>
            <p className="text-sm font-bold">{filter.value}</p>
          </div>
        ))}
      </div>
      <p className="absolute bottom-2 left-2">{formattedPrice}</p>
      <button
        onClick={handleAddToCart}
        className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 duration-200 text-green-600 rounded-lg border-2 border-green-600 p-1 hover:bg-green-600 hover:text-white"
      >
        <MdOutlineAddShoppingCart className="size-6" />
      </button>
    </div>
  )
}
