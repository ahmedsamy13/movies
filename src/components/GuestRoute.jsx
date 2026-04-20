import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function GuestRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return !isAuthenticated ? children : <Navigate to="/" replace />;
}

export default GuestRoute;
