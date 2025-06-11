import dayjs from "dayjs";
import { Clock } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import EventModal from "../selectTimeComponents/EventModal";

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
  weekView = false,
  dayView = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const isPastDay = () => {
    const today = dayjs().startOf("day");
    return day.isBefore(today);
  };

  const getCurrentTimeSlot = () => {
    if (!dayView || !timeSlots || !timeSlots[index]) return null;
    const currentTime = dayjs(timeSlots[index]).format("HH:mm");

    const dateData = service?.timeSlots?.find(
      (slot) => slot.time === currentTime
    );
    return dateData || { time: currentTime, isBusy: false, sale: null };
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
    if (dayView && currentTimeSlot) {
      return (
        <div className="flex flex-col h-full w-full">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">
                {currentTimeSlot.time}
              </span>
            </div>
            {currentTimeSlot.sale && (
              <span className="text-xs text-primary01 bg-[#F5F4FE] px-2 py-1 rounded-full font-medium border border-[#C3BCF6]">
                {currentTimeSlot.sale}
              </span>
            )}
          </div>
        </div>
      );
    }

    return (
      <>
        <div
          className={cn(
            "text-sm mb-1 text-start flex items-center justify-start gap-2",
            !isCurrentMonth ? "text-gray-400" : "text-gray-800"
          )}>
          {!weekView && (
            <span
              className={cn({
                "bg-primary01 w-8 h-8 text-white grid place-items-center rounded-full":
                  selectTimeFromProvider && isToday,
              })}>
              {day.format("D")}
            </span>
          )}
          {service?.sale && (
            <span className="text-xs text-primary01 bg-[#F5F4FE] px-2 py-1 rounded-full font-medium border border-[#C3BCF6]">
              {service.sale}
            </span>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <button
        disabled={currentTimeSlot?.isBusy || isPastDay()}
        onClick={() => setIsOpen(true)}
        className={cn(
          "p-2 border-b border-r border-gray-200",
          "cursor-pointer transition-colors duration-200",
          {
            "min-h-[120px]": !dayView,
            "min-h-[80px]": dayView,
            "vertical-stripes-bg": currentTimeSlot?.isBusy,
            "bg-[#F5F4FE] border border-[#866BE7]": selectedTimes.some((time) =>
              dayjs(time.fullDateTime).isSame(day, "day")
            ),
            "disabled:cursor-not-allowed":
              currentTimeSlot?.isBusy || isPastDay(),
            "hover:bg-gray-50": !currentTimeSlot?.isBusy && !isPastDay(),
          }
        )}>
        {renderContent()}
      </button>

      <EventModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleTimeSubmit}
        selectedDate={day}
        timeSlots={service?.timeSlots}
        dayView={dayView}
      />
    </>
  );
}
