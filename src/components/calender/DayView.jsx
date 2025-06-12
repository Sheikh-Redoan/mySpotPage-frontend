import dayjs from "dayjs";
import "dayjs/locale/en"; // Or your preferred locale
import React from "react";
import { cn } from "../../lib/utils";
import DayCell from "./DayCell";
import Event from "./Event";
import EventTag from "./EventTag";

export default function DayView({
  currentDate,
  events = [],
  resources = [],
  selectTimeFromProvider,
  maxEventsPerMonthCell = 3,
  onTimeSelect = () => {},
}) {
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
  const resourcesWithEvents =
    !selectTimeFromProvider &&
    resources.filter((resource) =>
      events.some(
        (event) =>
          event.resourceId === resource.id &&
          dayjs(event.start).isSame(currentDate, "day")
      )
    );

  const columnsCount = Math.max(resourcesWithEvents.length || 3, 1); // Ensure at least one column

  if (selectTimeFromProvider) {
    return (
      <>
        <div className="p-2 min-h-[80px] bg-primary01/30 flex flex-col items-center justify-center w-full rounded-t-xl">
          <span className="text-base text-primary01 font-semibold">
            {dayjs(currentDate).format("ddd")}
          </span>
          <span
            className={cn({
              " bg-primary01 w-7 h-7 text-white grid place-items-center rounded-full font-normal text-sm":
                selectTimeFromProvider,
            })}>
            {dayjs(currentDate).format("D")}
          </span>
        </div>

        {timeSlots.map((slotTime, rowIndex) => (
          <div key={rowIndex} className="flex items-center">
            {/* Time Slot Label */}
            <div
              className={cn(
                "p-2 text-xs font-medium text-gray-500 flex items-center justify-start py-8",
                {
                  "border-b-0": rowIndex === timeSlots.length - 1,
                }
              )}>
              {slotTime.format("HH:mm")}
            </div>

            {/* Event Cells for each resource */}
            {!selectTimeFromProvider &&
              resourcesWithEvents.map((resource, colIndex) => {
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
                        "border-r-0":
                          colIndex === resourcesWithEvents.length - 1,
                        "border-b-0": rowIndex === timeSlots.length - 1,
                      }
                    )}>
                    {slotEvents.map((event) => (
                      <div key={event.id} className="w-full">
                        <Event event={event} />
                        <EventTag event={event} />
                      </div>
                    ))}
                  </div>
                );
              })}

            {selectTimeFromProvider && (
              <DayCell
                day={currentDate}
                service={resources.find((r) =>
                  dayjs(r.date).isSame(currentDate, "day")
                )}
                selectTimeFromProvider={true}
                events={events.filter((event) =>
                  dayjs(event.start).isSame(currentDate, "day")
                )}
                maxEventsPerMonthCell={maxEventsPerMonthCell}
                timeSlots={timeSlots}
                isToday={dayjs(currentDate).isSame(dayjs(), "day")}
                isCurrentMonth={true}
                onTimeSelect={onTimeSelect}
                dayView={true}
                index={rowIndex}
              />
            )}
          </div>
        ))}
      </>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `80px repeat(${
          resourcesWithEvents.length || 3
        }, minmax(120px, 1fr))`,
      }}>
      {/* Resource Headers */}
      <div className="p-2 border-r border-gray-200" />

      {resourcesWithEvents.length > 0
        ? resourcesWithEvents.map((resource) => (
            <div
              key={resource.id}
              className="p-2 text-center border-b border-r border-gray-200 last:border-r-0 flex flex-col items-center space-y-1 rounded-t-lg"
              style={{ backgroundColor: "#F3EDFF" }}>
              <img
                src={resource.avatar}
                alt={resource.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-sm font-semibold text-gray-700">
                {resource.name}
              </div>
            </div>
          ))
        : // Empty column headers
          Array(columnsCount)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className={cn("p-6 text-center", {
                  "border-l-0 rounded-tl-lg ": index === 0,
                })}
                style={{ backgroundColor: "#F3EDFF" }}
              />
            ))}

      {/* Time Slots and Event Cells */}
      {timeSlots.map((slotTime, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {/* Time Label */}
          <div
            className={cn(
              "p-2 border-r border-gray-200 bg-gray-50 text-xs font-medium text-gray-500 flex items-center justify-start",
              {
                "border-b-0": rowIndex === timeSlots.length - 1,
              }
            )}>
            {slotTime.format("HH:mm")}
          </div>

          {/* Event Cells */}
          {resourcesWithEvents.length > 0
            ? resourcesWithEvents.map((resource, colIndex) => {
                const slotEvents = events
                  .filter(
                    (event) =>
                      event.resourceId === resource.id &&
                      dayjs(event.start).isSame(slotTime, "hour") &&
                      dayjs(event.start).isSame(currentDate, "day")
                  )
                  .sort((a, b) => dayjs(a.start).diff(dayjs(b.start)));

                return (
                  <div
                    key={`${resource.id}-${rowIndex}`}
                    className={cn(
                      "p-2 min-h-[80px] border-b border-r border-gray-200 flex flex-col space-y-1",
                      {
                        "border-r-0":
                          colIndex === resourcesWithEvents.length - 1,
                        "border-b-0": rowIndex === timeSlots.length - 1,
                      }
                    )}>
                    {slotEvents.map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          "rounded-md px-2 py-1 text-xs font-medium flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer mb-1",
                          {
                            "bg-[#D2F0E7] text-[#008A5E]":
                              event.status === "Completed",
                            "bg-[#E0EEFF] text-[#0066FF]":
                              event.status !== "Completed",
                          }
                        )}>
                        <div className="flex flex-col">
                          <span className="font-semibold">{event.title}</span>
                          <span className="text-[0.6rem] opacity-90 font-normal">
                            {event.status}
                          </span>
                        </div>
                        <svg
                          className="w-4 h-4 text-gray-500 hover:text-gray-700"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 2a2 2 0 104 0 2 2 0 00-4 0z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                );
              })
            : // Empty cells
              Array(columnsCount)
                .fill(null)
                .map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className={cn(
                      "p-2 min-h-[80px] border-b border-r border-gray-200",
                      {
                        "border-r-0": colIndex === columnsCount - 1,
                        "border-b-0": rowIndex === timeSlots.length - 1,
                      }
                    )}
                  />
                ))}
        </React.Fragment>
      ))}
    </div>
  );
}
