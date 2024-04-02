import { fetchOpinionsByProductId } from "@/api/opinions";
import { Opinion, Product } from "@/types";
import { useEffect, useState } from "react";
import { Stars } from "./Stars";
import { format } from "date-fns";

interface Props {
  product: Product
  opinions: Opinion[]
}

export const Opinions = ({ product, opinions }: Props) => {
  const formatStr = 'dd/MM/yyyy'

  return (
    <div className="mt-8">
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