import { Link, Outlet } from "react-router";
import { imageProvider } from "../lib/imageProvider";

function SettingsPage() {
  // const location = useLocation();
  // const currentPath = location.pathname;

  // const isActive = (path) => {
  //   return (
  //     currentPath === path ||
  //     (currentPath === "/settings" && path === "/settings/business-info")
  //   );
  // };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[240px] bg-white h-full left-[65px] top-[73px] shadow-md py-6 px-5">
        <ul className="space-y-2">
          <li className="px-6 py-3 rounded-xl hover:bg-gray-100 flex items-center gap-4">
            <img src={imageProvider.businessinfo} alt="icon" />
            <Link
              to="/settings/business-info"
              className="text-[#242528] font-semibold block"
            >
              Business Info
            </Link>
          </li>
          <li className="px-6 py-3 rounded-xl hover:bg-gray-100 flex items-center gap-5">
            <img src={imageProvider.location} alt="icon" />
            <Link
              to="/settings/location"
              className="text-[#242528] font-semibold block"
            >
              Location
            </Link>
          </li>
          <li className="px-6 py-3 rounded-xl bg-[#ECEBFC] text-[#744CDB] flex items-center gap-4">
            <img src={imageProvider.subscription} alt="icon" />
            <Link to="/settings/subscription" className="font-semibold block">
              Subscription
            </Link>
          </li>
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
