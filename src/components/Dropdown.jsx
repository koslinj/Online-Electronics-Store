import { useTranslation } from "react-i18next";


export const Dropdown = ({ side, children, element, size = 1 }) => {
  const { t } = useTranslation()

  return (
    <div className="group relative">
      <div className="py-2">
        {element}
      </div>
      {side === "right" ?
        <div className="z-10 -left-1 hidden group-hover:block absolute min-w-48 rounded-lg bg-white shadow-equal p-3">
          {size > 0 ? children : <p className="text-center">{t('emptyCart')}</p>}
        </div>
        :
        <div className="z-10 hidden group-hover:block absolute right-0 min-w-48 rounded-lg bg-white shadow-equal p-3">
          {size > 0 ? children : <p className="text-center">{t('emptyCart')}</p>}
        </div>
      }
    </div>
  );
};