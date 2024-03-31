import { useTranslation } from "react-i18next"
import axios from "axios";
import { BsTrash } from "react-icons/bs";
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.delete('http://localhost:8080/api/products');
      console.log('Product deleted successfully:', response.data);
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div className="p-4 pr-0 border-2 border-gray-400 rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-4">{t('remove_product')}</h2>
      <form onSubmit={handleSubmit} className="max-h-[600px] overflow-y-scroll" >
        {products.map((product) => (
          <OneProduct key={product.id} product={product} />
        ))}
      </form>
    </div>
  )
}
