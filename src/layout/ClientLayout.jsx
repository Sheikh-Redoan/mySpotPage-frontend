import { Outlet } from "react-router";
import TopNavbarClient from "../pages/layout/TopNavbarClient";

export default function ClientLayout() {
  return (
    <div className="bg-[#F9FAFC] min-h-screen">
      <TopNavbarClient />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
