import { DeliveryAddress } from '@/components/order/DeliveryAddress'
import { DeliveryMethod } from '@/components/order/DeliveryMethod'
import { GoToSummary } from '@/components/order/GoToSummary';
import { Payment } from '@/components/order/Payment';
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
          <div className='flex gap-10 flex-wrap items-start'>
            <div className='space-y-6 flex-grow'>
              <DeliveryMethod />
              <DeliveryAddress user={user} />
              <Payment />
            </div>
            <GoToSummary />
          </div>
        </div>
      )
    }
  }

  return <p>Loading...</p>
}
