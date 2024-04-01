import { useTranslation } from "react-i18next";
import { GoPerson } from "react-icons/go";
import { Link } from "react-router-dom";

export const AccountButton = () => {
  const { t } = useTranslation()

  return (
    <Link to="/profile">
      <div
        className="flex flex-col justify-center items-center cursor-pointer rounded-md p-2 hover:bg-gray-200 duration-200 hover:shadow-lg group"
      >
        <GoPerson className="w-6 h-6" />
        <p className="text-xs">{t('yourAccount')}</p>
      </div>
    </Link>
  )
}
