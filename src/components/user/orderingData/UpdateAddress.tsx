import { useState } from 'react';
import { t } from 'i18next';
import { Address, User } from '@/types';
import { FormForOrderingData } from './FormForOrderingData';

interface Props {
  user: User
  address: Address
  onUpdate: () => void
}

export const UpdateAddress = ({ user, address, onUpdate }: Props) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  return (
    <>
      <button
        className='rounded-lg p-2 hover:bg-blue-100 duration-200'
        onClick={showModal}
      >
        {t('edit')}
      </button>
      <FormForOrderingData user={user} open={open} setOpen={setOpen} onUpdate={onUpdate} address={address} />
    </>
  );
};
