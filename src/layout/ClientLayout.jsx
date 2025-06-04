import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import TopNavbarClient from "../pages/layout/TopNavbarClient";
import { selectUser } from "../redux/features/userSlice";

export default function ClientLayout() {
  const user = useSelector(selectUser);

  if (user.role === "seller") {
    return <Navigate to="/dashboard" />;
  }
  if (user.role === "admin") {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="bg-[#F9FAFC] min-h-screen">
      <TopNavbarClient />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
