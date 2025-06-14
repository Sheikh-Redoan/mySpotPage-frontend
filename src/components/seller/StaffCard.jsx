// src/components/seller/StaffCard.jsx
import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaMoon, FaCircle } from "react-icons/fa";
import StaffCardDropdown from "./StaffCardDropdown";

const StaffCard = ({ staff, onSelectStaff, isActive, onEdit, onToggleStatus, onRemove }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const statusIcon = {
    Online: <FaCircle className="text-green-500" size={10} />,
    Offline: <FaCircle className="text-gray-400" size={10} />,
    Break: <FaMoon className="text-amber-400" size={10} />,
  };

  const handleMoreOptionsClick = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  return (
    <div
      className={`relative w-80 p-4 bg-white rounded-lg border max-[700px]:w-full ${
        isActive ? "bg-violet-50 border-violet-500" : "border-gray-200"
      } flex flex-col justify-start items-start gap-4 cursor-pointer hover:bg-violet-50 hover:border-violet-500 transition-all duration-200`}
      onClick={() => onSelectStaff(staff)}
    >
      <div className="self-stretch flex justify-between items-start gap-2">
        <div className="flex-1 flex flex-col justify-center items-center gap-3 max-[700px]:flex-row max-[700px]:gap-2 max-[700px]:items-center max-[700px]:justify-start">
          <div className="w-14 h-14 relative rounded-full border border-white">
            <img
              src={staff.image}
              alt={staff.name}
              className="w-full h-full object-cover rounded-full"
            />
            <div
              className="absolute bottom-0 right-0 flex items-center justify-center w-4 h-4 bg-white rounded-full border border-white"
              title={staff.status}
            >
              {statusIcon[staff.status]}
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-center items-center gap-0.5">
            <h3 className="text-center text-gray-950 text-base font-semibold font-['Golos_Text'] leading-normal max-[700px]:text-sm max-[700px]:font-medium max-[700px]:leading-tight">
              {staff.name}
            </h3>
            <div className="inline-flex justify-start items-start gap-2 max-[700px]:text-xs">
              {staff.roles.map((role, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-violet-50 rounded text-violet-500 text-xs font-medium font-['Golos_Text'] leading-none"
                >
                  {role}
                </span>
              ))}
            </div>
            <p className="self-stretch text-center text-gray-500 text-sm font-normal font-['Golos_Text'] leading-tight  max-[700px]:text-xs max-[700px]:font-light">
              {staff.position}
            </p>
          </div>
        </div>
        <button
          className="flex justify-center items-center w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          onClick={handleMoreOptionsClick}
        >
          <HiOutlineDotsVertical className="w-full h-full" />
        </button>
      </div>

      {showDropdown && (
        <StaffCardDropdown
          onClose={() => setShowDropdown(false)}
          staffStatus={staff.status}
          onEdit={() => onEdit(staff.id)}
          onToggleStatus={() => onToggleStatus(staff.id)}
          onRemove={() => onRemove(staff.id)}
        />
      )}
    </div>
  );
};

export default StaffCard;