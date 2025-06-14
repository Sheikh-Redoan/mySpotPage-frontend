// src/layouts/MainLayout.jsx
import { imageProvider } from "@/lib/imageProvider";
import { Tooltip } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { tabs } from "../lib/staticData";
import { cn } from "../lib/utils";
import TopNavbar from "../pages/layout/TopNavbar";
import { selectUser } from "../redux/features/userSlice";
import "../styles/antdCustom.css";

function MainLayout({ activeTab }) {
  // State for desktop sidebar collapse/expand
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  // State for mobile sidebar open/close
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const user = useSelector(selectUser);
  const location = useLocation();

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768 && isMobileSidebarOpen) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileSidebarOpen]);

  useEffect(() => {
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  }, [location.pathname]);

  const handleToggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleToggleDesktopSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="relative font-golos h-screen]">
      {/* Overlay for mobile sidebar when open */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[7] md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "p-4 flex flex-col justify-between top-0 left-0 transition-all duration-300 h-screen fixed bg-[#F5F4FE] z-50",
          // Mobile behavior
          "w-64",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop behavior
          "md:translate-x-0",
          isSidebarCollapsed ? "md:w-[74px]" : "md:w-64"
        )}>
        {/* Desktop Sidebar Toggle Button (Close) */}
        <button
          onClick={handleToggleDesktopSidebar}
          className={cn(
            "size-9 flex justify-center items-center p-2 cursor-pointer rounded-full absolute top-3 right-1 bg-primary01 transition-all duration-300",
            isSidebarCollapsed ? "opacity-0 invisible" : "opacity-100 visible",
            "hidden md:flex"
          )}
          aria-label={
            isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }>
          <ChevronLeft size={18} className="text-white" />
        </button>

        {/* Sidebar Top Section */}
        <div>
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/my_spot_page_favicon.png"
                alt="My Spot Favicon"
                className="w-8 h-8"
              />
              <img
                className={cn(
                  "transition-all duration-300",
                  isSidebarCollapsed
                    ? "w-0 opacity-0"
                    : "w-16 ml-2 opacity-100",
                  "md:block"
                )}
                src={imageProvider.TextLogo}
                alt="My Spot Logo Text"
              />
            </Link>
          </div>

          {/* Tabs */}
          <nav className="pt-6">
            <ul className="flex flex-col gap-4">
              {tabs[user?.role]?.map((tab) => (
                <li key={tab.id}>
                  <Tooltip
                    placement="right"
                    title={isSidebarCollapsed && isDesktop ? tab.name : null}
                    color="white"
                    trigger="hover">
                    <NavLink
                      to={tab.link}
                      end={tab?.end}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center transition-colors duration-300 rounded-lg hover:bg-primary01/10 hover:text-primary01",
                          {
                            "bg-primary01 text-white hover:bg-primary01 hover:text-white":
                              isActive,
                            "p-2": !isSidebarCollapsed,
                          }
                        )
                      }>
                      {({ isActive }) => (
                        <>
                          <div
                            className={cn(
                              "flex items-center justify-center w-10 h-10 transition-colors duration-300 rounded-xl cursor-pointer",
                              {
                                "bg-primary01": isActive,
                              }
                            )}>
                            <img
                              src={isActive ? tab.imageWhite : tab.imagePink}
                              alt=""
                              className="w-5 h-5 object-contain"
                            />
                          </div>
                          <span
                            className={cn(
                              "ml-2 text-sm transition-all duration-300",
                              isSidebarCollapsed ? "hidden" : "block"
                            )}>
                            {tab.name}
                          </span>
                        </>
                      )}
                    </NavLink>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Desktop Sidebar Toggle Button (Open) */}
        <button
          onClick={handleToggleDesktopSidebar}
          className={cn(
            "size-9 flex justify-center items-center p-2 rounded-full cursor-pointer bg-primary01 transition-all duration-300",
            isSidebarCollapsed ? "opacity-100" : "opacity-0 -translate-x-6",
            "hidden md:flex"
          )}
          aria-label="Expand sidebar">
          <ChevronRight className="text-white" />
        </button>
      </aside>

      {/* Main content area */}
      <main
        className={cn(
          "flex-1 min-h-screen h-full bg-[#F9FAFC] transition-all duration-300",
          isSidebarCollapsed ? "md:ml-[74px]" : "md:ml-64"
        )}>
        <TopNavbar
          activeTab={activeTab}
          onMenuClick={handleToggleMobileSidebar}
        />
        <div className="pt-20 md:pt-0  pb-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
