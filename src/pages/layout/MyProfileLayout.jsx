import { FiLogOut } from "react-icons/fi";
import { NavLink, Outlet, useLocation } from "react-router";
import { cn } from "../../lib/utils";

const MyProfileLayout = ({ tabs = [] }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const profilePaths = [
    "/admin/profile-management/my-profile/basic-information",
    "/admin/profile-management/my-profile/security",
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] overflow-hidden bg-[#F9FAFC] ">
      {/* Sidebar */}
      <aside className="md:w-[280px] bg-white  left-[65px] top-[73px] shadow-md py-6 px-5 flex flex-col justify-between">
        <ul className="space-y-3 flex md:flex-col overflow-x-auto whitespace-nowrap gap-4 md:gap-0">
          {tabs.map((tab) => {
            return (
              <NavLink key={tab.id} to={tab.link} end>
                {({ isActive }) => (
                  <li
                    className={cn(
                      isActive
                        ? "bg-[#ECEBFC] text-[#744CDB]"
                        : "hover:bg-gray-100 text-[#242528]",
                      "px-3 pr-10 py-3 rounded-xl flex items-center gap-2 md:gap-4 transition duration-300 ease-in-out  md:w-56 text-sm md:text-base"
                    )}>
                    {isActive ? (
                      <img src={tab.imagePink} alt="" />
                    ) : (
                      <img src={tab.imageWhite} alt="" />
                    )}
                    <p className=" font-semibold block">{tab.name}</p>
                  </li>
                )}
              </NavLink>
            );
          })}
        </ul>
        {profilePaths.includes(currentPath) && (
          <button className="flex items-center gap-2 px-3 text-red-500 cursor-pointer">
            <FiLogOut className="text-lg" />
            Sign out
          </button>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MyProfileLayout;
