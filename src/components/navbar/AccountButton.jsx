import { GoPerson } from "react-icons/go";
import { Link } from "react-router-dom";

export const AccountButton = () => {
  return (
    <Link to="/profile">
      <div className="flex flex-col justify-center items-center cursor-pointer rounded-md p-2 hover:bg-green-200">
        <GoPerson className="w-6 h-6" />
        <p className="text-xs">Twoje konto</p>
      </div>
    </Link>
  )
}
