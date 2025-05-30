// src/components/QuickViewPanel.jsx
import React from "react";
import QuickViewIcon from "./QuickViewIcon";

const QuickViewPanel = () => {
  return (
    <div className="w-80 p-4 bg-white rounded-xl border border-gray-200 flex flex-col justify-center items-center gap-4 text-center h-full">
      <div className="flex flex-col justify-center items-center gap-3">
        <QuickViewIcon />
        <div className="flex flex-col justify-start items-center gap-1">
          <h3 className="text-gray-950 text-sm font-semibold font-['Golos_Text'] leading-tight">
            Select a Staff Member for Quick View
          </h3>
          <p className="text-gray-500 text-xs font-normal font-['Golos_Text'] leading-none">
            Please choose a staff member to quickly view their services,
            schedule, and expertise.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickViewPanel;