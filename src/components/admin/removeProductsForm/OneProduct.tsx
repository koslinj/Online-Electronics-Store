import { Product } from '@/types'
import { message } from 'antd';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { BsTrash } from 'react-icons/bs'
import { FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Props {
  product: Product
  setProducts: Dispatch<SetStateAction<Product[]>>
}

export const OneProduct = ({ product, setProducts }: Props) => {

  const formattedPrice = product.price.toLocaleString('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      setProducts(prev => prev.filter(item => item.id !== id))
      message.info({
        content:
          <div className='flex items-center gap-3'>
            <FaInfoCircle className='size-10 text-blue-500' />
            <p className='text-xl'>Produkt został usunięty!</p>
          </div>,
        icon: <></>
      });
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div className="flex justify-between items-center border-b-2 border-b-gray-400 mb-3 ms:mb-10 min-w-72">
      <div className="flex gap-4 items-center flex-wrap">
        <img className="size-20 sm:size-36 object-contain" src={product.imageUrl} alt={product.name} />
        <div className='space-y-1'>
          <Link to={`/products/${product.categoryUrl}/${encodeURIComponent(product.name)}`}>
            <p className='font-bold break-words hover:underline'>{product.name}</p>
          </Link>
          <p>{formattedPrice}</p>
          <p>{product.categoryName}</p>
        </div>
      </div>
      <button
        onClick={() => handleDelete(product.id)}
        type="submit"
        className="p-2 mr-4 bg-red-600 hover:bg-red-700 hover:scale-110 duration-200 border-2 border-black rounded-xl"
      >
        <BsTrash className="size-6 text-white" />
      </button>
    </div>
  )
}
