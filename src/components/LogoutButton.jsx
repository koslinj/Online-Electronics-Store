import { useTranslation } from "react-i18next";
import { useAuth } from "../providers/AuthProvider";
import { TbLogout } from "react-icons/tb";

export const LogoutButton = () => {
  const { t } = useTranslation()
  const { setToken } = useAuth();

  const handleLogout = () => {
    setToken();
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 hover:bg-gray-200 duration-200 border-4 shadow-md border-black rounded-xl flex items-center gap-2"
    >
      <TbLogout className="size-8" />
      <p className="text-lg">{t('logout')}</p>

    </button>
  )
};
