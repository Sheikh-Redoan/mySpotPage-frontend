import { Avatar } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Or your preferred locale
import React from "react";
import useResponsive from "../../hooks/useResponsive";
import { cn } from "../../lib/utils";
import DayCell from "./DayCell";
import Event from "./Event";

export default function WeekView({
  currentDate,
  resources = [],
  events = [],
  selectTimeFromProvider,
  maxEventsPerMonthCell = 3,
  solo = true, // If true, only show the current user's resources
}) {
  const { xl } = useResponsive(); // Assuming useResponsive is defined elsewhere
  const today = dayjs(); // Get today's date for highlighting

  // Helper to get days for a week
  const getWeekDays = (date) => {
    const startOfWeek = date.startOf("week");
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      weekDays.push(startOfWeek.add(i, "day"));
    }
    return weekDays;
  };

  const getTimeSlots = (date, startHour = 8, endHour = 17) => {
    const slots = [];
    for (let i = startHour; i <= endHour; i++) {
      slots.push(date.hour(i).minute(0).second(0));
    }
    return slots;
  };

  const getService = (date, currentSlot) => {
    if (!resources || (resources.length === 0 && selectTimeFromProvider))
      return null;

    const service = resources.find((resource) =>
      dayjs(resource.date).isSame(date, "day")
    );

    if (!service) return null;

    // If we have a current slot, find its specific busy status
    if (currentSlot) {
      const slotTime = currentSlot.format("HH:mm");
      const timeSlotData = service.timeSlots?.find(
        (slot) => slot.time === slotTime
      );

      return {
        ...service,
        timeSlots: [
          {
            time: slotTime,
            isBusy: timeSlotData?.isBusy ?? false,
            sale: timeSlotData?.sale || service.sale,
          },
        ],
      };
    }

    return service;
  };

  const timeSlots = getTimeSlots(currentDate);
  const weekDays = getWeekDays(currentDate);

  return (
    <div
      className={cn("grid border-gray-200 border-t-0", {
        "grid-cols-[100px_repeat(7,minmax(0,1fr))] lg:grid-cols-[120px_repeat(7,minmax(0,1fr))] ":
          !solo,
        "grid-cols-[70px_repeat(7,minmax(0,1fr))] lg:grid-cols-[80px_repeat(7,minmax(0,1fr))]":
          solo,
      })}>
      {/* Top-left empty corner */}
      <div className="p-2" />

      {/* Day Headers */}
      {weekDays.map((day, index) => (
        <td
          key={index}
          className={cn(
            "p-2 text-center border-b border-gray-200 bg-primary01/10 space-y-2",
            {
              "rounded-tl-lg": index === 0, // Add right border for all but the last column
            }
          )}>
          <p className="text-xs lg:text-sm font-medium text-primary01 uppercase">
            {day.format("ddd")}
          </p>
          <div
            className={cn("text-xs lg:text-sm", {
              "text-white bg-primary01 rounded-full w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center mx-auto":
                day.isSame(today, "day"),
              "text-gray-800 mt-3": !day.isSame(today, "day"),
            })}>
            {day.format("D").padStart(2, "0")}
          </div>
        </td>
      ))}

      {/* Resource Rows and Event Cells */}
      {!selectTimeFromProvider &&
        !solo &&
        resources.map((resource) => (
          <React.Fragment key={resource.id}>
            {/* Resource Name Column */}

            <div className="p-4 border-r border-b border-gray-200 flex flex-col items-center gap-2 justify-center bg-primary01/10 max-h-24 lg:min-h-48">
              <Avatar
                src={resource.avatar}
                alt={resource.name}
                size={xl ? 50 : 35}
                className="outline-1 outline-offset-2 outline-primary01/30"
              />

              <span className="text-xs lg:text-sm text-gray-700 text-center text-nowrap">
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
                .sort((a, b) => dayjs(a.start).diff(dayjs(b.start)));

              return (
                <div
                  key={dayIndex}
                  className={cn("p-2  border-b overflow-hidden", {
                    "border-r": dayIndex < 6,
                    "border-gray-200": true,
                    "flex flex-col space-y-1": true,
                  })}>
                  {dailyEvents.map((event) => (
                    <Event key={event.id} event={event} />
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}

      {!selectTimeFromProvider &&
        solo &&
        timeSlots.map((slot) => (
          <React.Fragment key={slot.format("HH:mm")}>
            {/* Resource Name Column */}
            {
              <div className="p-2 flex flex-col items-center gap-2 justify-start">
                <span className="text-xs text-gray-700">
                  {slot.format("HH:mm")}
                </span>
              </div>
            }

            {/* Event Cells for each day */}
            {weekDays.map((day, index) => {
              // Filter events for the current resource and day
              const isToday = day.isSame(today, "day");
              const isCurrentMonth = day.isSame(currentDate, "month");
              const service = getService(day, slot);

              const dailyEvents = events
                .filter((event) => dayjs(event.start).isSame(day, "day"))
                .sort((a, b) => dayjs(a.start).diff(dayjs(b.start))); // Sort by time

              const eventsToShow = dailyEvents.slice(0, maxEventsPerMonthCell);
              const hiddenEventsCount =
                dailyEvents.length - eventsToShow.length;

              return (
                <DayCell
                  key={index}
                  index={0}
                  day={day}
                  service={service}
                  selectTimeFromProvider={selectTimeFromProvider}
                  maxEventsPerMonthCell={maxEventsPerMonthCell}
                  timeSlots={[slot]} // Pass only the current time slot
                  isToday={isToday}
                  isCurrentMonth={isCurrentMonth}
                  hiddenEventsCount={hiddenEventsCount}
                  events={eventsToShow}
                  onTimeSelect={(selectedTime) => {
                    console.log("Selected:", selectedTime);
                    // Handle the selection
                  }}
                  weekView={true}
                />
              );
            })}
          </React.Fragment>
        ))}

      {selectTimeFromProvider &&
        timeSlots.map((slot) => (
          <React.Fragment key={slot.format("HH:mm")}>
            {/* Resource Name Column */}
            {
              <div className="p-2 border-r border-b border-gray-200 flex flex-col items-center gap-2 justify-start bg-primary01/10">
                <span className="text-sm font-medium text-gray-700">
                  {slot.format("HH:mm")}
                </span>
              </div>
            }

            {/* Event Cells for each day */}
            {weekDays.map((day, index) => {
              // Filter events for the current resource and day
              const isToday = day.isSame(today, "day");
              const isCurrentMonth = day.isSame(currentDate, "month");
              const service = getService(day, slot);

              const dailyEvents = events
                .filter((event) => dayjs(event.start).isSame(day, "day"))
                .sort((a, b) => dayjs(a.start).diff(dayjs(b.start))); // Sort by time

              const eventsToShow = dailyEvents.slice(0, maxEventsPerMonthCell);
              const hiddenEventsCount =
                dailyEvents.length - eventsToShow.length;

              return (
                <DayCell
                  key={index}
                  index={0}
                  day={day}
                  service={service}
                  selectTimeFromProvider={selectTimeFromProvider}
                  maxEventsPerMonthCell={maxEventsPerMonthCell}
                  timeSlots={[slot]} // Pass only the current time slot
                  isToday={isToday}
                  isCurrentMonth={isCurrentMonth}
                  hiddenEventsCount={hiddenEventsCount}
                  events={eventsToShow}
                  onTimeSelect={(selectedTime) => {
                    console.log("Selected:", selectedTime);
                    // Handle the selection
                  }}
                  weekView={true}
                />
              );
            })}
          </React.Fragment>
        ))}
    </div>
  );
}
