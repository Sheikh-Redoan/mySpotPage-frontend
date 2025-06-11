import { DatePicker, Segmented } from "antd";
import MultipleSelector from "../shared/MultipleSelector";

export default function CalendarToolbar({
  selectedDate,
  onDatePickerChange,
  handleNavButtonClick,
  handleTodayClick,
  currentView,
  handleViewChange,
  applyFilter,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-4">
          <button
            className="cursor-pointer"
            onClick={() => handleNavButtonClick("prev")}>
            <img src="/src/assets/icons/left_arrow.svg" alt="Left Arrow" />
          </button>
          <DatePicker
            onChange={onDatePickerChange}
            picker="month"
            value={selectedDate}
            format="MMMM YYYY"
            allowClear={false}
            className="w-40 h-9"
          />
          <button
            className="cursor-pointer ml-1"
            onClick={() => handleNavButtonClick("next")}>
            <img src="/src/assets/icons/right_arrow.svg" alt="Right Arrow" />
          </button>
          <button
            className="text-[#866be7] cursor-pointer text-[14px] font-semibold"
            onClick={handleTodayClick}>
            Today
          </button>
        </div>

        {/* Filter Actions */}
        {applyFilter && (
          <div className="md:ml-4 w-xs">
            <MultipleSelector
              data={["All Staffs", "My Staffs", "Admins", "Managers", "Staffs"]}
              name={"calender-filter"}
            />
          </div>
        )}
      </div>

      <Segmented
        options={["month", "week", "day"]}
        value={currentView}
        onChange={handleViewChange}
        size="large"
        className="border border-gray-300"
      />
    </div>
  );
}
