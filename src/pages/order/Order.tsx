import { DeliveryMethod } from '@/components/navbar/order/DeliveryMethod'
import React from 'react'

export const Order = () => {
  return (
    <div>
      <h1 className="text-4xl font-semibold mt-10 mb-8">Dostawa i płatność</h1>
      <div className='flex'>
        <div>
          <DeliveryMethod />
        </div>
        <div>
          Przejdź do podsumowania
        </div>
      </div>
    </div>
  )
}
