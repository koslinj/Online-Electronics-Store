import { Product } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useFiltering(allProducts: Product[]) {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  useEffect(() => {
    let minPrice = -1
    let maxPrice = -1
    const filterParams: Record<string, string[]> = {}
    searchParams.forEach((value, key) => {
      if (key === "Od" || key === "Do") { // Handle price filter differently
        const price = parseInt(value);
        if (!isNaN(price)) {
          if (key === "Od") {
            console.log(price)
            minPrice = price
          } else if (key === "Do") {
            maxPrice = price
          }
        }
      } else {
        if (filterParams[key]) {
          filterParams[key].push(value);
        } else {
          filterParams[key] = [value];
        }
      }
    });

    let filteredProducts = allProducts;

    // Apply price filter
    if (minPrice !== -1) {
      filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
    }
    if (maxPrice !== -1) {
      filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    }

    // Loop through each filter parameter (except price)
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