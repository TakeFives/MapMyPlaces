import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  console.log("ProtectedRoute user", user);

  return user ? children : <Navigate to="/auth" replace />;
}
export default ProtectedRoute;

