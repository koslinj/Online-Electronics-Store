import { Dispatch, SetStateAction, useState } from 'react';
import { message } from 'antd';
import { MdError } from 'react-icons/md';
import Dragger from 'antd/es/upload/Dragger';
import { FaCheckCircle } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { useTranslation } from 'react-i18next';

export const ImageInput = ({ setImage }: { setImage: Dispatch<SetStateAction<File>> }) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const { t } = useTranslation()

  const handleBeforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
    if (!isJpgOrPng) {
      message.error({
        content:
          <div className='flex items-center gap-3'>
            <MdError className='size-10 text-red-500' />
            <p className='text-xl'>To nie jest zdjęcie!</p>
          </div>,
        icon: <></>
      });
      return
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error({
        content:
          <div className='flex items-center gap-3'>
            <MdError className='size-10 text-red-500' />
            <p className='text-xl'>Zdjęcie musi być mniejsze niż 2MB!</p>
          </div>,
        icon: <></>
      });
      return
    }
    // Read file and set preview image
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    setImage(file)

    message.success({
      content:
        <div className='flex items-center gap-3'>
          <FaCheckCircle className='size-10 text-green-500' />
          <p className='text-xl'>Zdjęcie zostało załadowane!</p>
        </div>,
      icon: <></>
    });
    // Prevent default upload behavior
    return false;
  };

  return (
    <div className='max-w-80'>
      <p className='text-lg font-semibold'>{t('image')}</p>
      <Dragger
        name="avatar"
        showUploadList={false}
        beforeUpload={handleBeforeUpload}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="Product Image" />
        ) : (
          <div className='flex flex-col justify-center items-center my-2'>
            <GoPlus className='size-16' />
            <p className='text-lg'>{t('uploadImage')}</p>
          </div>
        )}
      </Dragger>
    </div>
  );
};