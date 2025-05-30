// src/components/StaffCard.jsx
import React from "react";
import MoreOptionsIcon from "./MoreOptionsIcon";

const StaffCard = ({ staff, onSelectStaff }) => {
  const statusColor = {
    Online: "bg-green-500",
    Offline: "bg-gray-400",
    Break: "bg-amber-400",
  };

  return (
    <div
      className="w-80 p-4 bg-white rounded-lg border border-gray-200 flex flex-col justify-start items-start gap-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => onSelectStaff(staff)}
    >
      <div className="self-stretch flex justify-between items-start gap-2">
        <div className="flex-1 flex flex-col justify-center items-center gap-3">
          <div className="w-14 h-14 relative rounded-full border border-white">
            <img
              src={staff.image}
              alt={staff.name}
              className="w-full h-full object-cover rounded-full"
            />
            <div
              className={`w-3.5 h-3.5 absolute bottom-0 right-0 rounded-full border border-white ${
                statusColor[staff.status]
              }`}
              title={staff.status}
            />
          </div>
          <div className="self-stretch flex flex-col justify-center items-center gap-0.5">
            <h3 className="text-center text-gray-950 text-base font-semibold font-['Golos_Text'] leading-normal">
              {staff.name}
            </h3>
            <div className="inline-flex justify-start items-start gap-2">
              {staff.roles.map((role, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-violet-50 rounded text-violet-500 text-xs font-medium font-['Golos_Text'] leading-none"
                >
                  {role}
                </span>
              ))}
            </div>
            <p className="self-stretch text-center text-gray-500 text-sm font-normal font-['Golos_Text'] leading-tight">
              {staff.position}
            </p>
          </div>
        </div>
        <button className="flex justify-center items-center w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors duration-200">
          <MoreOptionsIcon />
        </button>
      </div>
    </div>
  );
};

export default StaffCard;