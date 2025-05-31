// src/components/seller/StaffCardDropdown.jsx
import React, { useRef, useEffect } from "react";
import { LuPencil, LuLock, LuTrash } from "react-icons/lu";
import { VscUnlock } from "react-icons/vsc"; // Assuming VscUnlock is preferred for activate icon

const StaffCardDropdown = ({ onClose, onEdit, onToggleStatus, onRemove, staffStatus }) => {
  const dropdownRef = useRef(null);

  const isActive = staffStatus === "Online" || staffStatus === "Break";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-36 p-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
    >
      <button
        onClick={() => {
          onEdit();
          onClose(); // Close dropdown after action
        }}
        className="self-stretch w-full h-8 px-2 py-1 flex items-center gap-2 rounded hover:bg-violet-50 transition-colors duration-150 text-neutral-800 text-sm font-normal font-['Golos_Text'] leading-tight"
      >
        <LuPencil className="w-4 h-4 text-neutral-800" />
        <span className="flex-1 text-left">Edit</span>
      </button>

      <button
        onClick={() => {
          onToggleStatus(); // This will now trigger the modal logic in parent
          onClose(); // Close dropdown after action
        }}
        className="self-stretch w-full h-8 px-2 py-1 flex items-center gap-2 rounded hover:bg-gray-100 transition-colors duration-150 text-neutral-800 text-sm font-normal font-['Golos_Text'] leading-tight"
      >
        {isActive ? (
          <LuLock className="w-4 h-4 text-neutral-800" />
        ) : (
          <VscUnlock className="w-4 h-4 text-neutral-800" />
        )}
        <span className="flex-1 text-left">
          {isActive ? "Inactivate" : "Activate"}
        </span>
      </button>

      <button
        onClick={() => {
          onRemove();
          onClose(); // Close dropdown after action
        }}
        className="self-stretch w-full h-8 px-2 py-1 flex items-center gap-2 rounded hover:bg-red-50 transition-colors duration-150 text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight"
      >
        <LuTrash className="w-4 h-4 text-red-500" />
        <span className="flex-1 text-left">Remove</span>
      </button>
    </div>
  );
};

export default StaffCardDropdown;