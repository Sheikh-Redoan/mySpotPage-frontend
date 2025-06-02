import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { selectUser } from "../../redux/features/userSlice";

export default function ProtectedRoute({ children }) {
  const user = useSelector(selectUser);
  const location = useLocation(); // Get current location

  if (!user) {
    // Redirect to signin, but store the current location so we can redirect back after login
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
