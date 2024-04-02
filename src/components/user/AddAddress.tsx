import { FormEvent, useState } from 'react';
import { ConfigProvider, Modal, Input, message } from 'antd';
import axios from 'axios'; // Import Axios library
import { FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import { t } from 'i18next';
import { User } from '@/types';

interface Props {
  user: User
}

export const AddAddress = ({ user }: Props) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (user) {
      const formData = new FormData();
      // formData.append('stars', stars.toString());
      // formData.append('content', content);
      // formData.append('username', user.username);
      // formData.append('productId', product.id.toString());

      try {
        const response = await axios.post('http://localhost:8080/api/opinions', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Product uploaded successfully:', response.data);
        setOpen(false)
        message.success({
          content:
            <div className='flex items-center gap-3'>
              <FaCheckCircle className='size-10 text-green-500' />
              <p className='text-xl'>Opinia została dodana!</p>
            </div>,
          icon: <></>
        });
      } catch (error) {
        console.error('Error uploading product:', error);
      }
    } else {
      message.error({
        content:
          <div className='flex items-center gap-3'>
            <MdError className='size-10 text-red-500' />
            <p className='text-xl'>Musisz być zalogowany aby móc dodać opinię!</p>
          </div>,
        icon: <></>
      });
    }
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      <button
        className='rounded-xl bg-black text-white hover:bg-gray-700 duration-150 p-3 px-5'
        onClick={showModal}
      >
        {t('addAddress')}
      </button>
      <Modal
        title={<p className='text-lg font-bold'>{t('addAddress')}</p>}
        open={open}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <button
            onClick={handleSubmit}
            className='rounded-lg bg-black text-white hover:bg-gray-700 duration-150 p-2'
          >
            {t('addAddress')}
          </button>
        )}
      >
        <form onSubmit={handleSubmit}>

        </form>
      </Modal>
    </>
  );
};
