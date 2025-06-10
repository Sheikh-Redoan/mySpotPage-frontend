// src/pages/layout/TopNavbar.jsx (Revised)
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import UserMenuPopUp from "../../components/admin/UserMenuPopUp";
import Popup from "../../components/shared/Popup";
import { imageProvider } from "../../lib/imageProvider";
import NotificationPopup from "./NotificationPopup";
import { Menu } from "lucide-react"; // Import Menu icon

function TopNavbar({ activeTab, onMenuClick }) {
  const [toggle, setToggle] = useState(true);
  const popupRef = useRef(null);
  const iconRef = useRef(null);
  const location = useLocation();
  const pathname = location?.pathname?.split("/");

  const tab = activeTab
    ? activeTab?.split("-").join(" ")
    : pathname[2]?.split("-").join(" ");

  const notificationButtons = ["All", "Read", "Unread"];

  const handleNotification = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setToggle(true);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between border-b border-black/5 items-center px-6 py-0 bg-white z-[6]">
      {/* Position TopNavbar based on screen size */}
      <div className="fixed top-0 left-0 right-0 h-fit md:relative md:w-full flex justify-between items-center px-6 py-3 z-[9999999] bg-white">
        <div className="flex items-center gap-4">
          {/* Hamburger icon for mobile, hidden on desktop */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Open menu"
          >
            <Menu size={24} className="text-gray-700" />
          </button>
          <h3 className="font-semibold text-lg capitalize  max-[475px]:text-[14px]">
            {tab ? tab : "Dashboard"}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <div
            className={`relative transition-all duration-300 ${
              toggle ? "" : "bg-primary01"
            } p-2 rounded-full`}>
            <img
              ref={iconRef}
              onClick={handleNotification}
              className="cursor-pointer filter "
              src={
                toggle
                  ? imageProvider.Notification
                  : imageProvider.NotificationWhite
              }
              alt="Notification Bell"
            />

            <NotificationPopup
              notificationButtons={notificationButtons}
              popupRef={popupRef}
              toggle={toggle}
            />
          </div>

          <Popup
            buttonComp={() => (
              <div className="cursor-pointer">
                <img
                  className="w-10 h-10 rounded-full bg-white"
                  src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                  alt="User Avatar"
                />
              </div>
            )}
            className="-left-18 top-18 w-56 ">
            {(handlePopup) => <UserMenuPopUp handlePopup={handlePopup} />}
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;