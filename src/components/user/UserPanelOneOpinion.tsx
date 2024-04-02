import { Opinion, Product } from "@/types"
import { format } from "date-fns"
import { Stars } from "../productPage/Stars";
import { useEffect, useState } from "react";
import { fetchProductById } from "@/api/products";
import { Link } from "react-router-dom";

interface Props {
  opinion: Opinion
}

export const UserPanelOneOpinion = ({ opinion }: Props) => {
  const formatStr = 'dd/MM/yyyy'
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    const fetchData = async () => {
      const _prod = await fetchProductById(opinion.productId);
      setProduct(_prod);
    }

    fetchData()

  }, [opinion])

  return (
    <div className="flex items-center gap-x-2 py-3">
      {product && (
        <>
          <div>
            <img className="w-32" src={product.imageUrl} alt={product.name} />
          </div>
          <div key={opinion.id} className="space-y-1">
            <Link to={`/products/${product.categoryUrl}/${encodeURIComponent(product.name)}`}>
              <p className="font-semibold italic hover:underline">{product.name}</p>
            </Link>
            <div className="flex gap-x-4">
              <Stars n={opinion.stars} />
              <p>{format(opinion.createdAt, formatStr)}</p>
            </div>
            <p className="text-lg">{opinion.content}</p>
          </div>
        </>
      )}
    </div>
  )
}
