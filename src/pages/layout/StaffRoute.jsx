import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectUser } from "../../redux/features/userSlice";

export default function StaffRoute({ children }) {
  const user = useSelector(selectUser);

  // Assuming 'staff' is a role or similar identifier for staff members
  if (user && user.role.includes("staff")) {
    return children;
  }
  // User is authenticated but not staff, redirect
  return <Navigate to="/forbidden" replace />;
}
