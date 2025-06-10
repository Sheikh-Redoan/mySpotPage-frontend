import dayjs from "dayjs";
import "dayjs/locale/en"; // Or your preferred locale
import DayCell from "./DayCell";

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

  const getTimeSlots = (date, startHour = 8, endHour = 17) => {
    const slots = [];
    for (let i = startHour; i <= endHour; i++) {
      slots.push(date.hour(i).minute(0).second(0));
    }
    return slots;
  };

  const timeSlots = getTimeSlots(currentDate);

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
          <DayCell
            key={index}
            index={index}
            day={day}
            service={service}
            selectTimeFromProvider={selectTimeFromProvider}
            timeSlots={timeSlots}
            isToday={isToday}
            isCurrentMonth={isCurrentMonth}
            hiddenEventsCount={hiddenEventsCount}
            onTimeSelect={(selectedTime) => {
              console.log("Selected:", selectedTime);
              // Handle the selection
            }}
          />
        );
      })}
    </div>
  );
}
