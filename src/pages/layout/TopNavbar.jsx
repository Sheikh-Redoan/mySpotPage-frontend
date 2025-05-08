import { useEffect, useRef, useState } from "react";
import { imageProvider } from "../../lib/imageProvider";
import NotificationPopup from "./NotificationPopup";
function TopNavbar({ currentTab }) {
  const [toggle, setToggle] = useState(true);
  const popupRef = useRef(null);
  const iconRef = useRef(null);

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
    <div className="flex justify-between border-b border-black/5 items-center px-6 py-4 absolute  top-0 left-0 right-0">
      <h3 className="font-semibold text-lg">{currentTab}</h3>
      <div className="flex items-center gap-4">
        <div
          className={`relative transition-all duration-300 ${
            toggle ? "" : "bg-primary01"
          } p-2 rounded-full`}
        >
          <img
            ref={iconRef}
            onClick={handleNotification}
            className="cursor-pointer filter "
            src={
              toggle
                ? imageProvider.Notification
                : imageProvider.NotificationWhite
            }
            alt=""
          />

          <NotificationPopup
            notificationButtons={notificationButtons}
            popupRef={popupRef}
            toggle={toggle}
          />
        </div>
        <div className="cursor-pointer">
          <img
            className="w-10 h-10 rounded-full bg-white"
            src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
