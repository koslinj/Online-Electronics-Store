import { Opinion, Product } from "@/types";
import { Stars } from "../Stars";
import { format } from "date-fns";
import { fetchOpinionsByProductId } from "@/api/opinions";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GeneralRating } from "./GeneralRating";
import { AddOpinion } from "./AddOpinion";

interface User {
  username: string
  role: string
  firstName: string
}

interface Props {
  product: Product
  user: User | null
}

export const Opinions = ({ product, user }: Props) => {
  const { t } = useTranslation()
  const formatStr = 'dd/MM/yyyy'
  const [opinions, setOpinions] = useState<Opinion[]>([])

  const fetchOpinions = async () => {
    if (product) {
      const _ops = await fetchOpinionsByProductId(product.id)
      setOpinions(_ops!)
    }
  }

  useEffect(() => {
    fetchOpinions()
  }, [product])

  const onOpinionAdded = () => {
    fetchOpinions();
  };

  return (
    <div className="mt-10 border-t-2 border-gray-400">
      <div className="mb-10">
        <h3 className="text-4xl mb-6">{t('opinions')}</h3>
        <div className="flex justify-center gap-10 flex-wrap">
          <GeneralRating opinions={opinions} />
          <AddOpinion product={product} user={user} onOpinionAdded={onOpinionAdded} />
        </div>
      </div>
      {opinions.map(opinion => (
        <div key={opinion.id} className="space-y-1">
          <p className="font-semibold italic">{opinion.user}</p>
          <div className="flex gap-x-4">
            <Stars n={opinion.stars} />
            <p>{format(opinion.createdAt, formatStr)}</p>
          </div>
          <p className="text-lg">{opinion.content}</p>
        </div>
      ))}
    </div>
  )
}
