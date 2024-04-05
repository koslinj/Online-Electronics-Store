import { useCart } from '@/providers/CartProvider'

export const FinalProducts = () => {
  const { cart } = useCart()

  return (
    <div className='bg-white p-4 rounded-xl'>
      <p className='text-2xl font-bold mb-3'>Produkty</p>
      {cart.map(item => (
        <div className='flex justify-between gap-4'>
          <div className="flex items-center gap-1">
            <img className="w-28" src={item.product.imageUrl} alt="" />
            <p className="text-xl font-semibold max-w-96">{item.product.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xl text-gray-500">{item.quantity} szt.</p>
            <p className="text-xl">{item.product.price.toLocaleString('pl-PL', {
              style: 'currency',
              currency: 'PLN',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              useGrouping: true,
            })}</p>
          </div>
        </div>
      ))}

    </div>
  )
}
