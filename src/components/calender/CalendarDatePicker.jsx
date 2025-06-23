import { Calendar, ConfigProvider } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export default function CalendarDatePicker({ month = 3 }) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [value, setValue] = useState(dayjs());
  const [selectedValue, setSelectedValue] = useState(dayjs(currentDate));

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const dateFullCellRender = (current) => {
    // Check if date belongs to current month view
    const isCurrentMonth =
      current.month() === value.month() && current.year() === value.year();

    const isSelected = current.isSame(selectedValue, "day");
    const isToday = currentDate.isSame(current, "day");

    return (
      <div
        className={cn(
          "relative flex items-center justify-center",
          "h-8 w-8 sm:h-12 sm:w-12 rounded-full cursor-pointer",
          "text-xs transition-colors duration-200 ease-in-out",
          // Base text color based on month
          isCurrentMonth ? "text-gray-800" : "text-gray-400",
          // Apply highlight for selected or today
          {
            "bg-primary01 !text-white shadow-lg": isSelected || isToday,
            "hover:bg-gray-100": isCurrentMonth && !isSelected && !isToday,
          }
        )}
        onClick={() => onSelect(current)}>
        {current.date()}
      </div>
    );
  };

  useEffect(() => {
    setCurrentDate(dayjs().add(month, "month"));
    setValue(dayjs().add(month, "month"));
  }, [month]);

  return (
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
          value={value}
          selectedValue={selectedValue}
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
             [&_.ant-picker-content_thead]:hidden
           "
        />
      </ConfigProvider>
    </div>
  );
}
