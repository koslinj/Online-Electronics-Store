import { Address, User } from '@/types'
import React from 'react'
import { UpdateAddress } from './UpdateAddress'
import { DeleteAddress } from './DeleteAddress'

interface Props {
  address: Address
  user: User
  onUpdate: () => void
}

export const UserPanelOneOrderingData = ({ address, user, onUpdate }: Props) => {
  return (
    <div className='rounded-lg border-2 border-gray-400 p-4 w-64'>
      <p className='text-lg font-bold'>{address.fullName}</p>
      <p className='text-lg'>{address.street}</p>
      <p className='text-lg'>{address.zipCode} {address.city}</p>
      <p className='text-lg'>{address.phone}</p>
      <p className='text-lg'>{address.email}</p>
      <div className='mt-4 text-blue-600 font-semibold flex gap-4'>
        <DeleteAddress address={address} onUpdate={onUpdate} />
        <UpdateAddress user={user} address={address} onUpdate={onUpdate} />
      </div>
    </div>
  )
}
