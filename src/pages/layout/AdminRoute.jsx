import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectUser } from "../../redux/features/userSlice";

export default function AdminRoute({ children }) {
  const user = useSelector(selectUser);

  if (user && user.role.includes("admin")) {
    return children;
  }
  // User is authenticated but not an admin, redirect to a forbidden page or their default dashboard
  return <Navigate to="/forbidden" replace />;
}
