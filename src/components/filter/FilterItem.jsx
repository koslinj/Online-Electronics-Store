import { useSearchParams } from "react-router-dom";
import { useFilterHandling } from "@/hooks/useFilterHandling";

export const FilterItem = ({ options, filterName }) => {
  const [searchParams] = useSearchParams();
  const { handleFilterChange } = useFilterHandling();

  const handleChange = (e) => {
    const value = e.target.value
    handleFilterChange(filterName, value);
  };

  return (
    <div>
      <h3 className="text-lg font-bold">{filterName}</h3>
      <div className="space-y-1">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex gap-2 items-center group hover:bg-gray-300 p-2 rounded-lg duration-150 cursor-pointer"
            onClick={(e) => {
              const checkbox = document.getElementById(`${filterName}-${option}`);
              if (checkbox && e.target != checkbox) {
                checkbox.checked = !checkbox.checked;
                handleFilterChange(filterName, option);
              }
            }}
          >
            <input
              className="accent-black size-6 group-hover:scale-110 duration-15"
              type="checkbox"
              id={`${filterName}-${option}`}
              value={option}
              checked={searchParams?.getAll(filterName)?.includes(option)}
              onChange={handleChange}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

