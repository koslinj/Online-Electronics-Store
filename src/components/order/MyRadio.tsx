import { Address } from '@/types'
import { Radio } from 'antd'

interface Props {
  state: number
  value: number
  content?: {
    title: string
    desc: string
    icon: string
    price: number
  }
  address?: Address
}

export const MyRadio = ({ state, value, content, address }: Props) => {
  return (
    <Radio
      className={`hover:bg-gray-200 flex duration-300 p-4 pr-20 relative rounded-lg border-2 ${state === value ? 'border-black' : 'border-white'}`}
      value={value}
    >
      {content && (
        <>
          <div className='py-2'>
            <p className='text-lg font-semibold'>{content.title}</p>
            <p className='text-base text-gray-500'>{content.desc}</p>
          </div>
          <div className='absolute right-4 top-1/2 -translate-y-1/2 text-center'>
            <img className='w-11' src={content.icon} alt="" />
            <p className='text-base font-semibold'>{content.price} zł</p>
          </div>
        </>
      )}
      {address && (
        <div>
          <p className='text-lg font-bold'>{address.fullName}</p>
          <p className='text-lg'>{address.street}</p>
          <p className='text-lg'>{address.zipCode} {address.city}</p>
          <p className='text-lg'>{address.phone}</p>
          <p className='text-lg'>{address.email}</p>
        </div>
      )}
    </Radio>
  )
}
