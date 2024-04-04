import { DeliveryAddress } from '@/components/navbar/order/DeliveryAddress'
import { DeliveryMethod } from '@/components/navbar/order/DeliveryMethod'
import { Payment } from '@/components/navbar/order/Payment';
import { useAuth } from '@/providers/AuthProvider';
import { useCart } from '@/providers/CartProvider';
import { User } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Order = () => {
  const { t } = useTranslation()
  const { cart } = useCart()
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
              <p>Przejdź do podsumowania</p>
              {cart.map((item) => (
                <div key={item.product.id} className="rounded-lg p-2 flex gap-x-2 items-center w-72">
                  <img className="w-20" src={item.product.imageUrl} alt={item.product.name} />
                  <div>
                    <Link to={`/products/${item.product.categoryUrl}/${encodeURIComponent(item.product.name)}`}>
                      <p className="font-semibold hover:underline">{item.product.name}</p>
                    </Link>
                    <p className="mt-2 text-blue-900">{item.quantity} {t('pieces')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  }

  return <p>Loading...</p>
}
