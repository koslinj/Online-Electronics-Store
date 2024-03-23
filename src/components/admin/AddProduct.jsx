import axios from "axios";
import { useState } from "react";
import { NameInput } from "./addProductForm/NameInput";
import { DescriptionInput } from "./addProductForm/DescriptionInput";
import { PriceInput } from "./addProductForm/PriceInput";
import { CategoryInput } from "./addProductForm/CategoryInput";
import { ImageInput } from "./addProductForm/ImageInput";

export const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [filterNames, setFilterNames] = useState([]);
  const [filterValues, setFilterValues] = useState([]);

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/, "")
    setPrice(value)
  };

  const handleNameChange = (index, event) => {
    const newNames = [...filterNames];
    newNames[index] = event.target.value;
    setFilterNames(newNames);
  };

  const handleValueChange = (index, event) => {
    const newValues = [...filterValues];
    newValues[index] = event.target.value;
    setFilterValues(newValues);
  };

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

  const addNewField = () => {
    setFilterNames([...filterNames, '']);
    setFilterValues([...filterValues, '']);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <NameInput name={name} setName={setName} />
        <DescriptionInput description={description} setDescription={setDescription} />
        <PriceInput price={price} handlePriceChange={handlePriceChange} />
        <CategoryInput categoryName={categoryName} setCategoryName={setCategoryName} />
        <ImageInput setImage={setImage} />
        <br />
        {filterNames.map((name, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Filter Name"
              value={name}
              onChange={(event) => handleNameChange(index, event)}
            />
            <input
              type="text"
              placeholder="Filter Value"
              value={filterValues[index]}
              onChange={(event) => handleValueChange(index, event)}
            />
          </div>
        ))}
        <button type="button" onClick={addNewField}>Add Filter</button>
        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
};
