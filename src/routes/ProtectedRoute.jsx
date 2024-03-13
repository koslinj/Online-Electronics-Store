import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { TopNavbar } from "../components/navbar/TopNavbar";
import { BottomNavbar } from "../components/navbar/BottomNavbar";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />
};