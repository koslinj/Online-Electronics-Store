import { Address, User } from '@/types';
import { ConfigProvider, Input, Modal, message } from 'antd'
import axios from 'axios';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle } from 'react-icons/fa';
import { z } from "zod";

interface Props {
  user: User
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onUpdate: () => void
  address?: Address
}

export const FormForOrderingData = ({ user, open, setOpen, onUpdate, address }: Props) => {
  const { t } = useTranslation()

  const ValidAddress = z.object({
    fullName: z.string().regex(new RegExp(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ'"\-\s]+$/), t("badFullName")),
    phone: z.string().length(9, t("badPhone")).regex(new RegExp(/^[0-9]+$/), t("badPhone")),
    email: z.string().email(t("badEmail")),
    street: z.string().min(1, t("required")),
    zipCode: z.string().min(1, t("required")),
    city: z.string().min(1, t("required")),
  });
  type ValidAddress = z.infer<typeof ValidAddress>;

  const [fullName, setFullName] = useState(address?.fullName || "")
  const [street, setStreet] = useState(address?.street || "")
  const [zipCode, setZipCode] = useState(address?.zipCode || "")
  const [city, setCity] = useState(address?.city || "")
  const [phone, setPhone] = useState(address?.phone || "")
  const [email, setEmail] = useState(address?.email || "")
  const [errors, setErrors] = useState<{ email?: string, phone?: string, fullName?: string, street?: string, zipCode?: string, city?: string }>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    let result = ValidAddress.safeParse({ email: email, phone: phone, fullName: fullName, street: street, zipCode: zipCode, city: city })
    if (!result.success) {
      const ob = result.error.flatten().fieldErrors
      setErrors({
        email: ob.email?.[0],
        phone: ob.phone?.[0],
        fullName: ob.fullName?.[0],
        street: ob.street?.[0],
        zipCode: ob.zipCode?.[0],
        city: ob.city?.[0]
      });
      console.log(result.error.flatten().fieldErrors)
      return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('street', street);
    formData.append('zipCode', zipCode);
    formData.append('city', city);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('username', user.username);

    try {
      let response
      if (address) {
        response = await axios.put(`http://localhost:8080/api/addresses/${address.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      else {
        response = await axios.post('http://localhost:8080/api/addresses', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      console.log('Product uploaded successfully:', response.data);
      setOpen(false)
      onUpdate()
      message.success({
        content:
          <div className='flex items-center gap-3'>
            <FaCheckCircle className='size-10 text-green-500' />
            {!address ?
              <p className='text-xl'>Dane do zamówień zostały dodane!</p> :
              <p className='text-xl'>Dane do zamówień zostały zaktualizowane!</p>
            }
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

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value)
    setErrors({ ...errors, fullName: '' })
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setErrors({ ...errors, email: '' })
  }

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
    setErrors({ ...errors, phone: '' })
  }

  const handleStreetChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value)
    setErrors({ ...errors, street: '' })
  }

  const handleZipCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value)
    setErrors({ ...errors, zipCode: '' })
  }

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
    setErrors({ ...errors, city: '' })
  }

  return (
    <Modal
      title={<p className='text-xl mb-4 font-bold'>{!address ? t('addAddress') : t('editAddress')}</p>}
      open={open}
      onCancel={handleCancel}
      footer={(_, { OkBtn, CancelBtn }) => (
        <button
          onClick={handleSubmit}
          className='w-full rounded-lg bg-black text-white text-lg hover:bg-gray-700 duration-150 p-3 mt-4'
        >
          {!address ? t('addAddress') : t('editAddress')}
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
          <div>
            <Input
              className={`${errors?.fullName && 'border-red-600 hover:border-red-600'}`}
              placeholder='Imię i nazwisko'
              value={fullName}
              onChange={handleFullNameChange}
            />
            <p className="text-red-600 absolute">{errors?.fullName}</p>
          </div>
          <div>
            <Input
              className={`${errors?.street && 'border-red-600 hover:border-red-600'}`}
              placeholder='Ulica i numer'
              value={street}
              onChange={handleStreetChange}
            />
            <p className="text-red-600 absolute">{errors?.street}</p>
          </div>
          <div>
            <Input
              className={`${errors?.zipCode && 'border-red-600 hover:border-red-600'}`}
              placeholder='Kod pocztowy'
              value={zipCode}
              onChange={handleZipCodeChange}
            />
            <p className="text-red-600 absolute">{errors?.zipCode}</p>
          </div>
          <div>
            <Input
              className={`${errors?.city && 'border-red-600 hover:border-red-600'}`}
              placeholder='Miejscowość'
              value={city}
              onChange={handleCityChange}
            />
            <p className="text-red-600 absolute">{errors?.city}</p>
          </div>
          <div>
            <Input
              className={`${errors?.phone && 'border-red-600 hover:border-red-600'}`}
              placeholder='Telefon'
              value={phone}
              onChange={handlePhoneChange}
            />
            <p className="text-red-600 absolute">{errors?.phone}</p>
          </div>
          <div>
            <Input
              className={`${errors?.email && 'border-red-600 hover:border-red-600'}`}
              placeholder='E-mail'
              value={email}
              onChange={handleEmailChange}
            />
            <p className="text-red-600 absolute">{errors?.email}</p>
          </div>
          <button type='submit' />
        </form>
      </ConfigProvider>
    </Modal>
  )
}
