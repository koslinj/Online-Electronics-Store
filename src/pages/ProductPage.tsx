import { fetchProductByName } from "@/api/products";
import { ImageModal } from "@/components/productPage/ImageModal";
import { Opinions } from "@/components/productPage/opinions/Opinions";
import { PriceAndCart } from "@/components/productPage/PriceAndCart";
import { ProductFilters } from "@/components/productPage/ProductFilters";
import { Opinion, Product } from "@/types";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

interface User {
  username: string
  role: string
  firstName: string
}

export const ProductPage = () => {
  const { t } = useTranslation()
  const { productName } = useParams();
  const [product, setProduct] = useState<Product>()
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const _prod = await fetchProductByName(productName!);
      setProduct(_prod);
    }
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user');
        setUser(response.data);
      } catch (error) {
        setUser(null)
      }
    };

    fetchUser();
    fetchData()

  }, [productName])

  return (
    <div>
      {product && (
        <>
          <div className="flex mt-10 mx-auto py-6 flex-wrap">
            <div className="pr-4 max-w-[500px]">
              <img className="cursor-pointer duration-200 rounded-lg border-2" src={product.imageUrl} alt={product.name} onClick={() => setShowModal(true)} />
            </div>
            <div className="">
              <h3 className="text-2xl font-semibold mb-1">{product.name}</h3>
              <p className="font-semibold">
                <span className="text-gray-600 font-normal">{t('from')}</span>
                {product.filterValues[product.filterNames.indexOf("Producent")]}
              </p>
              <div className="mt-8 flex gap-x-10 flex-wrap items-start">
                <ProductFilters product={product} />
                <PriceAndCart product={product} />
              </div>
            </div>
          </div>
          <p>{product.description}</p>
          <Opinions product={product} user={user} />
          <ImageModal showModal={showModal} setShowModal={setShowModal} product={product} />
        </>
      )}
    </div>
  )
}
