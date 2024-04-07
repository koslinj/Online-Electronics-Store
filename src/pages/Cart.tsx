import { CartHeader } from "@/components/cart/CartHeader";
import { CartItems } from "@/components/cart/CartItems";
import { CartSummary } from "@/components/cart/CartSummary";
import { useAuth } from "@/providers/AuthProvider";
import { User } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const Cart = () => {
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
          <CartHeader />
          <div className="flex gap-5 items-start flex-wrap">
            <div className="max-w-4xl flex-grow">
              <CartItems />
            </div>
            <CartSummary user={user} />
          </div>
        </div>
      )
    }
  }

  return (
    <div>
      <CartHeader />
      <div className="flex gap-5 items-start flex-wrap">
        <div className="max-w-4xl flex-grow">
          <CartItems />
        </div>
        <div className='bg-red-100/65 rounded-xl px-4 py-7 border-2 border-gray-400 w-[340px]'>
          <p className="text-3xl font-semibold text-center">Musisz się zalogować aby móc złożyć zamówienie!</p>
        </div>
      </div>
    </div>
  )
}
