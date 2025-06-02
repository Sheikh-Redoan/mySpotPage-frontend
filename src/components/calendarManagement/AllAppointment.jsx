import dayjs from "dayjs";
import "/src/styles/fullCalender.css";
import ReusableCalendar, { createEventId } from "../reuseableComponent/ReuseableCalendar";
import AppointmentActionsBtn from "../client/client-appointment/AppointmentActionsBtn";
import { useState } from "react";
import { toYYYYMMDD } from "../../utils/toYYYYMMDD";

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    start: dayjs().format("YYYY-MM-DD"),
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: dayjs().format("YYYY-MM-DD") + "T12:00:00",
  },
];

export default function AllAppointment() {
  const [currentView, setCurrentView] = useState("dayGridMonth");

  const renderDayCellContent = (dayCellInfo) => {
    const dayNumber = dayCellInfo.date.getDate();
    const formattedDayNumber =
      dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();
    const dateStr = toYYYYMMDD(dayCellInfo.date);

    return (
      <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-start gap-3">
        {
          currentView === "dayGridMonth" && (
            <span className="text-[0.875rem] p-[4px] z-1">{formattedDayNumber}</span>
          )
        }
      </div>
    );
  };

  const renderCustomDayHeaderContent = (arg) => {
    const dayNumber = arg.date.getDate();
    const formattedDayNumber =
      dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();

    return (
      <div className="custom-day-header-content">
        <div className="custom-day-header-weekday">
          {arg.date.toLocaleString("en-US", { weekday: "short" })}
        </div>
        <div className="custom-day-header-day">{formattedDayNumber}</div>
      </div>
    );
  };

  return (
    <section className="bg-[#F9FAFC] py-4 px-2 md:px-0">
      <div className="bg-white shadow-md rounded-lg max-sm:py-4 max-sm:px-2 lg:p-6">
        <ReusableCalendar
          initialEvents={INITIAL_EVENTS}
          renderDayCellContent={renderDayCellContent}
          renderDayHeaderContent={renderCustomDayHeaderContent}
          onDayClick={() => null}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      </div>
    </section>
  );
}