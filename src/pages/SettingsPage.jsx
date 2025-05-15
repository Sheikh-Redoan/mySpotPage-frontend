import { Link, Outlet, useLocation } from "react-router";
import { imageProvider } from "../lib/imageProvider";

function SettingsPage() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => {
    return (
      currentPath === path ||
      (currentPath === "/settings" && path === "/settings")
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[240px] bg-white h-full left-[65px] top-[73px] shadow-md py-6 px-5">
        <ul className="space-y-3">
          <Link to={"/settings"}>
            <li
              className={`px-6 py-3 my-4 rounded-xl flex items-center gap-4 ${
                isActive("/settings")
                  ? "bg-[#ECEBFC] text-[#744CDB]"
                  : "hover:bg-gray-100 text-[#242528]"
              }`}
            >
              <img src={imageProvider.businessinfo} alt="icon" />
              <p className=" font-semibold block">Business Info</p>
            </li>
          </Link> 
          <Link to="/settings/location">
            <li
              className={`px-6 py-3 mb-4 rounded-xl flex items-center gap-5 ${
                isActive("/settings/location")
                  ? "bg-[#ECEBFC] text-[#744CDB]"
                  : "hover:bg-gray-100 text-[#242528]"
              }`}
            >
              <img src={imageProvider.location} alt="icon" />
              <p className=" font-semibold block">Location</p>
            </li>
          </Link>
          <Link to="/settings/subscription">
            <li
              className={`px-6 py-3 mb-4 rounded-xl flex items-center gap-4 ${
                isActive("/settings/subscription")
                  ? "bg-[#ECEBFC] text-[#744CDB]"
                  : "hover:bg-gray-100 text-[#242528]"
              }`}
            >
              <img src={imageProvider.subscription} alt="icon" />
              <p className="font-semibold block w-full">Subscription</p>
            </li>
          </Link>
        </ul>
      </aside>

      {/* Main content */}
      <main className=" flex-1 bg-[#F9FAFC] h-full p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default SettingsPage;
