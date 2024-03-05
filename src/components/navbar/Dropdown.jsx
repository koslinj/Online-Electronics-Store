import { FiShoppingCart } from "react-icons/fi";

export const Dropdown = ({ side }) => {
  return (
    <div className="group relative">
      <div className="flex flex-col justify-center items-center cursor-pointer rounded-t-md p-2 group-hover:bg-blue-100">
        <FiShoppingCart className="w-6 h-6" />
        <p className="text-xs">Koszyk</p>
      </div>
      {side === "right" ?
        <div className="hidden group-hover:block absolute min-w-40 rounded-r-lg rounded-bl-lg bg-blue-100 py-3">
          <div className="hover:bg-blue-200 p-2">Link 1</div>
          <div className="hover:bg-blue-200 p-2">Link 2</div>
          <div className="hover:bg-blue-200 p-2">Link 3</div>
        </div>
        :
        <div className="hidden group-hover:block absolute right-0 min-w-40 rounded-l-lg rounded-br-lg bg-blue-100 py-3">
          <div className="hover:bg-blue-200 p-2">Link 1</div>
          <div className="hover:bg-blue-200 p-2">Link 2</div>
          <div className="hover:bg-blue-200 p-2">Link 3</div>
        </div>
      }

    </div>
  );
};