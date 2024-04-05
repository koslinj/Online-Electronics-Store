import { Delivery } from '@/components/order/summary/Delivery';
import { FinalConfirm } from '@/components/order/summary/FinalConfirm';
import { FinalProducts } from '@/components/order/summary/FinalProducts';
import { Payment } from '@/components/order/summary/Payment';
import { PersonalData } from '@/components/order/summary/PersonalData';
import { useCart } from '@/providers/CartProvider';
import { useEffect, useState } from 'react'

export const Summary = () => {
  const { cart, setOrderingState } = useCart()
  const [method, setMethod] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);
  const [payment, setPayment] = useState<any>(null);

  const getFromLocalStorage = () => {
    let storedValue = localStorage.getItem('deliveryMethod');
    if (storedValue !== null) {
      setMethod(JSON.parse(storedValue));
    }
    storedValue = localStorage.getItem('deliveryAddress');
    if (storedValue !== null) {
      setAddress(JSON.parse(storedValue));
    }
    storedValue = localStorage.getItem('payment');
    if (storedValue !== null) {
      setPayment(JSON.parse(storedValue));
    }
  }

  useEffect(() => {
    setOrderingState('summary')

    getFromLocalStorage()
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-semibold mt-10 mb-8">Podsumowanie</h1>
      <div className='flex gap-10 flex-wrap items-start'>
        <div className='space-y-6 flex-grow'>
          {(method && address && payment) && (
            <>
              <Delivery method={method} />
              <PersonalData data={address} />
              <Payment payment={payment} />
              <FinalProducts />
            </>
          )}
        </div>
        <FinalConfirm method={method} payment={payment} />
      </div>
    </div>
  )
}
