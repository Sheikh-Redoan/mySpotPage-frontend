import dayjs from "dayjs";
import { useState } from "react";
import { cn } from "../../lib/utils";
import EventModal from "../selectTimeComponents/EventModal";
import Event from "./Event";

export default function DayCell({
  day,
  service,
  selectTimeFromProvider = false,
  timeSlots,
  isToday = false,
  isCurrentMonth = true,
  hiddenEventsCount,
  index = 0,
  onTimeSelect,
  eventsToShow,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);

  // Add function to check if day is in the past
  const isPastDay = () => {
    const today = dayjs().startOf("day");
    return day.isBefore(today);
  };

  // Filter available time slots to remove past times for today
  const availableTimeSlots =
    timeSlots?.map((slot) => {
      const slotTime = dayjs(
        `${day.format("YYYY-MM-DD")} ${dayjs(slot).format("HH:mm")}`
      );
      const isPastTime = dayjs().isAfter(slotTime);

      return {
        time: dayjs(slot).format("HH:mm"),
        isAvailable:
          !service?.isBusy && !(day.isSame(dayjs(), "day") && isPastTime),
        sale: service?.sale,
      };
    }) || [];

  // Check if all time slots are unavailable
  const allTimeSlotsUnavailable = availableTimeSlots.every(
    (slot) => !slot.isAvailable
  );

  const handleTimeSubmit = (data) => {
    const formattedTime = {
      date: day.format("YYYY-MM-DD"),
      time: data.time,
      fullDateTime: dayjs(`${day.format("YYYY-MM-DD")} ${data.time}`).format(),
    };

    setSelectedTimes((prev) => [...prev, formattedTime]);
    if (onTimeSelect) {
      onTimeSelect(formattedTime);
    }
    setIsOpen(false);
  };

  const Element = selectTimeFromProvider ? "button" : "div"; // Use button if selectTimeFromProvider is true, otherwise use div

  return (
    <>
      <Element
        disabled={service?.isBusy || isPastDay() || allTimeSlotsUnavailable}
        onClick={selectTimeFromProvider ? () => setIsOpen(true) : undefined}
        className={cn(
          "p-2 min-h-[120px] border-b border-r border-gray-200 bg-white",
          "cursor-pointer flex flex-col justify-start transition-colors duration-200",

          {
            "text-gray-400": !isCurrentMonth || isPastDay(),
            "border-r-0": (index + 1) % 7 === 0,
            "vertical-stripes-bg": service?.isBusy,
            "bg-[#F5F4FE] border border-[#866BE7]": selectedTimes.some((time) =>
              dayjs(time.fullDateTime).isSame(day, "day")
            ),
            "disabled:cursor-not-allowed":
              selectTimeFromProvider &&
              (service?.isBusy || isPastDay() || allTimeSlotsUnavailable),
          }
        )}>
        <div
          className={cn(
            "text-sm mb-1 text-start flex items-center justify-start gap-2",
            !isCurrentMonth ? "text-gray-400" : "text-gray-800"
          )}>
          <span
            className={cn({
              " bg-primary01 w-8 h-8 text-white grid place-items-center rounded-full":
                selectTimeFromProvider && isToday,
            })}>
            {day.format("D")}
          </span>
          {!selectTimeFromProvider && isToday && (
            <span className="text-xs font-normal border border-gray-200 px-2 py-1 text-primary01 rounded-full ml-1 flex items-center justify-center">
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
            eventsToShow.map((event) => <Event key={event.id} event={event} />)}
        </div>
      </Element>
      <EventModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleTimeSubmit}
        selectedDate={day}
        timeSlots={availableTimeSlots}
      />
    </>
  );
}
