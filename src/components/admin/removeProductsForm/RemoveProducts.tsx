import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react";
import { Product } from "@/types";
import { fetchProducts } from "@/api/products";
import { OneProduct } from "./OneProduct";

export const RemoveProduct = () => {
  const { t } = useTranslation()
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _prod = await fetchProducts()
        setProducts(_prod)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 pr-0 border-2 border-gray-400 rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-4">{t('remove_product')}</h2>
      <div className="max-h-[600px] overflow-y-scroll" >
        {products.map((product) => (
          <OneProduct key={product.id} product={product} setProducts={setProducts} />
        ))}
      </div>
    </div>
  )
}
