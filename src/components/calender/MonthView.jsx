import dayjs from "dayjs";
import "dayjs/locale/en"; // Or your preferred locale

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
          className="p-2 text-center border-b border-r border-gray-200 bg-gray-50 text-xs font-medium text-gray-500 uppercase last:border-r-0">
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
            className={`p-2 min-h-[120px] border-b border-r border-gray-200
                              ${
                                !isCurrentMonth
                                  ? "bg-gray-50 text-gray-400"
                                  : "bg-white"
                              }
                              ${(index + 1) % 7 === 0 ? "border-r-0" : ""}
                              `}>
            <div
              className={`text-right text-sm font-semibold mb-1
                              ${
                                isToday
                                  ? "text-white bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center ml-auto"
                                  : "text-gray-800"
                              }`}>
              {day.format("D")}
            </div>
            <div className="flex flex-col space-y-1">
              {eventsToShow.map((event) => (
                <div
                  key={event.id}
                  className="bg-blue-100 text-blue-800 rounded-md p-1 text-xs font-medium flex items-center space-x-1 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
                  <span className="text-sm">
                    {event.status === "Completed" ? "✅" : "🔵"}
                  </span>
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
