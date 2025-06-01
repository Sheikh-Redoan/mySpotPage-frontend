import { DatePicker } from "antd";
import dayjs from "dayjs";
import React from "react";

export default function CalendarToolbar({
  selectedDate,
  onDatePickerChange,
  handleNavButtonClick,
  handleTodayClick,
  currentView,
  handleViewChange,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <button className="cursor-pointer" onClick={() => handleNavButtonClick("prev")}>
          <img src="/src/assets/icons/left_arrow.svg" alt="Left Arrow" />
        </button>
        <DatePicker
          onChange={onDatePickerChange}
          picker="month"
          value={selectedDate}
          format="MMMM YYYY"
          allowClear={false}
          className="w-40"
        />
        <button className="cursor-pointer ml-1" onClick={() => handleNavButtonClick("next")}>
          <img src="/src/assets/icons/right_arrow.svg" alt="Right Arrow" />
        </button>
        <button
          className="text-[#866be7] cursor-pointer text-[14px] font-semibold"
          onClick={handleTodayClick}
        >
          Today
        </button>
      </div>

      <div className="flex border border-gray-200 rounded-lg">
        <button
          className={`px-5 py-1 md:py-1.5 cursor-pointer rounded-md text-sm ${
            currentView === "dayGridMonth" ? "bg-[#866BE7] text-white" : ""
          }`}
          onClick={() => handleViewChange("dayGridMonth")}
        >
          Month
        </button>
        <button
          className={`px-5 py-1.5 cursor-pointer rounded-md text-sm ${
            currentView === "timeGridWeek" ? "bg-[#866BE7] text-white" : ""
          }`}
          onClick={() => handleViewChange("timeGridWeek")}
        >
          Week
        </button>
        <button
          className={`px-5 py-1.5 cursor-pointer rounded-md text-sm ${
            currentView === "timeGridDay" ? "bg-[#866BE7] text-white" : ""
          }`}
          onClick={() => handleViewChange("timeGridDay")}
        >
          Day
        </button>
      </div>
    </div>
  );
}