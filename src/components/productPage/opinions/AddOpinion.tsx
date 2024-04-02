import { FormEvent, useState } from 'react';
import { ConfigProvider, Modal, Rate, Input, message } from 'antd';
import axios from 'axios'; // Import Axios library
import { FaCheckCircle } from 'react-icons/fa';
import { Product } from '@/types';
import { MdError } from 'react-icons/md';
import { t } from 'i18next';

const { TextArea } = Input;

interface User {
  username: string
  role: string
  firstName: string
}

interface Props {
  product: Product
  user: User | null
  onOpinionAdded: () => void
}

export const AddOpinion = ({ product, user, onOpinionAdded }: Props) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [stars, setStars] = useState(1);

  const showModal = () => {
    setOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (user) {
      const formData = new FormData();
      formData.append('stars', stars.toString());
      formData.append('content', content);
      formData.append('username', user.username);
      formData.append('productId', product.id.toString());

      try {
        const response = await axios.post('http://localhost:8080/api/opinions', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Product uploaded successfully:', response.data);
        onOpinionAdded()
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
      <div className='border-2 border-gray-400 rounded-xl p-5 text-center space-y-3'>
        <p className='text-3xl font-semibold'>Masz ten produkt ?</p>
        <p className='text-lg text-gray-500'>Oceń {product.name} i pomóż innym w wyborze</p>
        <button
          className='rounded-xl bg-black text-white hover:bg-gray-700 duration-150 p-2 px-8'
          onClick={showModal}
        >
          {t('addOpinion')}
        </button>
      </div>
      <Modal
        title={<p className='text-lg font-bold'>Dodaj opinię</p>}
        open={open}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <button
            onClick={handleSubmit}
            className='rounded-lg bg-black text-white hover:bg-gray-700 duration-150 p-2'
          >
            Dodaj opinię
          </button>
        )}
      >
        <ConfigProvider
          theme={{
            components: {
              Rate: {
                starBg: 'rgb(200 200 200)',
                starColor: '#ffd100',
                starSize: 30
              }
            }
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className='flex justify-center items-center flex-col gap-y-2 py-5 my-5 border-y-2 border-y-gray-300'>
              <p>Twoja ocena produktu</p>
              <Rate
                allowClear={false}
                count={6}
                defaultValue={1}
                onChange={value => setStars(value)}
              />
            </div>
            <p className='font-semibold text-base'>Napisz, co myślisz o tym produkcie</p>
            <p className='text-gray-500'>Pamiętaj, że Twoja opinia powinna dotyczyć produktu i jego funkcjonalności.</p>
            <p className='mt-6'>Co sądzisz o tym produkcie?(opcjonalnie)</p>
            <TextArea
              autoSize={{ minRows: 3, maxRows: 10 }}
              placeholder="Napisz 2-3 zdania"
              maxLength={1000}
              value={content}
              onChange={e => setContent(e.target.value)} // Update content state on change
            />
          </form>
        </ConfigProvider>
      </Modal>
    </>
  );
};
