import dayjs from "dayjs";
import "dayjs/locale/en"; // Or your preferred locale
import React, { useState } from "react";
import CalendarToolbar from "../reuseableComponent/CalendarToolbar";
import { MOCK_EVENTS, MOCK_RESOURCES } from "./mockdata";

export default function WeekView() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
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

  // Render logic based on selectedView
  const renderCalendarContent = () => {
    if (selectedView === "month") {
      const daysInGrid = getDaysInMonthGrid(currentDate);
      return (
        <div className="grid grid-cols-7 border-gray-200">
          {/* Day Names Header */}
          {dayNames.map((name, index) => (
            <div
              key={index}
              className="p-2 text-center border-b border-r border-gray-200 bg-gray-50 text-xs font-medium text-gray-500 uppercase last:border-r-0">
              {name}
            </div>
          ))}

          {/* Day Cells */}
          {daysInGrid.map((day, index) => {
            const isToday = day.isSame(today, "day");
            const isCurrentMonth = day.isSame(currentDate, "month");
            const dailyEvents = MOCK_EVENTS.filter((event) =>
              dayjs(event.start).isSame(day, "day")
            ).sort((a, b) => dayjs(a.start).diff(dayjs(b.start))); // Sort by time

            const eventsToShow = dailyEvents.slice(
              0,
              MAX_EVENTS_PER_MONTH_CELL
            );
            const hiddenEventsCount = dailyEvents.length - eventsToShow.length;

            return (
              <div
                key={index}
                className={`p-2 min-h-[120px] border-b border-r border-gray-200
                             ${
                               !isCurrentMonth
                                 ? "bg-gray-50 text-gray-400"
                                 : "bg-white"
                             }
                             ${(index + 1) % 7 === 0 ? "border-r-0" : ""}
                             `}>
                <div
                  className={`text-right text-sm font-semibold mb-1
                             ${
                               isToday
                                 ? "text-white bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center ml-auto"
                                 : "text-gray-800"
                             }`}>
                  {day.format("D")}
                </div>
                <div className="flex flex-col space-y-1">
                  {eventsToShow.map((event) => (
                    <div
                      key={event.id}
                      className="bg-blue-100 text-blue-800 rounded-md p-1 text-xs font-medium flex items-center space-x-1 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
                      <span className="text-sm">
                        {event.status === "Completed" ? "✅" : "🔵"}
                      </span>
                      <span>
                        {dayjs(event.start).format("HH:mm")} - {event.title}
                      </span>
                    </div>
                  ))}
                  {hiddenEventsCount > 0 && (
                    <div className="text-xs text-gray-600 mt-1 cursor-pointer hover:underline">
                      {hiddenEventsCount} others
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    } else if (selectedView === "week") {
      const weekDays = getWeekDays(currentDate);
      return (
        <div className="grid grid-cols-[150px_repeat(7,minmax(0,1fr))] border-gray-200">
          {/* Top-left empty corner */}
          <div className="p-2 border-b border-r border-gray-200 bg-gray-50"></div>

          {/* Day Headers */}
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={`p-2 text-center border-b ${
                index < 6 ? "border-r" : ""
              } border-gray-200 bg-gray-50`}>
              <div className="text-xs font-medium text-gray-500 uppercase">
                {day.format("ddd")}
              </div>
              <div
                className={`text-lg font-bold ${
                  day.isSame(today, "day")
                    ? "text-white bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mx-auto"
                    : "text-gray-800"
                }`}>
                {day.format("D")}
              </div>
            </div>
          ))}

          {/* Resource Rows and Event Cells */}
          {MOCK_RESOURCES.map((resource) => (
            <React.Fragment key={resource.id}>
              {/* Resource Name Column */}
              <div className="p-2 border-r border-b border-gray-200 bg-gray-50 flex items-center space-x-2">
                <img
                  src={resource.avatar}
                  alt={resource.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700">
                  {resource.name}
                </span>
              </div>

              {/* Event Cells for each day */}
              {weekDays.map((day, dayIndex) => {
                // Filter events for the current resource and day
                const dailyEvents = MOCK_EVENTS.filter(
                  (event) =>
                    event.resourceId === resource.id &&
                    dayjs(event.start).isSame(day, "day")
                ).sort((a, b) => dayjs(a.start).diff(dayjs(b.start))); // Sort by time

                return (
                  <div
                    key={dayIndex}
                    className={`p-2 min-h-[100px] border-b ${
                      dayIndex < 6 ? "border-r" : ""
                    } border-gray-200 flex flex-col space-y-1`}>
                    {dailyEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`rounded-md p-1 text-xs font-medium flex items-center space-x-1 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer
                                     ${
                                       event.status === "Completed"
                                         ? "bg-green-100 text-green-800"
                                         : "bg-blue-100 text-blue-800"
                                     }`}>
                        <span className="text-sm">
                          {event.status === "Completed" ? "✅" : "🔵"}
                        </span>
                        <span>
                          {dayjs(event.start).format("HH:mm")} - {event.title}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      );
    } else if (selectedView === "day") {
      const timeSlots = getTimeSlots(currentDate);
      return (
        <div className="grid grid-cols-[80px_repeat(auto-fit,minmax(120px,1fr))] border-gray-200">
          {/* Resource Headers (Columns) */}
          <div className="p-2 border-b border-r border-gray-200 bg-gray-50"></div>{" "}
          {/* Empty top-left */}
          {MOCK_RESOURCES.map((resource) => (
            <div
              key={resource.id}
              className="p-2 text-center border-b border-r border-gray-200 bg-gray-50 last:border-r-0 flex flex-col items-center space-y-1">
              <img
                src={resource.avatar}
                alt={resource.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-xs font-medium text-gray-700">
                {resource.name}
              </div>
            </div>
          ))}
          {/* Time Slots (Rows) and Event Cells */}
          {timeSlots.map((slotTime, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {/* Time Slot Label */}
              <div
                className={`p-2 border-r border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-500 flex items-center justify-end
                             ${
                               rowIndex === timeSlots.length - 1
                                 ? "border-b-0"
                                 : ""
                             }`}>
                {slotTime.format("HH:mm")}
              </div>

              {/* Event Cells for each resource */}
              {MOCK_RESOURCES.map((resource, colIndex) => {
                // Filter events for the current resource and time slot
                const slotEvents = MOCK_EVENTS.filter(
                  (event) =>
                    event.resourceId === resource.id &&
                    dayjs(event.start).isSame(slotTime, "hour") &&
                    dayjs(event.start).isSame(currentDate, "day")
                ).sort((a, b) => dayjs(a.start).diff(dayjs(b.start))); // Sort by time

                return (
                  <div
                    key={`${resource.id}-${rowIndex}`}
                    className={`p-2 min-h-[80px] border-b border-r border-gray-200 flex flex-col space-y-1
                                 ${
                                   colIndex === MOCK_RESOURCES.length - 1
                                     ? "border-r-0"
                                     : ""
                                 }
                                 ${
                                   rowIndex === timeSlots.length - 1
                                     ? "border-b-0"
                                     : ""
                                 }`}>
                    {slotEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`rounded-md p-1 text-xs font-medium flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer
                                     ${
                                       event.status === "Completed"
                                         ? "bg-green-100 text-green-800"
                                         : "bg-blue-100 text-blue-800"
                                     }`}>
                        <span className="font-semibold">{event.title}</span>
                        <span className="text-[0.65rem] opacity-80">
                          {event.status}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      );
    }
  };

  return (
    <div className=" bg-gray-100 font-sans flex items-center justify-center">
      <div className="w-full bg-white rounded-lg overflow-hidden">
        <CalendarToolbar
          selectedDate={currentDate}
          onDatePickerChange={onDatePickerChange}
          handleNavButtonClick={handleNavButtonClick}
          handleTodayClick={handleToday}
          applyFilter={true}
          currentView={selectedView}
          handleViewChange={setSelectedView}
        />

        {/* Render the appropriate calendar content based on the selected view */}
        {renderCalendarContent()}
      </div>
    </div>
  );
}
