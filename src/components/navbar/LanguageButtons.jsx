import { useTranslation } from "react-i18next"
import plIcon from "../../images/flag_poland_icon.png"
import gbIcon from "../../images/flag_gb_icon.png"

export const LanguageButtons = () => {
  const { i18n } = useTranslation()

  return (
    <div className="flex gap-4 items-center justify-center">
      <button
        onClick={() => i18n.changeLanguage('pl')}
        className="flex flex-col justify-end items-center"
      >
        <div className="border-black border-2 rounded-full">
          <img src={plIcon} alt="Poland flag" width={24} />
        </div>
        <p className={`leading-3 text-gray-700 text-sm ${i18n.language === "pl" && "font-extrabold"}`}>PL</p>
      </button>
      <button
        onClick={() => i18n.changeLanguage('en')}
        className="flex flex-col justify-end items-center"
      >
        <div className="border-black border-2 rounded-full">
          <img src={gbIcon} alt="Great Britain flag" width={24} />
        </div>
        <p className={`leading-3 text-gray-700 text-sm ${i18n.language === "en" && "font-extrabold"}`}>EN</p>
      </button>
    </div>
  )
}
