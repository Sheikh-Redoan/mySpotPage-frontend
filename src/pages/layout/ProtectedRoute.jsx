import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectUser } from "../../redux/features/userSlice";

export default function ProtectedRoute({ children }) {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (user.role === "client") {
    return <Navigate to="/client" />;
  }

  return children;
}
