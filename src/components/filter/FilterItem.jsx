import { useSearchParams } from "react-router-dom";
import { useFilterHandling } from "@/hooks/useFilterHandling";

export const FilterItem = ({ options, filterName }) => {
  const [searchParams] = useSearchParams();
  const { handleFilterChange } = useFilterHandling();

  const handleChange = (event) => {
    const value = event.target.value;
    handleFilterChange(filterName, value);
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

