import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return null; // استنى الـ session

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
