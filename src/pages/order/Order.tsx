import { DeliveryAddress } from '@/components/navbar/order/DeliveryAddress'
import { DeliveryMethod } from '@/components/navbar/order/DeliveryMethod'
import { Payment } from '@/components/navbar/order/Payment';
import { useAuth } from '@/providers/AuthProvider';
import { User } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react'

export const Order = () => {
  const [user, setUser] = useState<User>();
  const { setToken } = useAuth()

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
          <div className='flex'>
            <div className='space-y-6'>
              <DeliveryMethod />
              <DeliveryAddress user={user} />
              <Payment />
            </div>
            <div>
              Przejdź do podsumowania
            </div>
          </div>
        </div>
      )
    }
  }

  return <p>Loading...</p>
}
