import { Button } from "antd";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export default function Popup({ name, icon, buttonComp, children, className }) {
  const [toggle, setToggle] = useState(true);
  const popupRef = useRef(null);

  const handlePopup = () => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setToggle((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      {name && (
        <Button type="default" onClick={handlePopup}>
          {icon}
          {name}
        </Button>
      )}

      {buttonComp && (
        <button
          type="text"
          onClick={handlePopup}
          className="hover:!bg-transparent !bg-transparent focus:!bg-transparent active:!WSbg-transparent">
          {buttonComp(handlePopup)}
        </button>
      )}

      <div
        ref={popupRef}
        className={cn(
          "w-[350px] transition-all duration-300 absolute top-0 z-[10] left-1/2 transform -translate-x-1/2 rounded-xl bg-white shadow-lg inset-shadow-sm",
          toggle
            ? "scale-0 opacity-0 invisible"
            : "scale-100 opacity-100 visible",
          className
        )}>
        {name && (
          <div className="flex justify-between items-center border-b border-gray-100 px-3 py-2">
            <h3 className="text-lg font-semibold">{name}</h3>
            <Button type="text" onClick={handlePopup}>
              <X size={20} strokeWidth={1} className="text-gray-600" />
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2 p-4">
          {typeof children === "function" ? children(handlePopup) : children}
        </div>
      </div>
    </div>
  );
}
