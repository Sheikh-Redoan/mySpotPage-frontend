// src/pages/layout/TopNavbar.jsx (Revised)
import { Popover } from "antd";
import { Menu } from "lucide-react"; // Import Menu icon
import { useState } from "react";
import { useLocation } from "react-router";
import UserMenuPopUp from "../../components/admin/UserMenuPopUp";
import { imageProvider } from "../../lib/imageProvider";
import { cn } from "../../lib/utils";
import NotificationPopup from "./NotificationPopup";

function TopNavbar({ activeTab, onMenuClick }) {
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

  return (
    <div className="flex justify-between border-b border-black/5 items-center px-6 py-0 bg-white z-[6]">
            {/* Position TopNavbar based on screen size */}
      <div className="fixed top-0 left-0 right-0 h-fit md:relative md:w-full flex justify-between items-center px-6 py-3 bg-white">
           
        <div className="flex items-center gap-4">
          {/* Hamburger icon for mobile, hidden on desktop */}       
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Open menu">
                        <Menu size={24} className="text-gray-700" />
          </button>
           
          <h3 className="font-semibold text-lg capitalize  max-[475px]:text-[14px]">
                        {tab ? tab : "Dashboard"}       
          </h3>
             
        </div>
               
        <div className="flex items-center gap-4">
          <Popover
            trigger={["click"]}
            placement="bottomRight"
            open={!toggle}
            onOpenChange={handleNotification}
            arrow={false}
            content={
              <div className="w-full md:max-w-xs sm:w-80 p-2">
                <NotificationPopup notificationButtons={notificationButtons} />
              </div>
            }>
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
                className="cursor-pointer filter w-4 h-4 sm:w-5 sm:h-5"
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
