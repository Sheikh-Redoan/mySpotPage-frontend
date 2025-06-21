import { Suspense, useState } from "react";
import Translate from "../../components/shared/Translate";
import { imageProvider } from "../../lib/imageProvider";
import { cn } from "../../lib/utils";

function NotificationPopup({ notificationButtons, isDrawerOpen = true }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-xs">
      {isDrawerOpen && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            <Suspense fallback={<div>Loading translation...</div>}>
              <Translate text={"Notifications"} />
            </Suspense>
          </h3>
          <h4 className="text-black/60 text-sm underline cursor-pointer">
            <Suspense fallback={<div>Loading translation...</div>}>
              <Translate text={"Mark all as Read"} />
            </Suspense>
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
            <Suspense fallback={<div>Loading translation...</div>}>
              <Translate text={item} />
            </Suspense>
          </button>
        ))}
      </div>

      <div className="  pt-6 space-y-4 min-h-60  ">
        {/* not notificaton found */}
        <div className=" flex-col h-full hidden items-center ">
          <img src={imageProvider.NoNotificationIcon} alt="" />
          <h3 className="text-lg font-medium text-black/90 pt-1">
            <Suspense fallback={<div>Loading translation...</div>}>
              <Translate text={"No notifications yet"} />
            </Suspense>
          </h3>
          <h4 className="text-black/60 text-sm text-center">
            <Suspense fallback={<div>Loading translation...</div>}>
              <Translate
                text={"Check back later for any updates or important messages."}
              />
            </Suspense>
          </h4>
        </div>
        {/* data available */}
        <div className="relative hover:bg-[#F5F4FE] cursor-pointer py-2 px-2 rounded-sm transition-all duration-300 ">
          <h3 className="text-primary01 font-medium">
            <Suspense fallback={<div>Loading translation...</div>}>
              <Translate text={"New booking for Cut + Treatment"} />
            </Suspense>
          </h3>
          <h4 className="text-black/80 pt-1 text-sm">
            <Suspense fallback={<div>Loading translation...</div>}>
              <Translate
                text={
                  "You have a new appointment scheduled. Please check the details and confirm availability."
                }
              />
            </Suspense>
          </h4>

          <p className="text-xs pt-1 text-black/50">
            <Suspense fallback={<div>Loading translation...</div>}>
              <Translate text={"1h ago"} />
            </Suspense>
          </p>
          <span className="w-2 h-2 top-2 right-2 bg-primary01 rounded-full absolute"></span>
        </div>
        <div className="relative hover:bg-[#F5F4FE] cursor-pointer py-2 px-2 rounded-sm transition-all duration-300 ">
          <h3 className="text-black/90 font-medium">
            <Suspense fallback={<div>Loading translation...</div>}>
              <Translate text={"New booking for Cut + Treatment"} />
            </Suspense>
          </h3>
          <h4 className="text-black/80 pt-1 text-sm">
            <Suspense fallback={<div>Loading translation...</div>}>
              <Translate
                text={
                  "You have a new appointment scheduled. Please check the details and confirm availability."
                }
              />
            </Suspense>
          </h4>
          <p className="text-xs pt-1 text-black/50">
            <Suspense fallback={<div>Loading translation...</div>}>
              <Translate text={"1h ago"} />
            </Suspense>
          </p>
          <span className="w-2 h-2 top-2 right-2 bg-transparent rounded-full absolute"></span>
        </div>
        <div className="relative hover:bg-[#F5F4FE] cursor-pointer py-2 px-2 rounded-sm transition-all duration-300 ">
          <h3 className="text-primary01 font-medium">
            <Suspense fallback={<div>Loading translation...</div>}>
              <Translate text={"New booking for Cut + Treatment"} />
            </Suspense>
          </h3>
          <h4 className="text-black/80 pt-1 text-sm">
            <Suspense fallback={<div>Loading translation...</div>}>
              <Translate
                text={
                  "You have a new appointment scheduled. Please check the details and confirm availability."
                }
              />
            </Suspense>
          </h4>
          <p className="text-xs pt-1 text-black/50">
            <Suspense fallback={<div>Loading translation...</div>}>
              <Translate text={"1h ago"} />
            </Suspense>
          </p>
          <span className="w-2 h-2 top-2 right-2 bg-primary01 rounded-full absolute"></span>
        </div>
      </div>
    </div>
  );
}

export default NotificationPopup;
