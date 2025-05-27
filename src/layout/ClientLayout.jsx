import { Outlet } from "react-router";
import TopNavbarClient from "../pages/layout/TopNavbarClient";

export default function ClientLayout() {
  return (
    <>
      <TopNavbarClient />
      <main>
        <Outlet />
      </main>
    </>
  );
}
