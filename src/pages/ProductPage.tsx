import { fetchProductByName } from "@/api/products";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ProductPage = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    const fetchData = async () => {
      const _prod = await fetchProductByName(productName!);
      setProduct(_prod);
    }

    fetchData()

  }, [productName])


  return (
    <div className="flex mt-10">
      <div>
        <img src={product?.imageUrl} alt={product?.name} />
      </div>
      <div>
        <p>{product?.name}</p>
        <p>{product?.description}</p>
      </div>
    </div>
  )
}
