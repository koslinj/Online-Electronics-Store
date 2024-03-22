import { Product } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useFiltering(allProducts: Product[]) {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  useEffect(() => {
    const filterParams: Record<string, string[]> = {}
    searchParams.forEach((value, key) => {
      if (filterParams[key]) {
        filterParams[key].push(value);
      } else {
        filterParams[key] = [value];
      }
    });

    let filteredProducts = allProducts;

    // Loop through each filter parameter
    for (const filterName in filterParams) {
      if (filterParams.hasOwnProperty(filterName)) {
        const filterValues = filterParams[filterName]; // Get array of filter values

        // Filter products based on each filter parameter
        filteredProducts = filteredProducts.filter(product =>
          filterValues.some(value =>
            product.filterNames.includes(filterName) && product.filterValues[product.filterNames.indexOf(filterName)] === value
          )
        );
      }
    }

    setFilteredProducts(filteredProducts);
  }, [searchParams, allProducts]);

  return { filteredProducts };
}