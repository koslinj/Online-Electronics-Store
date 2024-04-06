import { useState } from 'react';
import { t } from 'i18next';
import { User } from '@/types';
import { FormForOrderingData } from './FormForOrderingData';

interface Props {
  user: User
  onUpdate: () => void
}

export const AddAddress = ({ user, onUpdate }: Props) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  return (
    <>
      <button
        className='rounded-xl bg-black text-white hover:bg-gray-700 duration-150 p-3 px-5'
        onClick={showModal}
      >
        {t('addAddress')}
      </button>
      <FormForOrderingData user={user} open={open} setOpen={setOpen} onUpdate={onUpdate} />
    </>
  );
};
