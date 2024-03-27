import { useState, useEffect } from "react";
import { fetchCategories } from "@/api/categories";
import { useTranslation } from "react-i18next";
import { ConfigProvider, Select } from 'antd';

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



export const CategoryInput = ({ categoryName, setCategoryName }) => {
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await fetchCategories()
        const namesArray = data.map(item => ({ value: item.name, label: item.name }));
        console.log(namesArray)
        setCategories(namesArray)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              colorTextPlaceholder: 'rgb(156 163 175)',
              colorBorder: 'rgb(156 163 175)',
              fontSizeIcon: 18,
              fontSize: 18,
              optionPadding: 10
            }
          }
        }}
      >
        <Select
          showSearch
          placeholder={t('choose_category')}
          optionFilterProp="children"
          onChange={(value) => { setCategoryName(value); console.log(value) }}
          onSearch={() => { }}
          filterOption={filterOption}
          options={categories}
          style={{
            color: 'red',
            width: "100%"
          }}
        />
      </ConfigProvider>
      <label>
        <p className='text-lg font-semibold'>{t("category")}</p>
        {/* <select
          className='p-1 py-2 w-full outline-none border-gray-400 border-2 rounded-md'
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        >
          <option value="">{t('choose_category')}</option>
          {categories.map((category, index) => (
            <option className="hover:bg-gray-200" key={index} value={category}>{category}</option>
          ))}
        </select> */}
      </label>
    </div>
  )
}
