import { FormEvent, useState } from 'react';
import { ConfigProvider, Modal, Input, message } from 'antd';
import axios from 'axios'; // Import Axios library
import { FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import { t } from 'i18next';
import { Address, User } from '@/types';

interface Props {
  address: Address
  onUpdate: () => void
}

export const DeleteAddress = ({ address, onUpdate }: Props) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.delete(`http://localhost:8080/api/addresses/${address.id}`);
      console.log('Product deleted successfully:', response.data);
      setOpen(false)
      onUpdate()
      message.success({
        content:
          <div className='flex items-center gap-3'>
            <FaCheckCircle className='size-10 text-green-500' />
            <p className='text-xl'>Dane do zamówień zostały usunięte!</p>
          </div>,
        icon: <></>
      });
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      <button
        className='rounded-lg p-2 hover:bg-blue-100 duration-200'
        onClick={showModal}
      >
        {t('delete')}
      </button>
      <Modal
        centered
        title={<p className='text-xl mb-4 font-bold'>{t('sureData')}</p>}
        open={open}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <div className='flex justify-end gap-4'>
            <button
              onClick={handleCancel}
              className='rounded-lg text-lg hover:bg-gray-200 duration-150 px-5 p-3 mt-4'
            >
              {t('cancel')}
            </button>
            <button
              onClick={handleSubmit}
              className='rounded-lg bg-red-600 text-white text-lg hover:bg-red-700 duration-150 px-5 p-3 mt-4'
            >
              {t('delete')}
            </button>
          </div>
        )}
      >
        <p className='text-lg'>{t('sureDataDesc')}</p>
      </Modal>
    </>
  );
};
