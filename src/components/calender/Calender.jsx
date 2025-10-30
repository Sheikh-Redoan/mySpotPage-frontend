import dayjs from "dayjs";
import "dayjs/locale/en"; // Or your preferred locale
import { useState } from "react";
import { useSearchParams } from "react-router";
import { cn } from "../../lib/utils";
import CalendarToolbar from "../reuseableComponent/CalendarToolbar";
import DayView from "./DayView";
import MonthView from "./MonthView";
import WeekView from "./WeekView";

export default function Calender({
  selectTimeFromProvider = false,
  events,
  resources,
  applyFilter,
  solo = true,
}) {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "month"; // Default to 'month' view if not specified
  // State for the currently displayed date, adjusted based on view
  const [currentDate, setCurrentDate] = useState(dayjs(Date.now())); // Start with the day view date

  // Helper to get days for a month grid (including prev/next month's days)
  const getDaysInMonthGrid = (date) => {
    const startOfMonth = date.startOf("month");
    const endOfMonth = date.endOf("month");
    const startDay = startOfMonth.startOf("week"); // Sunday of the first week
    const endDay = endOfMonth.endOf("week"); // Saturday of the last week

    const days = [];
    let current = startDay;
    while (current.isBefore(endDay) || current.isSame(endDay, "day")) {
      days.push(current);
      current = current.add(1, "day");
    }
    return days;
  };

  // Navigation handlers
  const handlePrev = () => {
    if (view === "month") {
      setCurrentDate(currentDate.subtract(1, "month"));
    } else if (view === "week") {
      setCurrentDate(currentDate.subtract(1, "week"));
    } else if (view === "day") {
      setCurrentDate(currentDate.subtract(1, "day"));
    }
  };

  const handleNext = () => {
    if (view === "month") {
      setCurrentDate(currentDate.add(1, "month"));
    } else if (view === "week") {
      setCurrentDate(currentDate.add(1, "week"));
    } else if (view === "day") {
      setCurrentDate(currentDate.add(1, "day"));
    }
  };

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Data picker change handler
  const onDatePickerChange = (date) => {
    if (date) {
      setCurrentDate(dayjs(date));
    }
  };

  const handleNavButtonClick = (direction) => {
    if (direction === "prev") {
      handlePrev();
    } else if (direction === "next") {
      handleNext();
    }
  };

  return (
    <section>
      <CalendarToolbar
        selectedDate={currentDate}
        onDatePickerChange={onDatePickerChange}
        handleNavButtonClick={handleNavButtonClick}
        applyFilter={applyFilter}
        currentView={view}
        selectTimeFromProvider={selectTimeFromProvider}
      />
      <div
        className={cn(
          "rounded-xl overflow-hidden border-gray-200 border-collapse w-full",
          {
            "border-r": view === "day",
            "border border-t-0 border-l-0 border-b-0": view === "week",
            "border border-gray-200": view === "month",
          }
        )}
      >
        {/* Render the appropriate calendar content based on the selected view */}
        {view === "month" && (
          <MonthView
            currentDate={currentDate}
            dayNames={dayNames}
            getDaysInMonthGrid={getDaysInMonthGrid}
            events={events}
            resources={resources}
            selectTimeFromProvider={selectTimeFromProvider}
          />
        )}

        {view === "week" && (
          <WeekView
            currentDate={currentDate}
            resources={resources}
            events={events}
            weekView
            selectTimeFromProvider={selectTimeFromProvider}
            solo={solo}
          />
        )}

        {view === "day" && (
          <DayView
            currentDate={currentDate}
            events={events}
            resources={solo ? resources.slice(5) : resources}
            selectTimeFromProvider={selectTimeFromProvider}
            onTimeSelect={(timeData) => {
              console.log("Selected time:", timeData);
              // Handle the time selection
            }}
          />
        )}
      </div>
    </section>
  );
}
