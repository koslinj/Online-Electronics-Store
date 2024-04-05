import { DeliveryAddress } from '@/components/order/DeliveryAddress'
import { DeliveryMethod } from '@/components/order/DeliveryMethod'
import { GoToSummary } from '@/components/order/GoToSummary';
import { Payment } from '@/components/order/Payment';
import { useAuth } from '@/providers/AuthProvider';
import { useCart } from '@/providers/CartProvider';
import { User } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react'

export const Order = () => {
  const { cart, setOrderingState } = useCart()
  const [user, setUser] = useState<User>();
  const { setToken } = useAuth()
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
    setOrderingState('inProgress')

    getFromLocalStorage()
  }, []);

  const onUpdate = () => {
    getFromLocalStorage()
  }

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

  if (user) {
    if (user.username) {
      return (
        <div>
          <h1 className="text-4xl font-semibold mt-10 mb-8">Dostawa i płatność</h1>
          <div className='flex gap-10 flex-wrap items-start'>
            <div className='space-y-6 flex-grow'>
              <DeliveryMethod onUpdate={onUpdate} />
              <DeliveryAddress onUpdate={onUpdate} user={user} />
              <Payment onUpdate={onUpdate} />
            </div>
            <GoToSummary method={method} payment={payment} />
          </div>
        </div>
      )
    }
  }

  return <p>Loading...</p>
}
