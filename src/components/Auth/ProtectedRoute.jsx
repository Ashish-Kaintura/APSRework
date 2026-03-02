import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/adminlogin" />;
  }

  // if (role && user.role !== role) {
  //   return <Navigate to="/" />;
  // }
  // ❌ Not admin or superadmin
  if (user.role !== "admin" && user.role !== "superadmin") {
    return <Navigate to="/login" replace />;
  }
  return children;
}
