import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next";
import { ConfigProvider, Select } from 'antd';
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { fetchFilters } from "@/api/filters";

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export const OneFilter = ({ index, filter, handleNameChange, handleValueChange }) => {
  const { t } = useTranslation()
  const [focused, setFocused] = useState(false)
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const data = await fetchFilters();
      const optionsArray = data.map(item => ({ value: item.name, label: item.name }));
      console.log(optionsArray)
      setFilterOptions(optionsArray);
    };
    fetchFilterOptions();
  }, []);

  return (
    <div className="flex gap-2 mb-2">
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
          placeholder={t('select_filter')}
          optionFilterProp="children"
          onChange={(value) => { handleNameChange(index, value); console.log(value) }}
          filterOption={filterOption}
          options={filterOptions}
          style={{
            width: "100%"
          }}
        />
      </ConfigProvider>
      <input
        className='p-1 outline-none border-gray-400 border-2 rounded-md flex-grow'
        type="text"
        placeholder={t("filterValue")}
        value={filter.filterValue}
        onChange={(event) => handleValueChange(index, event)}
      />
    </div>
  )
}
