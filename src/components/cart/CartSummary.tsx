import { useCart } from "@/providers/CartProvider";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";


export const CartSummary = () => {
  const { cart } = useCart();

  const formattedPrice = cart.reduce((total, item) => total + item.quantity * item.product.price, 0).toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return (
    <div className='bg-gray-200/65 rounded-xl px-4 py-7 border-2 border-gray-400 min-w-[340px]'>
      <div className="text-xl font-semibold flex justify-between">
        <p>Łączna kwota</p>
        <p>{formattedPrice}</p>
      </div>
      <Link to='/order'>
        <div
          className="mt-5 flex gap-2 items-center justify-center text-white bg-green-600 hover:bg-green-700 active:bg-green-900 p-3 w-full rounded-lg duration-200"
        >
          <p className="text-lg font-semibold">Przejdź do dostawy</p>
          <FaChevronRight className="size-5 translate-y-0.5" />
        </div>
      </Link>
    </div>
  )
}
