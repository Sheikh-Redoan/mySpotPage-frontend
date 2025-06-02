import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import TopNavbarClient from "../pages/layout/TopNavbarClient";
import { selectUser } from "../redux/features/userSlice";

export default function ClientLayout() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "seller") {
      return navigate("/dashboard");
    }

    if (user && user.role === "admin") {
      return navigate("/admin");
    }
  }, [user]);

  return (
    <div className="bg-[#F9FAFC] min-h-screen">
      <TopNavbarClient />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
