import { useSearchParams } from "react-router-dom";

export const FilterItem = ({ options, filterName, onFilterChange }) => {
  const [searchParams] = useSearchParams();

  const handleChange = (event) => {
    const value = event.target.value;
    onFilterChange(filterName, value);
  };

  return (
    <div>
      <h3 className="text-xl font-bold">{filterName}</h3>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`${filterName}-${option}`}
            value={option}
            checked={searchParams?.getAll(filterName)?.includes(option)}
            onChange={handleChange}
          />
          <label htmlFor={`${filterName}-${option}`}>{option}</label>
        </div>
      ))}
    </div>
  );
};

