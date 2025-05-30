import { FiLogOut } from "react-icons/fi";
import { NavLink, Outlet, useLocation } from "react-router";
import { profileTabs, userManagementTabs } from "../../lib/staticData";

const MyProfileLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs =
    currentPath === "/user-management/my-profile" ||
    currentPath === "/user-management/my-profile/security"
      ? profileTabs
      : userManagementTabs;

  return (
    <div className="flex h-[calc(100vh-73px)] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white  left-[65px] top-[73px] shadow-md py-6 px-5 flex flex-col justify-between">
        <ul className="space-y-3">
          {tabs.map((tab) => {
            return (
              <NavLink key={tab.id} to={tab.link}>
                {({ isActive }) => (
                  <li
                    className={`px-3 py-3 my-4 rounded-xl flex items-center gap-4 ${
                      isActive
                        ? "bg-[#ECEBFC] text-[#744CDB]"
                        : "hover:bg-gray-100 text-[#242528]"
                    }`}>
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
      <main className=" flex-1 bg-[#F9FAFC] h-full p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MyProfileLayout;
