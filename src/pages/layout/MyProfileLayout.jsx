import { FiLogOut } from "react-icons/fi";
import { NavLink, Outlet, useLocation } from "react-router";
import {
  dataManagementTabs,
  profileTabs,
  userManagementTabs,
} from "../../lib/staticData";
import { cn } from "../../lib/utils";

const MyProfileLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const profilePaths = [
    "/profile-management/my-profile/basic-information",
    "/profile-management/my-profile/security",
  ];

  const dataManagementPaths = [
    "/data-management/service-classification",
    "/data-management/menu-category",
  ];

  let tabs;

  if (profilePaths.includes(currentPath)) {
    tabs = profileTabs;
  } else if (dataManagementPaths.includes(currentPath)) {
    tabs = dataManagementTabs;
  } else {
    tabs = userManagementTabs;
  }

  // const tabs =
  //   currentPath === "/profile-management/my-profile/basic-information" ||
  //   currentPath === "/profile-management/my-profile/security"
  //     ? profileTabs
  //     : userManagementTabs;

  return (
    <div className="flex min-h-[calc(100vh-80px)] overflow-hidden bg-[#F9FAFC] ">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white  left-[65px] top-[73px] shadow-md py-6 px-5 flex flex-col justify-between">
        <ul className="space-y-3">
          {tabs.map((tab) => {
            return (
              <NavLink key={tab.id} to={tab.link} end>
                {({ isActive }) => (
                  <li
                    className={cn(
                      isActive
                        ? "bg-[#ECEBFC] text-[#744CDB]"
                        : "hover:bg-gray-100 text-[#242528]",
                      "px-3 py-3 my-4 rounded-xl flex items-center gap-4 transition duration-300 ease-in-out"
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
        <button className="flex items-center gap-2 px-3 text-red-500 cursor-pointer">
          <FiLogOut className="text-lg" />
          Sign out
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MyProfileLayout;
