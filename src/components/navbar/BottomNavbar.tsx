import { Link } from "react-router-dom"
import { Dropdown } from "../Dropdown"
import { useEffect, useState } from "react";
import { fetchCategories } from "../../api/categories";
import { Category } from "../../types";

interface GroupedCategory {
  generalCategory: string;
  urlGeneralCategory: string;
  names: {
    name: string;
    urlName: string;
  }[];
}


export const BottomNavbar = () => {
  const [categories, setCategories] = useState<GroupedCategory[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await fetchCategories()

        const grouped = data.reduce((accumulator: GroupedCategory[], currentItem: Category) => {
          const { generalCategory, name, urlGeneralCategory, urlName } = currentItem;

          const existingGroup = accumulator.find((group: GroupedCategory) => group.generalCategory === generalCategory);

          if (existingGroup) {
            existingGroup.names.push({ name, urlName });
          } else {
            accumulator.push({
              generalCategory,
              urlGeneralCategory,
              names: [{ name, urlName }],
            });
          }

          return accumulator;
        }, []);

        setCategories(grouped)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-6 py-1 flex gap-6 items-center bg-gray-100 shadow-card">

      {categories.map((item) => (
        <Dropdown
          key={item.urlGeneralCategory}
          side="right"
          element={
            <Link to={`/categories/${item.urlGeneralCategory}`}>
              <div className="w-32 leading-5 rounded-t-md p-1 group-hover:bg-green-200">
                {item.generalCategory}
              </div>
            </Link>}
        >
          {item.names.map((cat => (
            <Link
              to={`/products/${cat.urlName}`}
              key={cat.urlName}
            >
              <div className="hover:bg-green-300 p-2">{cat.name}</div>
            </Link>
          )))}
        </Dropdown>
      ))}

    </div>
  )
}
