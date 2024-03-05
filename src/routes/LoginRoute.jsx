import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export const LoginRoute = () => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/profile" />;
  }

  return <Outlet />;
};