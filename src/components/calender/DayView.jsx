import dayjs from "dayjs";
import "dayjs/locale/en"; // Or your preferred locale
import React from "react";

export default function DayView({ currentDate, events = [], resources = [] }) {
  // Helper to get time slots for a day
  const getTimeSlots = (date, startHour = 8, endHour = 17) => {
    const slots = [];
    for (let i = startHour; i <= endHour; i++) {
      slots.push(date.hour(i).minute(0).second(0));
    }
    return slots;
  };
  const timeSlots = getTimeSlots(currentDate);
  return (
    <div className="grid grid-cols-[80px_repeat(auto-fit,minmax(120px,1fr))] border-gray-200">
      {/* Resource Headers (Columns) */}
      <div className="p-2 border-b border-r border-gray-200 bg-gray-50"></div>{" "}
      {/* Empty top-left */}
      {resources.map((resource) => (
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
          {resources.map((resource, colIndex) => {
            // Filter events for the current resource and time slot
            const slotEvents = events
              .filter(
                (event) =>
                  event.resourceId === resource.id &&
                  dayjs(event.start).isSame(slotTime, "hour") &&
                  dayjs(event.start).isSame(currentDate, "day")
              )
              .sort((a, b) => dayjs(a.start).diff(dayjs(b.start))); // Sort by time

            return (
              <div
                key={`${resource.id}-${rowIndex}`}
                className={`p-2 min-h-[80px] border-b border-r border-gray-200 flex flex-col space-y-1
                                   ${
                                     colIndex === resources.length - 1
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
