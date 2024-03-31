import axios from "axios";
import { useState } from "react";
import { NameInput } from "./NameInput";
import { DescriptionInput } from "./DescriptionInput";
import { PriceInput } from "./PriceInput";
import { CategoryInput } from "./CategoryInput";
import { ImageInput } from "./ImageInput";
import { useTranslation } from "react-i18next";
import { FiltersInput } from "./FiltersInput";
import { FaCheckCircle } from "react-icons/fa";
import { message } from "antd"

export const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [filterNames, setFilterNames] = useState(['']);
  const [filterValues, setFilterValues] = useState(['']);

  const { t } = useTranslation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('categoryName', categoryName);
    formData.append('filterNames', filterNames);
    formData.append('filterValues', filterValues.map(value => encodeURIComponent(value)));

    try {
      const response = await axios.post('http://localhost:8080/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Product uploaded successfully:', response.data);
      message.success({
        content:
          <div className='flex items-center gap-3'>
            <FaCheckCircle className='size-10 text-green-500' />
            <p className='text-xl'>Produkt został dodany!</p>
          </div>,
        icon: <></>
      });
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div className="p-4 border-2 border-gray-400 rounded-xl max-w-3xl">
      <h2 className="text-2xl font-semibold text-center mb-4">{t('add_product')}</h2>
      <form onSubmit={handleSubmit} >
        <div className="flex gap-8 flex-wrap">
          <div className="space-y-2 flex flex-col flex-1 min-w-44">
            <NameInput name={name} setName={setName} />
            <DescriptionInput description={description} setDescription={setDescription} />
            <PriceInput price={price} setPrice={setPrice} />
          </div>
          <div className="space-y-2 flex flex-col flex-1 min-w-44">
            <CategoryInput categoryName={categoryName} setCategoryName={setCategoryName} />
            <ImageInput setImage={setImage} />
          </div>
        </div>
        <FiltersInput
          filterNames={filterNames}
          setFilterNames={setFilterNames}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
        />
        <button type="submit" className="mt-8 mx-auto flex items-center gap-2 p-3 bg-green-100 hover:bg-green-300 hover:scale-110 duration-200 border-2 border-black rounded-xl">
          <FaCheckCircle className="size-9" />
          <p className="text-lg font-semibold">{t('upload_product')}</p>
        </button>
      </form>
    </div>
  );
};
