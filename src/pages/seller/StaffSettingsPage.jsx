import React from "react";
import { Link, Outlet, useLocation } from "react-router";
import { BsIncognito } from "react-icons/bs";
import { CiMoneyBill } from "react-icons/ci";



function StaffSettingsPage() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => {
    // Check if the current path exactly matches or is a sub-path for the active state
    return (
      currentPath === path ||
      (path === "/staff-management/settings/manager" &&
        currentPath.startsWith("/staff-management/settings/manager")) ||
      (path === "/staff-management/settings/receptionist" &&
        currentPath.startsWith("/staff-management/settings/receptionist"))
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md py-6 px-5">
        <ul className="space-y-3">
          <Link to="/staff-management/settings/manager">
            <li
              className={`px-6 py-3 rounded-xl flex items-center gap-4 ${
                isActive("/staff-management/settings/manager")
                  ? "bg-violet-100 text-violet-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <BsIncognito className="w-5 h-5" /> {/* Manager Icon */}
              <p className="font-semibold">Manager</p>
            </li>
          </Link>
          <Link to="/staff-management/settings/receptionist">
            <li
              className={`px-6 py-3 rounded-xl flex items-center gap-4 ${
                isActive("/staff-management/settings/receptionist")
                  ? "bg-violet-100 text-violet-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <CiMoneyBill className="w-5 h-5" /> {/* Receptionist Icon */}
              <p className="font-semibold">Receptionist</p>
            </li>
          </Link>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default StaffSettingsPage;