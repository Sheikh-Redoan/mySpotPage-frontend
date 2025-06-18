import dayjs from "dayjs";
import "dayjs/locale/en"; // Or your preferred locale
import { useState } from "react";
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
  console.log("first")
  // State for the currently displayed date, adjusted based on view
  const [currentDate, setCurrentDate] = useState(dayjs(Date.now())); // Start with the day view date
  const [selectedView, setSelectedView] = useState("month"); // Default to 'day' view

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
        currentView={selectedView}
        handleViewChange={setSelectedView}
        selectTimeFromProvider={selectTimeFromProvider}
      />
      <div
        className={cn("lg:rounded-xl overflow-hidden border border-gray-200", {
          "border-0": selectedView === "day",
          "border-t-0": selectedView === "week",
          "border-b-0": selectedView === "month",
        })}>
        {/* Render the appropriate calendar content based on the selected view */}
        {selectedView === "month" && (
          <MonthView
            currentDate={currentDate}
            dayNames={dayNames}
            getDaysInMonthGrid={getDaysInMonthGrid}
            events={events}
            resources={resources}
            selectTimeFromProvider={selectTimeFromProvider}
          />
        )}

        {selectedView === "week" && (
          <WeekView
            currentDate={currentDate}
            resources={resources}
            events={events}
            weekView
            selectTimeFromProvider={selectTimeFromProvider}
          />
        )}

        {selectedView === "day" && (
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
