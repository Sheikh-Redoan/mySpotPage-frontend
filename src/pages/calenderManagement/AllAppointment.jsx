import { Avatar } from "antd";
import dayjs from "dayjs";
import { User } from "lucide-react";
import { useState } from "react";
import { ClientAppointmentItem } from "../../components/calendarManagement/allAppointment/ClientAppointmentItem";
import ReusableCalendar, {
  createEventId,
} from "../../components/reuseableComponent/ReuseableCalendar";
import { toYYYYMMDD } from "../../utils/toYYYYMMDD"; // Utility function to format date
import "/src/styles/AllApointment.css";

// Ensure AppointmentStatusesAction is a standalone component for import
// If it was defined inside another component previously, it needs to be extracted.
// For this example, I'll assume it's already a separate export.
// If not, you might need to adjust the import path or define it here.

// Dummy data for appointments, structured by date
const dummyAllAppointments = {
  // Example for today
  [dayjs().format("YYYY-MM-DD")]: [
    { time: "14:00", clientName: "Emily", isPremium: false },
    { time: "15:00", clientName: "Alexander", isPremium: true },
    { time: "16:00", clientName: "Scarlett", isPremium: false },
  ],
  // Example for tomorrow
  [dayjs().add(1, "day").format("YYYY-MM-DD")]: [
    { time: "09:00", clientName: "John Doe", isPremium: false },
    { time: "10:30", clientName: "Jane Smith", isPremium: false },
  ],
  // Example for a past date
  [dayjs().subtract(2, "day").format("YYYY-MM-DD")]: [
    { time: "11:00", clientName: "Michael Brown", isPremium: true },
  ],
};

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
  const [currentView, setCurrentView] = useState("resourceTimeGridDay"); // Default view
  // State to hold all appointments, keyed by date string
  const [allAppointments, setAllAppointments] = useState(dummyAllAppointments);

  const renderDayCellContent = (dayCellInfo) => {
    // console.log("Rendering day cell content for:", dayCellInfo);
    const dayNumber = dayCellInfo.date.getDate();
    const formattedDayNumber =
      dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();
    const dateStr = toYYYYMMDD(dayCellInfo.date); // Format date to YYYY-MM-DD for lookup

    // Get appointments for the current day cell
    const appointmentsForDay = allAppointments[dateStr] || [];

    if (currentView === "dayGridMonth") {
      return (
        <div className="flex flex-col justify-start w-full h-full p-2">
          <div className="flex items-center justify-start active">
            <span className="text-[0.875rem] p-[4px]">
              {formattedDayNumber}
              {dayCellInfo.isToday && (
                <span className="border border-primary01 rounded-full px-2 py-0.5 text-xs text-primary01 ml-3">
                  Today
                </span>
              )}
            </span>
          </div>

          {/* All Appointedment User List By Date */}
          <div className="flex flex-col gap-1 items-start justify-start w-full">
            {appointmentsForDay.length > 0 ? (
              appointmentsForDay.map((appointment, index) => (
                <ClientAppointmentItem
                  key={`${dateStr}-${index}`} // Unique key for each appointment
                  time={appointment.time}
                  clientName={appointment.clientName}
                  isPremium={appointment.isPremium}
                />
              ))
            ) : (
              <p className="text-xs text-gray-500 p-1">
                {/* No appointments for this date. */}
              </p> // Removed text to avoid clutter, can be re-added if desired
            )}
          </div>
        </div>
      );
    }
    return null; // Return null for other views if not handled
  };

  const slotLabelContent = (arg) => {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 80 }}
          icon={<User />}
        />
        <span className="text-lg font-medium">John doe</span>
        {/* Additional content can be added here if needed */}
      </div>
    );
  };

  const renderSlotLaneContent = (arg) => {
    console.log("Rendering custom slot lane content for:", arg);

    return (
      <div className="flex items-center justify-center h-full w-full">
        <span className="text-sm font-medium text-gray-700">Booking</span>
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
          onDayClick={() => null} // Placeholder for day click handler
          currentView={currentView}
          setCurrentView={setCurrentView}
          applyFilter={true} // Assuming this prop controls some filtering UI
          slotLabelContent={slotLabelContent} // Custom slot label content
          renderSlotLaneContent={renderSlotLaneContent} // Custom slot lane content
          renderTimeCellContent={(arg) => (
            <div className="flex items-center justify-center h-full w-full">
              <span className="text-sm font-medium text-gray-700">
                {arg.timeText}
              </span>
            </div>
          )} // Custom time cell content
        />
      </div>
    </section>
  );
}
