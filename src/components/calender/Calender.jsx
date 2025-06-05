import dayjs from "dayjs";
import "dayjs/locale/en"; // Or your preferred locale
import { useState } from "react";
import CalendarToolbar from "../reuseableComponent/CalendarToolbar";
import DayView from "./DayView";
import { MOCK_EVENTS, MOCK_RESOURCES } from "./mockdata";
import MonthView from "./MonthView";
import WeekView from "./weekView";

export default function Calender() {
  // State for the currently displayed date, adjusted based on view
  const [currentDate, setCurrentDate] = useState(dayjs("2025-01-06")); // Start with the day view date
  const [selectedView, setSelectedView] = useState("month"); // Default to 'day' view

  const today = dayjs(); // Get today's date for highlighting

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

  // Helper to get days for a week
  const getWeekDays = (date) => {
    const startOfWeek = date.startOf("week");
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(startOfWeek.add(i, "day"));
    }
    return days;
  };

  // Helper to get time slots for a day
  const getTimeSlots = (date, startHour = 8, endHour = 17) => {
    const slots = [];
    for (let i = startHour; i <= endHour; i++) {
      slots.push(date.hour(i).minute(0).second(0));
    }
    return slots;
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

  // Max events to show per cell before "X others" in month view
  const MAX_EVENTS_PER_MONTH_CELL = 2;
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
        applyFilter={true}
        currentView={selectedView}
        handleViewChange={setSelectedView}
      />
      <div className="rounded-xl overflow-hidden border border-gray-200">
        {/* Render the appropriate calendar content based on the selected view */}
        {selectedView === "month" && (
          <MonthView
            currentDate={currentDate}
            dayNames={dayNames}
            getDaysInMonthGrid={getDaysInMonthGrid}
            events={MOCK_EVENTS}
          />
        )}

        {selectedView === "week" && (
          <WeekView
            currentDate={currentDate}
            resources={MOCK_RESOURCES}
            events={MOCK_EVENTS}
          />
        )}

        {selectedView === "day" && (
          <DayView
            currentDate={currentDate}
            events={MOCK_EVENTS}
            resources={MOCK_RESOURCES}
          />
        )}
      </div>
    </section>
  );
}
