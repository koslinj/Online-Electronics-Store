import React from 'react'
import { FaCheck } from 'react-icons/fa'

interface Props {
  name: string
  index: number
  state: "done" | "inProgress" | "future"
}

export const OrderStepIndicator = ({ name, index, state }: Props) => {
  return (
    <div className="relative">
      {state === "done" && (
        <div className="rounded-full size-7 font-semibold bg-gray-600 text-white flex items-center justify-center">
          <FaCheck />
        </div>
      )}
      {state === "inProgress" && (
        <div className="rounded-full size-7 font-semibold bg-black text-white flex items-center justify-center">{index}</div>
      )}
      {state === "future" && (
        <div className="rounded-full size-7 font-semibold border-gray-600 border-2 text-gray-600 flex items-center justify-center">{index}</div>
      )}
      <p className="absolute left-1/2 -translate-x-1/2 text-nowrap">{name}</p>
    </div>
  )
}
