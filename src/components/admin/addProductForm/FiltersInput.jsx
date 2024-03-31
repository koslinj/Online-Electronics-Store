import { MdAddCircleOutline } from "react-icons/md";
import { OneFilter } from "./OneFilter";
import { useTranslation } from "react-i18next";

export const FiltersInput = ({ filterNames, setFilterNames, filterValues, setFilterValues }) => {
  const { t } = useTranslation()

  const handleNameChange = (index, value) => {
    const newNames = [...filterNames];
    newNames[index] = value;
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
        <div>
          {filterValues.map((filter, index) => (
            <OneFilter
              key={index}
              index={index}
              filter={filter}
              handleNameChange={handleNameChange}
              handleValueChange={handleValueChange}
            />
          ))}
        </div>
      )}
      <button type="button" onClick={addNewField} className="mt-4 mx-auto shadow-equal rounded-lg p-1 flex items-center gap-1">
        <MdAddCircleOutline className="size-7" />
        {t('add_filter')}
      </button>
    </div>
  )
}
