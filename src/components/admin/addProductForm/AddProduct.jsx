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

export const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [filterNames, setFilterNames] = useState([]);
  const [filterValues, setFilterValues] = useState([]);

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
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div className="p-4 shadow-equal rounded-xl max-w-md">
      <h2 className="text-3xl font-semibold text-center">{t('add_product')}</h2>
      <form onSubmit={handleSubmit} >
        <div className="space-y-2 flex flex-col">
          <NameInput name={name} setName={setName} />
          <DescriptionInput description={description} setDescription={setDescription} />
          <PriceInput price={price} setPrice={setPrice} />
          <CategoryInput categoryName={categoryName} setCategoryName={setCategoryName} />
          <ImageInput setImage={setImage} />
          <FiltersInput
            filterNames={filterNames}
            setFilterNames={setFilterNames}
            filterValues={filterValues}
            setFilterValues={setFilterValues}
          />
        </div>
        <button type="submit" className="mt-8 mx-auto flex items-center gap-2 p-3 bg-green-100 hover:bg-green-300 hover:scale-110 duration-200 border-2 border-black rounded-xl">
          <FaCheckCircle className="size-9" />
          <p className="text-lg font-semibold">{t('upload_product')}</p>
        </button>
      </form>
    </div>
  );
};
