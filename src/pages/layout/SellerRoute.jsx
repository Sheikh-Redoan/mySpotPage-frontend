import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectUser } from "../../redux/features/userSlice";

export default function SellerRoute({ children }) {
  const user = useSelector(selectUser);

  if (user && user.role.includes("seller")) {
    return children;
  }
  // User is authenticated but not a seller, redirect
  return <Navigate to="/forbidden" replace />;
}
