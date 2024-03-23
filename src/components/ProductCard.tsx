import { useMemo } from "react";
import { Product } from "../types"
import { MdOutlineAddShoppingCart } from "react-icons/md";

interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
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

  return (
    <div className="group relative w-52 rounded-md flex flex-col items-center p-2 pb-16 h-96 before:absolute before:h-[1px] before:w-48 before:bottom-0 before:bg-gray-300 cursor-pointer hover:shadow-equal duration-200">
      <img className='w-full' src={product.imageUrl} alt={product.name} />
      <p className="w-full text-sm">{product.name}</p>
      <div className="w-full mt-3">
        {sortedFilters.map((filter, index) => (
          <div className="flex justify-start gap-1" key={index}>
            <p className="text-sm font-semibold">{filter.name}:</p>
            <p className="text-sm">{filter.value}</p>
          </div>
        ))}
      </div>
      <p className="absolute bottom-2 left-2">{formattedPrice}</p>
      <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 duration-200 text-green-600 rounded-lg border-2 border-green-600 p-1 hover:bg-green-600 hover:text-white">
        <MdOutlineAddShoppingCart className="w-5 h-5" />
      </div>
    </div>
  )
}
