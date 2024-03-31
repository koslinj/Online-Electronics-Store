import { useState, useEffect } from "react";
import { fetchCategories } from "@/api/categories";
import { useTranslation } from "react-i18next";
import { ConfigProvider, Select } from 'antd';
import { FaChevronDown, FaSearch } from "react-icons/fa";

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



export const CategoryInput = ({ categoryName, setCategoryName }) => {
  const [categories, setCategories] = useState([]);
  const [focused, setFocused] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await fetchCategories()
        const namesArray = data.map(item => ({ value: item.name, label: item.name }));
        setCategories(namesArray)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <label>
        <p className='text-xl font-semibold'>{t("category")}</p>
        <ConfigProvider
          theme={{
            components: {
              Select: {
                colorTextPlaceholder: 'rgb(156 163 175)',
                colorBorder: 'rgb(156 163 175)',
                fontSizeIcon: 18,
                fontSize: 18,
                optionPadding: 10,
                controlHeight: 40
              }
            }
          }}
        >
          <Select
            showSearch
            onDropdownVisibleChange={() => setFocused(!focused)}
            suffixIcon={focused ? <FaSearch color="rgb(100 100 100)" /> : <FaChevronDown color="rgb(100 100 100)" />}
            placeholder={t('choose_category')}
            optionFilterProp="children"
            onChange={(value) => { setCategoryName(value); console.log(value) }}
            filterOption={filterOption}
            options={categories}
            style={{
              width: "100%"
            }}
          />
        </ConfigProvider>
      </label>
    </div>
  )
}
