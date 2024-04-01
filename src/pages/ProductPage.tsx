import { fetchProductByName } from "@/api/products";
import { ImageModal } from "@/components/productPage/ImageModal";
import { PriceAndCart } from "@/components/productPage/PriceAndCart";
import { ProductFilters } from "@/components/productPage/ProductFilters";
import { Product } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export const ProductPage = () => {
  const { t } = useTranslation()
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
    <div>
      <div className="flex mt-10 max-w-6xl mx-auto py-6">
        <div className="w-2/5 pr-4">
          <img className="cursor-pointer duration-200 rounded-lg border-2" src={product?.imageUrl} alt={product?.name} onClick={() => setShowModal(true)} />
        </div>
        <div className="w-3/5">
          <h3 className="text-2xl font-semibold mb-1">{product?.name}</h3>
          <p className="font-semibold">
            <span className="text-gray-600 font-normal">{t('from')}</span>
            {product?.filterValues[product.filterNames.indexOf("Producent")]}
          </p>
          <div className="flex gap-x-10 flex-wrap items-start">
            <ProductFilters product={product} />
            <PriceAndCart product={product} />
          </div>
        </div>
      </div>
      <p>{product?.description}</p>
      <ImageModal showModal={showModal} setShowModal={setShowModal} product={product} />
    </div>
  )
}
