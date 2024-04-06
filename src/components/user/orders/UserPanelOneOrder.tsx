import { Order } from '@/types'
import React from 'react'
import { UserPanelOneOrderItem } from './UserPanelOneOrderItem'
import { format } from 'date-fns'

interface Props {
  order: Order
}

export const UserPanelOneOrder = ({ order }: Props) => {
  const formatStr = 'dd/MM/yyyy'

  const formattedSum = order.sum.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return (
    <div className='p-4 hover:shadow-equal duration-200 border-2 border-gray-300 rounded-xl'>
      <div >
        <p className='font-bold text-2xl'>{order.state}</p>
        <p className='font-semibold text-xl my-2'>{format(order.createdAt, formatStr)}</p>
      </div>
      {order.items.map(item => (
        <UserPanelOneOrderItem key={item.id} orderItem={item} />
      ))}
      <p className='font-semibold text-xl'>{formattedSum}</p>
    </div>
  )
}
