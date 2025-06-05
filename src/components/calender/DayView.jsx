import dayjs from "dayjs";
import "dayjs/locale/en"; // Or your preferred locale
import React from "react";
import { cn } from "../../lib/utils";
import Event from "./Event";
import EventTag from "./EventTag";

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

  // Filter resources that have at least one event on the currentDate
  const resourcesWithEvents = resources.filter((resource) =>
    events.some(
      (event) =>
        event.resourceId === resource.id &&
        dayjs(event.start).isSame(currentDate, "day")
    )
  );

  console.log(resourcesWithEvents.length);

  return (
    <div
      className="border-b-0"
      style={{
        display: "grid",
        gridTemplateColumns: `80px repeat(${resourcesWithEvents.length}, minmax(120px, 1fr))`,
      }}>
      {/* Resource Headers (Columns) */}
      <div className="p-2 border-none" />
      {/* Empty top-left, now with purple background */}
      {resourcesWithEvents.map((resource, index) => (
        <div
          key={resource.id}
          className={cn(
            "p-2 text-center border-b border-r border-gray-200 last:border-r-0 flex flex-col items-center space-y-1",
            {
              "rounded-tl-xl": index === 0,
            }
          )}
          style={{ backgroundColor: "#F3EDFF" }} // Light purple background
        >
          <img
            src={resource.avatar}
            alt={resource.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-sm font-semibold text-gray-700">
            {resource.name}
          </div>
        </div>
      ))}
      {/* Time Slots (Rows) and Event Cells */}
      {timeSlots.map((slotTime, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {/* Time Slot Label */}
          <div
            className={cn(
              "p-2 text-xs font-medium text-gray-500 flex items-center justify-start",
              {
                "border-b-0": rowIndex === timeSlots.length - 1,
              }
            )}>
            {slotTime.format("HH:mm")}
          </div>

          {/* Event Cells for each resource */}
          {resourcesWithEvents.map((resource, colIndex) => {
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
                className={cn(
                  "p-2 min-h-[80px] border-b border-r border-gray-200 flex flex-col space-y-1",
                  {
                    "border-l border-gray-200": colIndex === 0,
                    "border-r-0": colIndex === resourcesWithEvents.length - 1,
                    "border-b-0": rowIndex === timeSlots.length - 1,
                  }
                )}>
                {slotEvents.map((event) => (
                  <div key={event.id}>
                    <Event event={event} />
                    <EventTag event={event} />
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
