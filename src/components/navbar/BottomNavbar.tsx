import { Link } from "react-router-dom"
import { Dropdown } from "../Dropdown"
import { useEffect, useState } from "react";
import { fetchCategories } from "../../api/categories";
import { Category } from "../../types";
import { IoIosArrowDown } from "react-icons/io";

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
    <div className="bg-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex gap-6 items-center flex-wrap">
        {categories.map((item) => (
          <Dropdown
            key={item.urlGeneralCategory}
            side="right"
            element={
              <Link to={`/categories/${item.urlGeneralCategory}`}>
                <div className="w-36 h-12 leading-5 rounded-md p-1 group-hover:bg-white group-hover:scale-105 duration-200 flex items-center justify-between">
                  <div>{item.generalCategory}</div>
                  <div>
                    <IoIosArrowDown className="size-5 group-hover:-rotate-180 duration-300" />
                  </div>
                </div>
              </Link>}
          >
            {item.names.map((cat => (
              <Link
                to={`/products/${cat.urlName}`}
                key={cat.urlName}
              >
                <div className="hover:bg-gray-200 rounded-lg p-2 text-nowrap">{cat.name}</div>
              </Link>
            )))}
          </Dropdown>
        ))}
      </div>
    </div>
  )
}
