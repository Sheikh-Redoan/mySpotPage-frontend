import { Calendar, ConfigProvider } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { cn } from "../../lib/utils";

export default function CalendarDatePicker() {
  // Correct initialization of useState hooks
  const [value, setValue] = useState(dayjs("2025-06-06")); // Initialize with the selected date from the image (June 6, 2025)
  const [selectedValue, setSelectedValue] = useState(dayjs("2025-06-06"));

  // Handler for when a date is selected or the panel changes
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
          "h-10 w-10 sm:h-12 sm:w-12 rounded-full cursor-pointer",
          "text-xs transition-colors duration-200 ease-in-out",
          {
            "bg-primary01 text-white shadow-lg": isSelected,
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

  // Custom header rendering to make 'S M T W T F S'
  const headerRender = ({ value, type, onChange, onTypeChange }) => {
    // Ant Design's Calendar component naturally renders the weekday headers.
    // We only need to customize the weekday labels if they were different.
    // For "S M T W T F S", Ant Design does this by default or can be configured via locale.
    return null; // Return null to use Ant Design's default header (which includes weekday names)
  };

  return (
    // <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 font-inter">
    <div className="w-full mt-5">
      {/* Custom weekday header display */}
      <div className="grid grid-cols-7 text-center text-gray-400 mb-4 text-xs">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>

      {/* Ant Design Calendar component */}
      <ConfigProvider
        theme={{
          token: {
            // Primary color for Ant Design components
            colorPrimary: "#8B5CF6", // Purple-600

            // Customize calendar specific tokens
            controlItemBgHover: "#F3F4F6", // Light gray hover background for days
            controlItemBgActive: "#EDE9FE", // Light purple active background (not for selected day)
            controlItemBgSelected: "#8B5CF6", // Background for actual selected day (if using AntD's default selection)
            borderRadius: 8, // General border radius
          },
          components: {
            Calendar: {
              // Remove default border and shadow to allow custom container styling
              fullScreen: false, // Ensure it's not full screen mode
              itemActiveBg: "transparent", // Make default active background transparent
              itemSelectedBg: "transparent", // Make default selected background transparent
              controlItemBgHover: "transparent", // Ensure hover doesn't interfere with custom cell
              controlItemBgActive: "transparent", // Ensure active doesn't interfere with custom cell

              // Hide the default Ant Design header and footer navigation if we're fully custom
              // Or selectively hide parts. For the exact design, we want to hide most of it
              // and rely on our custom cell rendering for interaction.
              // We'll primarily use the dateFullCellRender.
            },
          },
        }}>
        <Calendar
          value={value}
          onSelect={onSelect}
          onPanelChange={onPanelChange}
          fullscreen={false} // Ensure it's not fullscreen
          headerRender={headerRender} // Use custom header render to hide default navigation
          fullCellRender={dateFullCellRender} // Apply custom cell styling
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
