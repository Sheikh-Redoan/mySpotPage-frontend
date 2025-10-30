import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectUser } from "../../redux/features/userSlice";
import { useGetMeQuery, useLazyGetMeQuery } from "../../redux/features/auth/authApi";

export default function SellerRoute({ children }) {
  const {data} = useGetMeQuery();

  if (data?.profile && data?.profile?.role.includes("seller")) {
    return children;
  }
  return <Navigate to="/forbidden" replace />;
}