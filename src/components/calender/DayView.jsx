import dayjs from "dayjs";
import "dayjs/locale/en"; // Or your preferred locale
import { cn } from "../../lib/utils";
import DayCell from "./DayCell";
import Event from "./Event";
import EventTag from "./EventTag";

export default function DayView({
  currentDate,
  events = [],
  resources = [],
  selectTimeFromProvider,
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

  // Add this helper function at the top of your component
  const isBusySlot = (currentDate, slotTime, specialDates) => {
    const dateData = specialDates.find((date) =>
      dayjs(date.date).isSame(currentDate, "day")
    );

    if (!dateData?.timeSlots) return { isBusy: false, sale: null };

    const timeSlot = dateData.timeSlots.find(
      (slot) => slot.time === dayjs(slotTime).format("HH:mm")
    );

    return {
      isBusy: timeSlot?.isBusy || false,
      sale: timeSlot?.sale || null,
    };
  };

  return (
    <div
      className="border-0"
      style={{
        display: "grid",
        gridTemplateColumns: `80px repeat(${resourcesWithEvents.length}, minmax(120px, 1fr))`,
      }}>
      {/* Time Slot Headers (Rows) */}

      {/* Resource Headers (Columns) */}
      <div className="p-2 border-none" />
      {/* Empty top-left, now with purple background */}
      {!selectTimeFromProvider &&
        resourcesWithEvents.map((resource, index) => (
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

      {selectTimeFromProvider && (
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
      )}

      {/* Time Slots (Rows) and Event Cells */}
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

          {selectTimeFromProvider && (
            <DayCell
              day={currentDate}
              service={resources.find((r) =>
                dayjs(r.date).isSame(currentDate, "day")
              )}
              selectTimeFromProvider={true}
              timeSlots={timeSlots}
              isToday={dayjs(currentDate).isSame(dayjs(), "day")}
              isCurrentMonth={true}
              onTimeSelect={onTimeSelect}
              dayView={true}
              index={rowIndex}
            />

            // <div
            //   className={cn(
            //     "p-2 min-h-[80px] border-b border-r border-l border-gray-200",
            //     "flex items-center justify-start w-full transition-colors duration-200",
            //     {
            //       "vertical-stripes-bg": isBusySlot(
            //         currentDate,
            //         slotTime,
            //         resources
            //       ).isBusy,
            //       "cursor-pointer hover:bg-gray-50": !isBusySlot(
            //         currentDate,
            //         slotTime,
            //         resources
            //       ).isBusy,
            //     }
            //   )}>
            //   <div className="flex flex-col items-center gap-2">
            //     {isBusySlot(currentDate, slotTime, resources).sale &&
            //       !isBusySlot(currentDate, slotTime, resources).isBusy && (
            //         <span className="text-xs text-primary01 bg-[#F5F4FE] px-2 py-1 rounded-full font-medium border border-[#C3BCF6]">
            //           {isBusySlot(currentDate, slotTime, resources).sale}
            //         </span>
            //       )}
            //   </div>
            // </div>
          )}
        </div>
      ))}
    </div>
  );
}
