import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectUser } from "../../redux/features/userSlice";

export default function ProtectedRoute({ children }) {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (user.role.includes("admin")) {
    <Navigate to="/admin-dashboard" />;
  }

  return children;
}
