import { useSearchParams } from "react-router-dom";

export const Filter = ({ options, filterName, onFilterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event) => {
    const value = event.target.value;
    onFilterChange(filterName, value);
  };

  return (
    <div className="border-4 rounded-xl p-2 w-60">
      <h2 className="text-3xl font-bold mb-6">Filters</h2>
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

