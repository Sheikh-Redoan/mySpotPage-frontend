import dayjs from "dayjs";
import "dayjs/locale/en"; // Or your preferred locale
import { cn } from "../../lib/utils";
import Event from "./Event";

export default function MonthView({
  currentDate,
  dayNames,
  getDaysInMonthGrid,
  events,
  maxEventsPerMonthCell = 3,
  selectTimeFromProvider,
  resources = [], // Assuming resources is an array of objects
}) {
  const daysInGrid = getDaysInMonthGrid(currentDate);
  const today = dayjs();

  const getService = (date) => {
    if (!resources || (resources.length === 0 && selectTimeFromProvider))
      return null;
    return resources.find((resource) =>
      dayjs(resource.date).isSame(date, "day")
    );
  };

  return (
    <div className="grid grid-cols-7 border-gray-200">
      {/* Day Names Header */}
      {dayNames.map((name, index) => (
        <div
          key={index}
          className="p-3 text-center border-b border-gray-200 bg-primary01/10 text-sm font-medium text-primary01 uppercase">
          {name}
        </div>
      ))}

      {/* Day Cells */}
      {daysInGrid.map((day, index) => {
        const isToday = day.isSame(today, "day");
        const isCurrentMonth = day.isSame(currentDate, "month");
        const dailyEvents = events
          .filter((event) => dayjs(event.start).isSame(day, "day"))
          .sort((a, b) => dayjs(a.start).diff(dayjs(b.start))); // Sort by time

        const eventsToShow = dailyEvents.slice(0, maxEventsPerMonthCell);
        const hiddenEventsCount = dailyEvents.length - eventsToShow.length;

        const service = getService(day);

        return (
          <div
            key={index}
            className={cn(
              "p-2 min-h-[120px] border-b border-r border-gray-200 bg-white",
              {
                "text-gray-400": !isCurrentMonth,
                "border-r-0": (index + 1) % 7 === 0,
                "vertical-stripes-bg": service?.isBusy,
              }
            )}>
            <div
              className={cn(
                "text-sm mb-1 text-start flex items-center justify-start gap-2",
                !isCurrentMonth ? "text-gray-400" : "text-gray-800",
                {
                  "w-8 h-8 bg-primary01 text-white grid place-items-center rounded-full":
                    selectTimeFromProvider && isToday,
                }
              )}>
              {day.format("D")}
              {!selectTimeFromProvider && isToday && (
                <span className="text-xs font-normal border border-gray-200 px-2 py-1 text-primary01 rounded-full ml-1">
                  Today
                </span>
              )}

              {(selectTimeFromProvider && service?.isBusy) ||
                (service?.sale && <div className="">{service.sale}</div>)}
              {!selectTimeFromProvider && hiddenEventsCount > 0 && (
                <div className="text-xs text-gray-600 mt-1 cursor-pointer hover:underline">
                  {hiddenEventsCount} others
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-1 mt-2">
              {!selectTimeFromProvider &&
                eventsToShow.map((event) => (
                  <Event key={event.id} event={event} />
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
