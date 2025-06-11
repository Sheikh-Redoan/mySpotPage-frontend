import dayjs from "dayjs";
import { useState } from "react";
import "/src/styles/fullCalender.css";
import AppointmentActionsBtn from "../../components/client/client-appointment/AppointmentActionsBtn";
import Breadcrumb from "../../components/client/Breadcrumb";
import { getBreadcrumbs } from "../../lib/staticData";
import ReusableCalendar, {
  createEventId,
} from "../../components/reuseableComponent/ReuseableCalendar";
import Container from "./Container";
import Calender from "../../components/calender/Calender";
import { MOCK_EVENTS, MOCK_RESOURCES } from "../../components/calender/mockdata";
import { toYYYYMMDD } from "../../utils/dateFormatter";

let eventGuid = 0;
let todayStr = dayjs().format("YYYY-MM-DD");

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
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T12:00:00",
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

export default function ClientAppointmentCal() {
  const [currentView, setCurrentView] = useState("dayGridMonth");

  const renderDayCellContentWithSales = (dayCellInfo) => {
    const dayNumber = dayCellInfo.date.getDate();
    const formattedDayNumber =
      dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();
    const dateStr = toYYYYMMDD(dayCellInfo.date);
    const specialDateInfo = specialDatesData.find((sd) => sd.date === dateStr);

    return (
      <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-start gap-3">
        {currentView === "dayGridMonth" && (
          <span className="text-[0.875rem] p-[4px] z-1">
            {formattedDayNumber}
          </span>
        )}
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

  return (
    <section className="bg-[#F9FAFC] py-4 px-2 md:px-0 md:py-8">
      <Container>
        <Breadcrumb
          breadcrumbs={getBreadcrumbs(1, 0, [
            {
              name: "Select staff",
              link: "/service-provider-info/select-staff",
            },
          ])}
        />

        <div className="bg-white shadow-md rounded-lg max-sm:py-4 max-sm:px-2 lg:p-6">
          <Calender events={MOCK_EVENTS} resources={MOCK_RESOURCES} selectTimeFromProvider={true} />

          <AppointmentActionsBtn />
        </div>
      </Container>
    </section>
  );
}

// import dayjs from "dayjs";
// import { useState } from "react";
// import "/src/styles/fullCalender.css";
// import AppointmentActionsBtn from "../../components/client/client-appointment/AppointmentActionsBtn";
// import Breadcrumb from "../../components/client/Breadcrumb";
// import { getBreadcrumbs } from "../../lib/staticData";
// import ReusableCalendar, {
//   createEventId,
// } from "../../components/reuseableComponent/ReuseableCalendar";
// import Container from "./Container";
// import { toYYYYMMDD } from "../../utils/toYYYYMMDD";

// let eventGuid = 0;
// let todayStr = dayjs().format("YYYY-MM-DD");

// const specialDatesData = [
//   { date: "2025-05-01", isBusy: true },
//   { date: "2025-05-02", isBusy: true },
//   { date: "2025-05-06", sale: "🔥 25% OFF" },
//   { date: "2025-05-08", isBusy: true },
//   { date: "2025-05-09", isBusy: true },
//   { date: "2025-05-14", sale: "🔥 25% OFF" },
//   { date: "2025-06-15", sale: "🔥 10% OFF", isBusy: true },
//   { date: "2025-05-16", isBusy: true },
//   { date: "2025-06-17", isBusy: true },
//   { date: "2025-06-22", isBusy: true },
//   { date: "2025-06-23", isBusy: true },
//   { date: "2025-06-30", sale: "🔥 50% OFF" },
//   { date: "2025-07-01", sale: "🔥 50% OFF" },
//   { date: "2025-07-02", sale: "🔥 50% OFF" },
// ];

// export const INITIAL_EVENTS = [
//   {
//     id: createEventId(),
//     title: "All-day event",
//     start: todayStr,
//   },
//   {
//     id: createEventId(),
//     title: "Timed event",
//     start: todayStr + "T12:00:00",
//   },
// ];

// const timeSlots = [
//   { time: "08:00", sale: "🔥 29% OFF" },
//   { time: "10:00" },
//   { time: "11:00", sale: "🔥 25% OFF" },
//   { time: "12:00" },
//   { time: "13:00", sale: "🔥 29% OFF" },
//   { time: "14:00" },
//   { time: "15:00" },
//   { time: "16:00" },
//   { time: "17:00" },
// ];

// export default function ClientAppointmentCal() {
//   const [currentView, setCurrentView] = useState("dayGridMonth");

//   const renderDayCellContentWithSales = (dayCellInfo) => {
//     const dayNumber = dayCellInfo.date.getDate();
//     const formattedDayNumber =
//       dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();
//     const dateStr = toYYYYMMDD(dayCellInfo.date);
//     const specialDateInfo = specialDatesData.find((sd) => sd.date === dateStr);

//     return (
//       <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-start gap-3">
//         {currentView === "dayGridMonth" && (
//           <span className="text-[0.875rem] p-[4px] z-1">
//             {formattedDayNumber}
//           </span>
//         )}
//         {specialDateInfo &&
//           specialDateInfo.sale &&
//           !dayCellInfo.isOtherMonth && (
//             <div className="sale-badge">{specialDateInfo.sale}</div>
//           )}
//       </div>
//     );
//   };

//   const renderTimeSlotContent = (slotInfo) => {
//     const time = dayjs(slotInfo.date).format("HH:mm");
//     const specialTimeSlot = timeSlots.find((ts) => ts.time === time);

//     const isBusy = specialDatesData.some(
//       (sd) =>
//         sd.date === toYYYYMMDD(slotInfo.date) &&
//         sd.isBusy &&
//         (specialTimeSlot ? specialTimeSlot.isBusy : false)
//     );

//     if (isBusy) {
//       return (
//         <div className="fc-event-main-frame fc-timegrid-busy-slot">
//           <div className="fc-event-time"></div>
//           <div className="fc-event-title fc-sticky"></div>
//         </div>
//       );
//     }

//     return (
//       <div className="fc-event-main-frame">
//         {specialTimeSlot && specialTimeSlot.sale && (
//           <div className="sale-badge-timegrid">{specialTimeSlot.sale}</div>
//         )}
//       </div>
//     );
//   };

//   const renderCustomDayHeaderContent = (arg) => {
//     const dayNumber = arg.date.getDate();
//     const formattedDayNumber =
//       dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();

//     return (
//       <div className="custom-day-header-content">
//         <div className="custom-day-header-weekday">
//           {arg.date.toLocaleString("en-US", { weekday: "short" })}
//         </div>
//         <div className="custom-day-header-day">{formattedDayNumber}</div>
//       </div>
//     );
//   };

//   return (
//     <section className="bg-[#F9FAFC] py-4 px-2 md:px-0 md:py-8">
//       <Container>
//         <Breadcrumb
//           breadcrumbs={getBreadcrumbs(1, 0, [
//             {
//               name: "Select staff",
//               link: "/service-provider-info/select-staff",
//             },
//           ])}
//         />

//         <div className="bg-white shadow-md rounded-lg max-sm:py-4 max-sm:px-2 lg:p-6">
//           <ReusableCalendar
//             initialEvents={INITIAL_EVENTS}
//             specialDatesData={specialDatesData}
//             timeSlots={timeSlots}
//             currentView={currentView}
//             setCurrentView={setCurrentView}
//             renderDayCellContent={renderDayCellContentWithSales}
//             renderSlotLaneContent={renderTimeSlotContent}
//             renderDayHeaderContent={renderCustomDayHeaderContent}
//             selectable={true}
//           />

//           <AppointmentActionsBtn />
//         </div>
//       </Container>
//     </section>
//   );
// }
