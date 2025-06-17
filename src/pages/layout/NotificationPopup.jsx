import { useState } from "react";
import { imageProvider } from "../../lib/imageProvider";
import { cn } from "../../lib/utils";

function NotificationPopup({ notificationButtons, isDrawerOpen = true }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-xs">
      {isDrawerOpen && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <h4 className="text-black/60 text-sm underline cursor-pointer">
            Mark all as Read
          </h4>
        </div>
      )}

      <div
        className={cn("flex items-center gap-2", {
          "pt-4": isDrawerOpen,
        })}>
        {notificationButtons.map((item, index) => (
          <button
            onClick={() => setActiveTab(index)}
            key={index}
            className={`px-4 py-2 cursor-pointer rounded-xl text-sm ${
              index === activeTab ? "bg-primary01 text-white" : "text-black/90"
            }`}>
            {item}
          </button>
        ))}
      </div>

      <div className="  pt-6 space-y-4 min-h-60  ">
        {/* not notificaton found */}
        <div className=" flex-col h-full hidden items-center ">
          <img src={imageProvider.NoNotificationIcon} alt="" />
          <h3 className="text-lg font-medium text-black/90 pt-1">
            No notifications yet
          </h3>
          <h4 className="text-black/60 text-sm text-center">
            Check back later for any updates or important messages.{" "}
          </h4>
        </div>
        {/* data available */}
        <div className="relative hover:bg-[#F5F4FE] cursor-pointer py-2 px-2 rounded-sm transition-all duration-300 ">
          <h3 className="text-primary01 font-medium">
            New booking for Cut + Treatment
          </h3>
          <h4 className="text-black/80 pt-1 text-sm">
            You have a new appointment scheduled. Please check the details and
            confirm availability.
          </h4>
          <p className="text-xs pt-1 text-black/50">1h ago</p>
          <span className="w-2 h-2 top-2 right-2 bg-primary01 rounded-full absolute"></span>
        </div>
        <div className="relative hover:bg-[#F5F4FE] cursor-pointer py-2 px-2 rounded-sm transition-all duration-300 ">
          <h3 className="text-black/90 font-medium">
            New booking for Cut + Treatment
          </h3>
          <h4 className="text-black/80 pt-1 text-sm">
            You have a new appointment scheduled. Please check the details and
            confirm availability.
          </h4>
          <p className="text-xs pt-1 text-black/50">1h ago</p>
          <span className="w-2 h-2 top-2 right-2 bg-transparent rounded-full absolute"></span>
        </div>
        <div className="relative hover:bg-[#F5F4FE] cursor-pointer py-2 px-2 rounded-sm transition-all duration-300 ">
          <h3 className="text-primary01 font-medium">
            New booking for Cut + Treatment
          </h3>
          <h4 className="text-black/80 pt-1 text-sm">
            You have a new appointment scheduled. Please check the details and
            confirm availability.
          </h4>
          <p className="text-xs pt-1 text-black/50">1h ago</p>
          <span className="w-2 h-2 top-2 right-2 bg-primary01 rounded-full absolute"></span>
        </div>
      </div>
    </div>
  );
}

export default NotificationPopup;
