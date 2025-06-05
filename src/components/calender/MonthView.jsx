import dayjs from "dayjs";
import "dayjs/locale/en"; // Or your preferred locale
import { cn } from "../../lib/utils";

export default function MonthView({
  currentDate,
  dayNames,
  getDaysInMonthGrid,
  events,
  maxEventsPerMonthCell = 3,
}) {
  const daysInGrid = getDaysInMonthGrid(currentDate);
  const today = dayjs();

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

        return (
          <div
            key={index}
            className={cn(
              !isCurrentMonth ? "bg-white text-gray-400" : "bg-white",
              "p-2 min-h-[120px] border-b border-r border-gray-200",
              (index + 1) % 7 === 0 ? "border-r-0" : ""
            )}>
            <div
              className={cn(
                "text-sm mb-1 text-start",
                !isCurrentMonth ? "text-gray-400" : "text-gray-800"
              )}>
              {day.format("D")}{" "}
              {isToday && (
                <span className="text-xs font-normal border border-gray-200 px-2 py-1 text-primary01 rounded-full ml-1">
                  Today
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1 mt-2">
              {eventsToShow.map((event) => (
                <div
                  key={event.id}
                  className="cursor-pointer text-xs flex items-center gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
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
}
