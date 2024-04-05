import React from 'react'

interface Props {
  payment: {
    desc: string
    icon: string
    price: number
    title: string
  }
}

export const Payment = ({ payment }: Props) => {
  return (
    <div className='bg-white p-4 rounded-xl'>
      <p className='text-2xl font-bold mb-3'>Płatność</p>
      <div className="flex items-center gap-4">
        <p className="text-xl font-semibold">{payment.title}</p>
        <img className="w-14" src={payment.icon} alt="" />
      </div>
      <p className="text-xl">{payment.desc}</p>
    </div>
  )
}
