import { Address } from '@/types'
import { Radio } from 'antd'

interface Props {
  state: number
  value: number
  content?: {
    title: string
    desc: string
  }
  icon: string
  address?: Address
}

export const MyRadio = ({ state, value, content, icon, address }: Props) => {
  return (
    <Radio
      className={`hover:bg-gray-200 flex duration-300 p-4 pr-20 relative rounded-lg border-2 ${state === value ? 'border-black' : 'border-white'}`}
      value={value}
    >
      {content && (
        <>
          <div>
            <p className='text-lg font-semibold'>{content.title}</p>
            <p className='text-base text-gray-500'>{content.desc}</p>
          </div>
          <div className='absolute right-2 top-1/2 -translate-y-1/2 text-center'>
            <img className='w-12' src={icon} alt="" />
            <p className='text-base font-semibold'>0 zł</p>
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
