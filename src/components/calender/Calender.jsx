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
}) {
  const [searchParams, setSearchParams] = useSearchParams();
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
    if (selectedView === "month") {
      setCurrentDate(currentDate.subtract(1, "month"));
    } else if (selectedView === "week") {
      setCurrentDate(currentDate.subtract(1, "week"));
    } else if (selectedView === "day") {
      setCurrentDate(currentDate.subtract(1, "day"));
    }
  };

  const handleNext = () => {
    if (selectedView === "month") {
      setCurrentDate(currentDate.add(1, "month"));
    } else if (selectedView === "week") {
      setCurrentDate(currentDate.add(1, "week"));
    } else if (selectedView === "day") {
      setCurrentDate(currentDate.add(1, "day"));
    }
  };

  const handleToday = () => {
    setCurrentDate(dayjs()); // Set to current day, view will adjust
    searchParams.set("view", "day"); // Reset to day view
    setSearchParams(searchParams);
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
        handleTodayClick={handleToday}
        applyFilter={applyFilter}
        currentView={view}
        selectTimeFromProvider={selectTimeFromProvider}
      />
      <div
        className={cn("lg:rounded-xl overflow-hidden border-gray-200", {
          "border-r": view === "day",
          "border border-t-0 border-l-0": view === "week",
          "border border-gray-200": view === "month",
        })}>
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
          />
        )}

        {view === "day" && (
          <DayView
            currentDate={currentDate}
            events={events}
            resources={resources}
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
