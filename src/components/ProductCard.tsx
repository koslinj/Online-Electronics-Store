import React from "react"
import { Product } from "../types"

interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className='bg-slate-400 w-48 rounded-md flex flex-col items-center p-2'>
      <p>{product.name}</p>
      <img className='w-full' src={product.imageUrl} alt={product.name} />
    </div>
  )
}
