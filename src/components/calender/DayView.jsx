import { Avatar } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Or your preferred locale
import React from "react";
import useResponsive from "../../hooks/useResponsive";
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
  const { xl } = useResponsive();
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

  const date = dayjs(currentDate); // replace with your date

  if (selectTimeFromProvider) {
    return (
      <div className="flex flex-col h-full max-h-[calc(100vh-200px)] overflow-hidden">
        <div className="p-2 min-h-[80px] bg-primary01/30 flex flex-col items-center justify-center w-full rounded-t-xl sticky top-0 z-10">
          <span className="text-base text-primary01 font-semibold">
            {dayjs(currentDate).format("ddd")}
          </span>
          <span
            className={cn({
              " bg-primary01 w-7 h-7 text-white grid place-items-center rounded-full font-normal text-sm":
                selectTimeFromProvider,
            })}>
            {dayjs(currentDate).format("DD")}
          </span>
        </div>

        <div className="overflow-y-auto">
          {timeSlots.map((slotTime, rowIndex) => (
            <div key={rowIndex} className="flex items-center">
              {/* Time Slot Label */}
              <div
                className={cn(
                  "p-2 text-xs font-medium text-gray-500 flex items-center justify-start py-8 sticky left-0 bg-white z-10",
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
                        "p-2 min-h-[80px] border-b border-gray-200 flex flex-col space-y-1",
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
        </div>
      </div>
    );
  }

  return (
    <div className="h-full max-h-[calc(100vh-200px)] overflow-hidden">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `80px repeat(${
            resourcesWithEvents.length || 1
          }, minmax(auto, 1fr))`,
        }}>
        {/* Resource Headers - Sticky */}
        <div className="sticky top-0 z-20 p-2 grid place-items-center">
          <div
            className={cn(
              "text-xs lg:text-sm lg:hidden",
              date.isSame(currentDate, "day")
                ? "text-white bg-primary01 rounded-full w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center mx-auto"
                : "text-gray-800 mt-3"
            )}>
            {date.format("DD")}
          </div>
        </div>

        {resourcesWithEvents.length > 0 ? (
          resourcesWithEvents.map((resource, index) => (
            <div
              key={resource.id}
              className={cn(
                "sticky top-0 z-20 p-4 flex flex-col border-b border-gray-200 items-center gap-2 justify-center bg-primary01/10",
                {
                  "rounded-tl-lg": index === 0,
                  "rounded-tr-lg": index === resourcesWithEvents.length - 1,
                }
              )}>
              <Avatar
                src={resource.avatar}
                alt={resource.name}
                size={xl ? 50 : 35}
                className="outline-1 outline-offset-2 outline-primary01/30 object-cover"
              />

              <span className="text-xs lg:text-sm text-gray-700 text-center text-nowrap">
                {resource.name}
              </span>
            </div>
          ))
        ) : (
          <>
            <div
              className={cn(
                "sticky top-0 z-20 text-center rounded-t-lg min-h-[100px]"
              )}
              style={{ backgroundColor: "#F3EDFF" }}
            />
          </>
        )}

        {/* Container for scrollable time slots and events */}
        <div
          className="col-span-full overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 250px)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `80px repeat(${
                resourcesWithEvents.length || 1
              }, minmax(auto, 1fr))`,
            }}>
            {/* Time Slots and Event Cells */}
            {timeSlots.map((slotTime, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {/* Time Label - Sticky */}
                <div
                  className={cn(
                    "sticky left-0 z-10 border-r border-gray-200 bg-gray-50 text-xs font-medium text-gray-500 flex items-center justify-center lg:justify-start p-2",
                    {
                      "border-b-0": rowIndex === timeSlots.length - 1,
                    }
                  )}>
                  {slotTime.format("HH:mm")}
                </div>

                {/* Event Cells */}
                {resourcesWithEvents.length > 0 ? (
                  resourcesWithEvents.map((resource, colIndex) => {
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
                          "min-h-[100px] border-b border-r border-gray-200 flex flex-col space-y-1 overflow-y-auto",
                          {
                            "last:rounded-br-lg":
                              colIndex === resourcesWithEvents.length - 1,
                          }
                        )}>
                        {slotEvents.map((event) => (
                          <div
                            key={event.id}
                            className={cn("h-full border-l-4 p-4", {
                              "border-[#3E70DD]": event.status === "Confirmed",
                              "border-[#3BA55C]": event.status === "Completed",
                              "border-[#FC8B23]": event.status === "Pending",
                              "border-[#ED4245]": event.status === "Cancelled",
                              "border-[#82868E]": event.status === "Not-show",
                            })}>
                            <div className="flex flex-col">
                              <Event event={event} dayView />
                              <EventTag event={event} />
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })
                ) : (
                  // Empty cells
                  <div
                    className={cn(
                      "p-2 min-h-[100px] border-r border-b first:border-t border-gray-200 last:rounded-br-lg"
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
