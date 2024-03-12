import { useAuth } from "../providers/AuthProvider";

export const LogoutButton = () => {
  const { setToken } = useAuth();

  const handleLogout = () => {
    setToken();
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 bg-red-400 rounded-md"
    >
      Wyloguj się
    </button>
  )
};
