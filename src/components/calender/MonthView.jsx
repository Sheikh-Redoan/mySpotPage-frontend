import dayjs from "dayjs";
import "dayjs/locale/en";
import DayCell from "./DayCell";

export default function MonthView({
  currentDate,
  dayNames,
  getDaysInMonthGrid,
  events,
  maxEventsPerMonthCell = 3,
  selectTimeFromProvider,
  resources = [],
}) {
  const daysInGrid = getDaysInMonthGrid(currentDate);
  const today = dayjs();

  const getService = (date) => {
    if (!resources || resources.length === 0) return null;

    return resources.find((resource) =>
      dayjs(resource.date).isSame(date, "day")
    );
  };

  const getTimeSlots = (date, startHour = 8, endHour = 17) => {
    const slots = [];
    for (let i = startHour; i <= endHour; i++) {
      const time = date.hour(i).minute(0);
      slots.push(time);
    }
    return slots;
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
      {daysInGrid.map((day) => {
        const isToday = day.isSame(today, "day");
        const isCurrentMonth = day.isSame(currentDate, "month");
        const service = getService(day);
        const timeSlots = getTimeSlots(day);

        return (
          <DayCell
            key={day.format("YYYY-MM-DD")}
            day={day}
            service={service}
            events={events.filter((event) =>
              dayjs(event.start).isSame(day, "day")
            )}
            selectTimeFromProvider={selectTimeFromProvider}
            timeSlots={timeSlots}
            isToday={isToday}
            isCurrentMonth={isCurrentMonth}
            onTimeSelect={(selectedTime) => {
              console.log("Selected:", selectedTime);
            }}
          />
        );
      })}
    </div>
  );
}
