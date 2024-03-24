import { useTranslation } from "react-i18next";
import { MdAddCircleOutline } from "react-icons/md";
import { useState, useEffect } from "react";
import { fetchFilters } from "@/api/filters";

export const FiltersInput = ({ filterNames, setFilterNames, filterValues, setFilterValues }) => {
  const { t } = useTranslation()
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const options = await fetchFilters();
      console.log(options)
      setFilterOptions(options);
    };
    fetchFilterOptions();
  }, []);

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

  const addNewField = () => {
    setFilterNames([...filterNames, '']);
    setFilterValues([...filterValues, '']);
  };

  return (
    <div>
      <p className='text-lg font-semibold'>{t('filters')}</p>
      {filterValues.length > 0 && (
        <div className="shadow-equal rounded-lg p-2">
          {filterValues.map((filter, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <select
                className='p-1 outline-none border-gray-400 border-2 rounded-md flex-grow'
                value={filter.filterName}
                onChange={(event) => handleNameChange(index, event)}
              >
                <option value="">{t('select_filter')}</option>
                {filterOptions.map((option, idx) => (
                  <option key={idx} value={option.name}>{option.name}</option>
                ))}
              </select>
              <input
                className='p-1 outline-none border-gray-400 border-2 rounded-md flex-grow'
                type="text"
                placeholder={t("filterValue")}
                value={filter.filterValue}
                onChange={(event) => handleValueChange(index, event)}
              />
            </div>
          ))}
        </div>
      )}
      <button type="button" onClick={addNewField} className="mt-2 shadow-equal rounded-lg p-1 flex items-center gap-1">
        <MdAddCircleOutline className="size-7" />
        {t('add_filter')}
      </button>
    </div>
  )
}
