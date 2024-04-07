import { useCart } from '@/providers/CartProvider';
import { Product } from '@/types';
import React, { useState } from 'react'
import { FaCheckCircle, FaMinus, FaPlus } from "react-icons/fa";
import { message } from "antd";
import { MdError, MdOutlineAddShoppingCart } from "react-icons/md";
import { useTranslation } from 'react-i18next';

interface Props {
  product: Product | undefined
}

export const CartPart = ({ product }: Props) => {
  const { t } = useTranslation()
  const { add } = useCart();
  const [count, setCount] = useState(1)

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    add(product!, count)
    message.success({
      content:
        <div className='flex items-center gap-3'>
          <FaCheckCircle className='size-10 text-green-500' />
          <p className='text-xl'>Dodano do koszyka!</p>
        </div>,
      icon: <></>
    });
  }

  const handleMinus = () => {
    if (count > 1) {
      setCount(prev => prev - 1)
    } else {
      message.error({
        content:
          <div className='flex items-center gap-3'>
            <MdError className='size-10 text-red-500' />
            <p className='text-xl'>{t('badProdCount')}</p>
          </div>,
        icon: <></>
      });
    }
  }

  const handlePlus = () => {
    setCount(prev => prev + 1)
  }

  return (
    <div className="flex gap-5">
      <div className="flex items-center gap-1 px-1 rounded-lg border-2 border-gray-300">
        <button
          className='hover:bg-gray-200 rounded-md duration-150 flex justify-center items-center p-2'
          onClick={handleMinus}
        >
          <FaMinus className='size-5' />
        </button>
        <p className='text-lg w-7 font-semibold rounded-md text-center'>{count}</p>
        <button
          className='hover:bg-gray-200 rounded-md duration-150 flex justify-center items-center p-2'
          onClick={handlePlus}
        >
          <FaPlus className='size-5' />
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        className="p-3 flex items-center justify-center gap-3 duration-200 rounded-lg bg-green-600 hover:bg-green-800 text-white"
      >
        <MdOutlineAddShoppingCart className="size-7" />
        <p>{t('addToCart')}</p>
      </button>
    </div>
  )
}
