import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectUser } from "../../redux/features/userSlice";

export default function ClientOnlyRoute({ children }) {
  const user = useSelector(selectUser);

  // Assuming 'client' is a role or similar identifier for general clients
  if (user && user.role.includes("client")) {
    return children;
  }
  // User is authenticated but not a client, redirect (e.g., if a seller tries to access client-specific booking paths directly)
  return <Navigate to="/forbidden" replace />;
}
