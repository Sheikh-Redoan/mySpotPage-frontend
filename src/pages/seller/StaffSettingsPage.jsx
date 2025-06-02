import { Outlet, useLocation } from "react-router";

function StaffSettingsPage() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6"></main>
    </div>
  );
}

export default StaffSettingsPage;
