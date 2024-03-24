import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const PriceFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [min, setMin] = useState(searchParams.get("Od") || "");
  const [max, setMax] = useState(searchParams.get("Do") || "");

  const handleChange = (value, name) => {
    if (value == "") {
      setSearchParams(params => {
        params.delete(name)
        return params;
      });
    } else {
      setSearchParams(params => {
        params.set(name, value)
        return params;
      });
    }
  };

  useEffect(() => {
    let timer;
    const performDebouncedAction = () => {
      handleChange(min, "Od")
    };

    clearTimeout(timer);
    timer = setTimeout(performDebouncedAction, 1000);

    return () => clearTimeout(timer);
  }, [min])

  useEffect(() => {
    let timer;
    const performDebouncedAction = () => {
      handleChange(max, "Do")
    };
    
    clearTimeout(timer);
    timer = setTimeout(performDebouncedAction, 1000);

    return () => clearTimeout(timer);
  }, [max])

  const onMinInputChange = (e) => {
    const value = e.target.value.replace(/\D/, ""); // Replace non-numeric characters with an empty string
    setMin(value)
  };

  const onMaxInputChange = (e) => {
    const value = e.target.value.replace(/\D/, ""); // Replace non-numeric characters with an empty string
    setMax(value)
  };

  return (
    <div>
      <h3 className="text-lg font-bold">Cena</h3>
      <div className="flex items-center justify-around">
        <input
          type="text"
          placeholder="od"
          size={5}
          value={min}
          onChange={onMinInputChange}
          className="outline-none border-2 border-gray-400 rounded-md px-2 py-1 text-center"
        />
        <p className="text-2xl font-semibold">-</p>
        <input
          type="text"
          placeholder="do"
          size={5}
          value={max}
          onChange={onMaxInputChange}
          className="outline-none border-2 border-gray-400 rounded-md px-2 py-1 text-center"
        />
      </div>
    </div>
  )
}
