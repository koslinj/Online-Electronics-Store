import { Product, Sorting } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useFiltering(
  allProducts: Product[],
  setTotalElements: Dispatch<SetStateAction<number>>,
  setCurrentPage: Dispatch<SetStateAction<number>>,
  sorting: Sorting,
  refreshCurrentProducts: (products: Product[]) => void
) {
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

    if (sorting === 'Od A do Z') {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sorting === 'Od Z do A') {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name)).reverse();
    } else if (sorting === 'Od najtańszych') {
      filteredProducts.sort((a, b) => a.price - b.price)
    } else if (sorting === 'Od najdroższych') {
      filteredProducts.sort((a, b) => b.price - a.price)
    }

    setTotalElements(filteredProducts.length)
    setCurrentPage(1)
    setFilteredProducts(filteredProducts);
    refreshCurrentProducts(filteredProducts)
  }, [searchParams, allProducts, sorting]);

  return { filteredProducts };
}