// src/pages/layout/TopNavbar.jsx (Revised)
import { Drawer, Popover } from "antd";
import { ArrowLeft, Menu } from "lucide-react"; // Import Menu icon
import { Suspense, useState } from "react";
import { useLocation } from "react-router";
import UserMenuPopUp from "../../components/admin/UserMenuPopUp";
import Translate from "../../components/shared/Translate";
import { imageProvider } from "../../lib/imageProvider";
import { cn } from "../../lib/utils";
import NotificationPopup from "./NotificationPopup";
import { SquareX } from "lucide-react";
import { motion } from 'framer-motion';

function TopNavbar({ activeTab, onMenuClick, isMobileSidebarOpen }) {
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const location = useLocation();
  const pathname = location?.pathname?.split("/");

  const tab = activeTab
    ? activeTab?.split("-").join(" ")
    : pathname[2]?.split("-").join(" ");

  const notificationButtons = ["All", "Read", "Unread"];

  const handleNotification = () => {
    setToggle(!toggle);
  };

  const handlePopup = () => {
    setIsUserOpen(!isUserOpen);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex justify-between border-b border-black/5 items-center px-6 py-0 bg-white z-50">
      {/* Position TopNavbar based on screen size */}
      <div className="fixed top-0 left-0 right-0 h-fit md:relative md:w-full flex justify-between items-center py-3 bg-white z-50">

        <div className="flex items-center gap-4">
          {/* Hamburger icon for mobile, hidden on desktop */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Open menu">
            <motion.div
              key={isMobileSidebarOpen ? 'x' : 'menu'}
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: isMobileSidebarOpen ? 90 : -90, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {isMobileSidebarOpen ? (
                <SquareX size={24} className="text-gray-700 " />
              ) : (
                <Menu size={24} className="text-gray-700 rotate-90" />
              )}
            </motion.div>
          </button>

          <h3 className="font-semibold text-lg capitalize  max-[700px]:text-[14px]">
            <Suspense fallback={<div>Loading translation...</div>}>
              <Translate text={tab ? tab : "Dashboard"} />
            </Suspense>
          </h3>

        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className={cn(
              "!rounded-full w-8 h-8 sm:w-10 sm:h-10 grid place-items-center transition-colors duration-200 lg:!hidden"
            )}
            onClick={showDrawer}>
            <img
              className="cursor-pointer filter w-4 h-4 sm:w-5 sm:h-5 object-contain"
              src={
                !open
                  ? imageProvider.Notification
                  : imageProvider.NotificationWhite
              }
              alt="Notification Bell"
            />
          </button>
          <Drawer
            title="Notifications"
            placement="right"
            width="100%"
            onClose={onClose}
            open={open}
            closeIcon={<ArrowLeft size={20} strokeWidth={1.5} />}
            extra={
              <button type="button" onClick={onClose}>
                <h4 className="text-black/60 text-sm underline cursor-pointer">
                  <Suspense fallback={<div>Loading translation...</div>}>
                    <Translate text={"Mark all as Read"} />
                  </Suspense>
                </h4>
              </button>
            }
            className="lg:!hidden">
            <NotificationPopup
              notificationButtons={notificationButtons}
              isDrawerOpen={false}
            />
          </Drawer>
          <Popover
            trigger={["click"]}
            placement="bottomRight"
            open={!toggle}
            onOpenChange={handleNotification}
            arrow={false}
            content={
              <div className={cn("w-full md:max-w-xs sm:w-80 p-2")}>
                <NotificationPopup notificationButtons={notificationButtons} />
              </div>
            }
            className="!hidden lg:!block">
            <button
              onClick={handleNotification}
              type="button"
              className={cn(
                "!rounded-full w-8 h-8 sm:w-10 sm:h-10 grid place-items-center transition-colors duration-200",
                {
                  "!bg-primary01": !toggle,
                }
              )}>
              <img
                className="cursor-pointer filter w-4 h-4 sm:w-5 sm:h-5 object-contain"
                src={
                  toggle
                    ? imageProvider.Notification
                    : imageProvider.NotificationWhite
                }
                alt="Notification Bell"
              />
            </button>
          </Popover>
          {/* User Menu */}
          <Popover
            trigger={["click"]}
            placement="bottomRight"
            open={isUserOpen}
            onOpenChange={handlePopup}
            arrow={false}
            content={<UserMenuPopUp handlePopup={handlePopup} />}>
            <button className="cursor-pointer">
              <img
                className="w-10 h-10 rounded-full bg-white"
                src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                alt="User Avatar"
              />
            </button>
          </Popover>

        </div>

      </div>

    </div>
  );
}

export default TopNavbar;
