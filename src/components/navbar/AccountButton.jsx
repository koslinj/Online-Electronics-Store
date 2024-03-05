import { GoPerson } from "react-icons/go";

export const AccountButton = () => {
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer rounded-md p-2 hover:bg-blue-100">
      <GoPerson className="w-6 h-6" />
      <p className="text-xs">Twoje konto</p>
    </div>
  )
}
