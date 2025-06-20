import { Calendar, ConfigProvider } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export default function CalendarDatePicker({ month = 3 }) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [value, setValue] = useState(dayjs());
  const [selectedValue, setSelectedValue] = useState(dayjs("2025-06-06"));

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  // Custom cell rendering to achieve the desired look
  const dateFullCellRender = (current) => {
    const isCurrentMonth =
      current.month() === value.month() && current.year() === value.year();
    const isSelected = current.isSame(selectedValue, "day");

    return (
      <div
        className={cn(
          "relative flex items-center justify-center",
          "h-8 w-8 sm:h-12 sm:w-12 rounded-full cursor-pointer",
          "text-xs transition-colors duration-200 ease-in-out",
          {
            "bg-primary01 text-white shadow-lg":
              isSelected || currentDate.isSame(current, "day"),
            "text-gray-800 hover:bg-gray-100": !isSelected && isCurrentMonth,
            "text-gray-400 hover:bg-gray-100": !isSelected && !isCurrentMonth,
          }
        )}
        onClick={() => onSelect(current)} // Handle click on the custom cell
      >
        {current.date()}
      </div>
    );
  };

  useEffect(() => {
    setCurrentDate(currentDate.add(month, "month"));
  }, [month]);

  return (
    // <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 font-inter">
    <div className="w-full mt-5">
      {/* Custom weekday header display */}
      <div className="grid grid-cols-7 text-center text-gray-400 mb-4 text-xs">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>

      {/* Ant Design Calendar component */}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#8B5CF6",
            controlItemBgHover: "#F3F4F6",
            controlItemBgActive: "#EDE9FE",
            controlItemBgSelected: "#8B5CF6",
            borderRadius: 8,
          },
          components: {
            Calendar: {
              fullScreen: false,
              itemActiveBg: "transparent",
              itemSelectedBg: "transparent",
              controlItemBgHover: "transparent",
              controlItemBgActive: "transparent",
            },
          },
        }}>
        <Calendar
          value={currentDate}
          onSelect={onSelect}
          onPanelChange={onPanelChange}
          fullscreen={false}
          headerRender={() => null}
          fullCellRender={dateFullCellRender}
          className="
             [&_.ant-picker-panel]:border-none
             [&_.ant-picker-body]:p-0
             [&_.ant-picker-content]:w-full
             [&_.ant-picker-content]:table-fixed
             [&_.ant-picker-cell]:p-0
             [&_.ant-picker-cell-inner]:p-0
             [&_.ant-picker-cell-inner]:!w-auto
             [&_.ant-picker-cell-inner]:!h-auto
             [&_.ant-picker-header]:hidden
             [&_.ant-picker-content_thead]:hidden /* Added to hide Ant Design's default day row */
           "
        />
      </ConfigProvider>
    </div>
    // </div>
  );
}
