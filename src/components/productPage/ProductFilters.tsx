import { useMemo } from "react";
import { Product } from "@/types";

interface Props {
  product: Product | undefined
}

export const ProductFilters = ({ product }: Props) => {

  const sortedFilters = useMemo(() => {
    const filters = product?.filterNames.map((name, index) => ({
      name,
      value: product.filterValues[index],
    }));

    return filters?.sort((a, b) => a.name.localeCompare(b.name));
  }, [product?.filterNames, product?.filterValues]);

  return (
    <div className="my-6 py-3 border-y-2 border-gray-400 space-y-2">
      {sortedFilters?.slice(0, 4).map((filter, index) => (
        <div className="flex justify-start gap-2" key={index}>
          <p className="text-gray-600">{filter.name}:</p>
          <p className="font-bold">{filter.value}</p>
        </div>
      ))}
    </div>
  )
}