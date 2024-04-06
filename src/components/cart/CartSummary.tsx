import { fetchAddressesByUsername } from "@/api/addresses";
import { useCart } from "@/providers/CartProvider";
import { Address, User } from "@/types";
import { message } from "antd";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";

interface Props {
  user: User
}

export const CartSummary = ({ user }: Props) => {
  const { cart } = useCart();
  const [orderingData, setOrderingData] = useState<Address[]>()

  const fetchData = async () => {
    const _ord = await fetchAddressesByUsername(user.username)
    setOrderingData(_ord!)
  }

  const showMessage = () => {
    message.error({
      content:
        <div className='flex items-center gap-3'>
          <MdError className='size-10 text-red-500' />
          <p className='text-xl max-w-96'>Musisz dodać adres w panelu użytkownika aby móc składać zamówienie!</p>
        </div>,
      icon: <></>,
      duration: 5
    });
  }

  useEffect(() => {
    fetchData()
  }, [user.username])

  const formattedPrice = cart.reduce((total, item) => total + item.quantity * item.product.price, 0).toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return (
    <>
      {cart.length > 0 && (
        <div className='bg-gray-200/65 rounded-xl px-4 py-7 border-2 border-gray-400 min-w-[340px]'>
          <div className="text-xl font-semibold flex justify-between">
            <p>Łączna kwota</p>
            <p>{formattedPrice}</p>
          </div>
          {orderingData && (
            <>
              {orderingData.length > 0 && (
                <Link to='/order'>
                  <div
                    className="mt-5 flex gap-2 items-center justify-center text-white bg-green-600 hover:bg-green-700 active:bg-green-900 p-3 w-full rounded-lg duration-200"
                  >
                    <p className="text-lg font-semibold">Przejdź do dostawy</p>
                    <FaChevronRight className="size-5 translate-y-0.5" />
                  </div>
                </Link>
              )}
              {orderingData.length <= 0 && (
                <div
                  onClick={() => showMessage()}
                  className="cursor-pointer mt-5 flex gap-2 items-center justify-center text-white bg-green-600 hover:bg-green-700 active:bg-green-900 p-3 w-full rounded-lg duration-200"
                >
                  <p className="text-lg font-semibold">Przejdź do dostawy</p>
                  <FaChevronRight className="size-5 translate-y-0.5" />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  )
}
