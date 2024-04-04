import { useCart } from '@/providers/CartProvider'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const GoToSummary = () => {
  const { t } = useTranslation()
  const { cart } = useCart()


  const formattedSum = cart.reduce((total, item) => total + item.quantity * item.product.price, 0).toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return (
    <div className='bg-white p-4 rounded-xl'>
      <div className='divide-y-2 divide-gray-300 border-b-[3px] border-gray-400'>
        {cart.map((item) => (
          <div key={item.product.id} className="p-2 flex gap-x-2 items-center">
            <img className="w-32" src={item.product.imageUrl} alt={item.product.name} />
            <div className='w-full'>
              <Link to={`/products/${item.product.categoryUrl}/${encodeURIComponent(item.product.name)}`}>
                <p className="text-lg font-semibold hover:underline">{item.product.name}</p>
              </Link>
              <p className="text-lg mt-2 text-blue-900">{item.quantity} {t('pieces')}</p>
              <p className="text-right text-lg font-semibold italic">
                {item.product.price.toLocaleString('pl-PL', {
                  style: 'currency',
                  currency: 'PLN',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='text-lg py-4 space-y-1 border-b-[3px] border-gray-400 border-dotted'>
        <div className='flex justify-between items-center'>
          <p>Produkty i usługi</p>
          <p>{formattedSum}</p>
        </div>
        <div className='flex justify-between items-center'>
          <p>Dostawa i płatność</p>
          <p>{formattedSum}</p>
        </div>
      </div>
      <div className='py-5 flex justify-between items-center'>
        <p className='text-xl'>Do zapłaty</p>
        <p className='text-2xl font-bold'>{formattedSum}</p>
      </div>
      <Link to='summary'>
        <div
          className="flex gap-2 items-center justify-center text-white bg-green-600 hover:bg-green-700 active:bg-green-900 p-3 w-full rounded-lg duration-200"
        >
          <p className="text-lg font-semibold">Przejdź do podsumowania</p>
          <FaChevronRight className="size-5 translate-y-0.5" />
        </div>
      </Link>
    </div>
  )
}
