import dayjs from "dayjs";
import "/src/styles/fullCalender.css";
import ReusableCalendar from "../reuseableComponent/ReuseableCalendar";
import AppointmentActionsBtn from "../client/client-appointment/AppointmentActionsBtn";

// Define the static data for this specific page
const specialDatesData = [
  { date: "2025-05-01", isBusy: true },
  { date: "2025-05-02", isBusy: true },
  { date: "2025-05-06", sale: "🔥 25% OFF" },
  { date: "2025-05-08", isBusy: true },
  { date: "2025-05-09", isBusy: true },
  { date: "2025-05-14", sale: "🔥 25% OFF" },
  { date: "2025-06-15", sale: "🔥 10% OFF", isBusy: true },
  { date: "2025-05-16", isBusy: true },
  { date: "2025-06-17", isBusy: true },
  { date: "2025-06-22", isBusy: true },
  { date: "2025-06-23", isBusy: true },
  { date: "2025-06-30", sale: "🔥 50% OFF" },
  { date: "2025-07-01", sale: "🔥 50% OFF" },
  { date: "2025-07-02", sale: "🔥 50% OFF" },
];

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    start: dayjs().format("YYYY-MM-DD"), // Using dayjs for today's date
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: dayjs().format("YYYY-MM-DD") + "T12:00:00",
  },
];

const timeSlots = [
  { time: "08:00", sale: "🔥 29% OFF" },
  { time: "10:00" },
  { time: "11:00", sale: "🔥 25% OFF" },
  { time: "12:00" },
  { time: "13:00", sale: "🔥 29% OFF" },
  { time: "14:00" },
  { time: "15:00" },
  { time: "16:00" },
  { time: "17:00" },
];

// Helper to convert date to YYYY-MM-DD (could be a utility function)
const toYYYYMMDD = (dateInput) => {
  const d = new Date(dateInput);
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

export default function AllAppointment() {
  // Define the rendering functions specific to this page
  const renderDayCellContentWithSales = (dayCellInfo) => {
    const dayNumber = dayCellInfo.date.getDate();
    const formattedDayNumber =
      dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();
    const dateStr = toYYYYMMDD(dayCellInfo.date);
    const specialDateInfo = specialDatesData.find((sd) => sd.date === dateStr);

    return (
      <div className="custom-day-cell-content">
        <span className="custom-day-number">{formattedDayNumber}</span>
        {specialDateInfo &&
          specialDateInfo.sale &&
          !dayCellInfo.isOtherMonth && (
            <div className="sale-badge">{specialDateInfo.sale}</div>
          )}
      </div>
    );
  };

  const renderTimeSlotContent = (slotInfo) => {
    const time = dayjs(slotInfo.date).format("HH:mm");
    const specialTimeSlot = timeSlots.find((ts) => ts.time === time);

    const isBusy = specialDatesData.some(
      (sd) =>
        sd.date === toYYYYMMDD(slotInfo.date) &&
        sd.isBusy &&
        (specialTimeSlot ? specialTimeSlot.isBusy : false)
    );

    if (isBusy) {
      return (
        <div className="fc-event-main-frame fc-timegrid-busy-slot">
          <div className="fc-event-time"></div>
          <div className="fc-event-title fc-sticky"></div>
        </div>
      );
    }

    return (
      <div className="fc-event-main-frame">
        {specialTimeSlot && specialTimeSlot.sale && (
          <div className="sale-badge-timegrid">{specialTimeSlot.sale}</div>
        )}
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

  // If you needed custom date click behavior for THIS page, you'd define it here.
  // For now, we'll let ReusableCalendar handle the default modal behavior.
  // const myCustomDateClickHandler = (clickInfo) => {
  //   console.log("Date clicked on AllAppointment page:", clickInfo.dateStr);
  //   // You could open a different modal, navigate, etc.
  // };

  return (
    <section className="bg-[#F9FAFC] py-4 px-2 md:px-0">
      <div className="bg-white shadow-md rounded-lg max-sm:py-4 max-sm:px-2 lg:p-6">
        <ReusableCalendar
          initialEvents={INITIAL_EVENTS}
          specialDatesData={specialDatesData}
          timeSlots={timeSlots}
          renderDayCellContent={renderDayCellContentWithSales}
          renderSlotLaneContent={renderTimeSlotContent}
          renderDayHeaderContent={renderCustomDayHeaderContent}
          // Uncomment and use if you want to override ReusableCalendar's default dateClick behavior
          // onDayClick={myCustomDateClickHandler}
        />

        {/* Appointment Actions Button */}
        <AppointmentActionsBtn />
      </div>
    </section>
  );
}