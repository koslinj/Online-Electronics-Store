import { fetchProductByName } from "@/api/products";
import { ImageModal } from "@/components/productPage/ImageModal";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ProductPage = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState<Product>()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const _prod = await fetchProductByName(productName!);
      setProduct(_prod);
    }

    fetchData()

  }, [productName])

  return (
    <div className="flex mt-10 max-w-6xl mx-auto py-6">
      <div className="w-2/5 pr-4">
        <img className="cursor-pointer duration-200 rounded-lg border-2" src={product?.imageUrl} alt={product?.name} onClick={() => setShowModal(true)} />
      </div>
      <div className="w-3/5">
        <h3 className="text-2xl font-semibold">{product?.name}</h3>
        <p>{product?.description}</p>
      </div>
      <ImageModal showModal={showModal} setShowModal={setShowModal} product={product} />
    </div>
  )
}
