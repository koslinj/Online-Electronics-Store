import { Dispatch, SetStateAction, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { MdError } from 'react-icons/md';
import Dragger from 'antd/es/upload/Dragger';
import { FaCheckCircle } from 'react-icons/fa';

export const ImageInput = ({ setImage }: {setImage: Dispatch<SetStateAction<File>>}) => {
  const [imageUrl, setImageUrl] = useState<string>();

  const handleBeforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
    if (!isJpgOrPng) {
      message.error({
        content:
          <div className='flex items-center gap-3'>
            <MdError className='size-10 text-red-500' />
            <p className='text-2xl'>To nie jest zdjęcie!</p>
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
            <p className='text-2xl'>Zdjęcie musi być mniejsze niż 2MB!</p>
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
          <p className='text-2xl'>Zdjęcie zostało załadowane!</p>
        </div>,
      icon: <></>
    });
    // Prevent default upload behavior
    return false;
  };

  return (
    <div className='max-w-96'>
      <Dragger
        name="avatar"
        showUploadList={false}
        beforeUpload={handleBeforeUpload}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="Product Image" />
        ) : (
          <button className='border-0 bg-none' type="button">
            <PlusOutlined />
            <p className='mt-3'>Upload</p>
          </button>
        )}
      </Dragger>
    </div>
  );
};