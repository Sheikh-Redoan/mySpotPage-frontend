import dayjs from "dayjs";
import "dayjs/locale/en"; // Or your preferred locale
import React from "react";

export default function WeekView({ currentDate, resources = [], events = [] }) {
  const today = dayjs(); // Get today's date for highlighting

  // Helper to get days for a week
  const getWeekDays = (date) => {
    const startOfWeek = date.startOf("week");
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(startOfWeek.add(i, "day"));
    }
    return days;
  };

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
      {resources.map((resource) => (
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
            const dailyEvents = events
              .filter(
                (event) =>
                  event.resourceId === resource.id &&
                  dayjs(event.start).isSame(day, "day")
              )
              .sort((a, b) => dayjs(a.start).diff(dayjs(b.start))); // Sort by time

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
}
