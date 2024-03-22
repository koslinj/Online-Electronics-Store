import { useSearchParams } from "react-router-dom";

export const useFilterHandling = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (filterName: string, filterValue: string) => {
    const currentValues = searchParams.getAll(filterName);

    if (currentValues.includes(filterValue)) {
      const updatedValues = currentValues.filter(value => value !== filterValue);

      setSearchParams(params => {
        params.delete(filterName);
        updatedValues.forEach(value => {
          params.append(filterName, value);
        });
        return params;
      });
    } else {
      setSearchParams(params => {
        params.append(filterName, filterValue);
        return params;
      });
    }
  };

  return { handleFilterChange };
};