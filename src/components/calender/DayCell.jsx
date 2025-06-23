import dayjs from "dayjs";
import { useState } from "react";
import { cn } from "../../lib/utils";
import EventModal from "../selectTimeComponents/EventModal";
import Event from "./Event";
import MoreEvents from "./MoreEvents";

export default function DayCell({
  day,
  service,
  selectTimeFromProvider = false,
  maxEventsPerMonthCell = 3,
  timeSlots,
  isToday = false,
  isCurrentMonth = true,
  index = 0,
  onTimeSelect,
  weekView = false,
  dayView = false,
  events = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const isPastDay = () => {
    const today = dayjs().startOf("day");
    return day.isBefore(today);
  };

  const getCurrentTimeSlot = () => {
    if (!service?.timeSlots) return null;

    if (dayView) {
      const currentTime = dayjs(timeSlots[index]).format("HH:mm");
      const timeSlotData = service.timeSlots.find(
        (slot) => slot.time === currentTime
      );
      return (
        timeSlotData || {
          time: currentTime,
          isBusy: false,
          sale: null,
        }
      );
    }

    // For week view - return specific time slot
    if (weekView && timeSlots?.[0]) {
      const currentTime = dayjs(timeSlots[0]).format("HH:mm");
      const timeSlotData = service.timeSlots.find(
        (slot) => slot.time === currentTime
      );
      return (
        timeSlotData || {
          time: currentTime,
          isBusy: false,
          sale: null,
        }
      );
    }

    // For month view - show day status
    const hasAvailableSlots = service.timeSlots.some((slot) => !slot.isBusy);
    return {
      isBusy: service.isBusy || !hasAvailableSlots,
      sale: service.sale,
      availableTimeSlots: service.timeSlots.filter((slot) => !slot.isBusy),
    };
  };

  const currentTimeSlot = getCurrentTimeSlot();

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

  const renderContent = () => {
    if (dayView || weekView) {
      return (
        <div className="flex flex-col h-full w-full">
          <div className="flex items-center justify-between gap-2 max-md:justify-center max-md:my-auto">
            <div className="flex items-start gap-2">
              {currentTimeSlot?.sale && (
                <span className="text-xs text-primary01 bg-[#F5F4FE] px-2 py-1 rounded-full font-medium border border-[#C3BCF6] max-md:border-0 max-md:bg-transparent">
                  {currentTimeSlot.sale}
                </span>
              )}
            </div>
          </div>
        </div>
      );
    }

    // For month view
    return (
      <div
        className={cn(
          "text-sm mb-1 text-start flex items-start justify-start gap-2 flex-wrap max-md:justify-center",
          !isCurrentMonth ? "text-gray-400" : "text-gray-800",
          {
            "flex-col": !selectTimeFromProvider,
          }
        )}>
        <span
          className={cn({
            "bg-primary01 w-8 h-8 text-white grid place-items-center rounded-full":
              selectTimeFromProvider && isToday,
          })}>
          <span
            className={cn({
              "max-md:bg-primary01 w-8 h-8 max-md:text-white max-md:grid place-items-center rounded-full text-sm -mt-1":
                !selectTimeFromProvider && isToday,
            })}>
            {day.format("DD")}
          </span>

          {!selectTimeFromProvider && isToday && (
            <span className="text-sm text-primary01 border border-gray-300 px-3 py-1 rounded-full ml-2 max-md:hidden">
              Today
            </span>
          )}
        </span>

        {service?.sale && currentTimeSlot?.availableTimeSlots?.length > 0 && (
          <span className="text-xs text-primary01 bg-[#F5F4FE] px-2 py-1 rounded-full font-medium lg:border border-[#C3BCF6] text-wrap max-md:bg-transparent">
            {service.sale}
          </span>
        )}

        {/* <div className="max-lg:hidden"> */}

        {!selectTimeFromProvider && events.length > 0 && (
          <div className="flex flex-col items-start">
            {events.slice(0, maxEventsPerMonthCell).map((event) => (
              <Event key={event.id} event={event} />
            ))}
            {events.length > maxEventsPerMonthCell && (
              <MoreEvents
                events={events}
                maxEventsPerMonthCell={maxEventsPerMonthCell}
              />
            )}
          </div>
        )}
      </div>
    );
  };

  const Element = !selectTimeFromProvider ? "div" : "button";

  return (
    <>
      <Element
        disabled={currentTimeSlot?.isBusy || isPastDay()}
        onClick={selectTimeFromProvider ? () => setIsOpen(true) : null}
        className={cn(
          "border-b border-r border-l border-gray-200 relative overflow-hidden",
          "cursor-pointer transition-colors duration-200",
          dayView ? "w-full p-0" : "p-2",
          {
            "min-h-[120px]": !dayView,
            "min-h-[80px]": dayView,
            "vertical-stripes-bg": currentTimeSlot?.isBusy,
            "disabled:cursor-not-allowed":
              selectTimeFromProvider &&
              (currentTimeSlot?.isBusy || isPastDay()),
            "hover:bg-gray-50": !currentTimeSlot?.isBusy && !isPastDay(),
            "bg-[#F5F4FE] border border-[#866BE7]": selectedTimes.some((time) =>
              dayjs(time.fullDateTime).isSame(day, "day")
            ),
          }
        )}>
        <div
          className={cn("relative z-10 h-full", {
            "p-4": dayView,
          })}>
          {renderContent()}
        </div>
      </Element>

      <EventModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleTimeSubmit}
        selectedDate={day}
        timeSlots={currentTimeSlot?.availableTimeSlots || []}
        dayView={dayView}
      />
    </>
  );
}
