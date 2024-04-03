import { FormEvent, useState } from 'react';
import { ConfigProvider, Modal, Input, message } from 'antd';
import axios from 'axios'; // Import Axios library
import { FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import { t } from 'i18next';
import { Address, User } from '@/types';

interface Props {
  user: User
  address: Address
  onUpdate: () => void
}

export const UpdateAddress = ({ user, address, onUpdate }: Props) => {
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState(address.fullName)
  const [street, setStreet] = useState(address.street)
  const [zipCode, setZipCode] = useState(address.zipCode)
  const [city, setCity] = useState(address.city)
  const [phone, setPhone] = useState(address.phone)
  const [email, setEmail] = useState(address.email)

  const showModal = () => {
    setOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('street', street);
    formData.append('zipCode', zipCode);
    formData.append('city', city);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('username', user.username);

    try {
      const response = await axios.put(`http://localhost:8080/api/addresses/${address.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Product uploaded successfully:', response.data);
      setOpen(false)
      onUpdate()
      message.success({
        content:
          <div className='flex items-center gap-3'>
            <FaCheckCircle className='size-10 text-green-500' />
            <p className='text-xl'>Dane do zamówień zostały dodane!</p>
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
        className='rounded-lg p-2 hover:bg-blue-100'
        onClick={showModal}
      >
        {t('edit')}
      </button>
      <Modal
        title={<p className='text-xl mb-4 font-bold'>{t('editAddress')}</p>}
        open={open}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <button
            onClick={handleSubmit}
            className='w-full rounded-lg bg-black text-white text-lg hover:bg-gray-700 duration-150 p-3 mt-4'
          >
            {t('editAddress')}
          </button>
        )}
      >
        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorTextPlaceholder: '#888',
                colorBorder: '#888',
                fontSize: 18,
                paddingBlock: 6,
              }
            }
          }}
        >
          <form onSubmit={handleSubmit} className='space-y-6'>
            <Input placeholder='Imię i nazwisko' value={fullName} onChange={e => setFullName(e.target.value)} />
            <Input placeholder='Ulica i numer' value={street} onChange={e => setStreet(e.target.value)} />
            <Input placeholder='Kod pocztowy' value={zipCode} onChange={e => setZipCode(e.target.value)} />
            <Input placeholder='Miejscowość' value={city} onChange={e => setCity(e.target.value)} />
            <Input placeholder='Telefon' value={phone} onChange={e => setPhone(e.target.value)} />
            <Input placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)} />
          </form>
        </ConfigProvider>
      </Modal>
    </>
  );
};
