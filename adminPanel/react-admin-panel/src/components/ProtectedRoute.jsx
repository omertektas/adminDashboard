import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Context'ten import et

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth(); // Context'ten auth durumunu al

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
