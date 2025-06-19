import dayjs from "dayjs";
import "dayjs/locale/en"; // Or your preferred locale
import useResponsive from "../../hooks/useResponsive";
import { cn } from "../../lib/utils";
import DayCell from "./DayCell";
import DayViewAppointment from "./DayViewAppointment";
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
    <DayViewAppointment
      currentDate={currentDate}
      resources={resources}
      events={events}
    />
  );
}
