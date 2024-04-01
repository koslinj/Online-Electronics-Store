import { fetchOpinionsByProductId } from "@/api/opinions";
import { Opinion, Product } from "@/types";
import { useEffect, useState } from "react";

interface Props {
  product: Product | undefined
}

export const Opinions = ({ product }: Props) => {
  const [opinions, setOpinions] = useState<Opinion[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (product?.id) {
        const _ops = await fetchOpinionsByProductId(product?.id)
        setOpinions(_ops!)
        console.log(_ops)
      }
    }

    fetchData()

  }, [product?.id])

  return (
    <div className="mt-8">
      {opinions?.map(opinion => (
        <div key={opinion.id}>
          <p>{opinion.stars}</p>
          <p>{opinion.content}</p>
          <p>{opinion.createdAt.toUTCString()}</p>
        </div>
      ))}
    </div>
  )
}