import { Delivery } from '@/components/order/summary/Delivery';
import { FinalConfirm } from '@/components/order/summary/FinalConfirm';
import { FinalProducts } from '@/components/order/summary/FinalProducts';
import { Payment } from '@/components/order/summary/Payment';
import { PersonalData } from '@/components/order/summary/PersonalData';
import { useAuth } from '@/providers/AuthProvider';
import { useCart } from '@/providers/CartProvider';
import { User } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react'

export const Summary = () => {
  const [user, setUser] = useState<User>();
  const { setToken } = useAuth()

  const { cart, setOrderingState } = useCart()
  const [method, setMethod] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);
  const [payment, setPayment] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user', {
          signal: abortController.signal,
        });
        const data = response.data;

        if (isMounted) setUser(data);
      } catch (error: any) {
        if (error.response?.status === 403) setToken();
        else console.log(error.message)
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [setToken]);

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

  if (user) {
    if (user.username) {
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
            <FinalConfirm user={user} method={method} payment={payment} />
          </div>
        </div>
      )
    }
  }

  return <p>Loading...</p>
}
