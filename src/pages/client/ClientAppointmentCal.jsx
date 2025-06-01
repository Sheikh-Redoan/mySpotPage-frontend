import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from "dayjs";
import {  useRef, useState } from "react";
import EventModal from "../../components/selectTimeComponents/EventModal";
import Container from "./Container";
import Breadcrumb from "../../components/client/Breadcrumb";
import { getBreadcrumbs } from "../../lib/staticData";
import "/src/styles/fullCalender.css";
import AppointmentActionsBtn from "../../components/client/client-appointment/AppointmentActionsBtn";
import CalendarToolbar from "../../components/reuseableComponent/CalendarToolbar";

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

export function createEventId() {
  return String(eventGuid++);
}

const toYYYYMMDD = (dateInput) => {
  const d = new Date(dateInput);
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

export default function ClientAppointmentCal() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const calendarRef = useRef(null);
  const [highlightedDate, setHighlightedDate] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSelectInfo, setModalSelectInfo] = useState(null);

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

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  const handleTodayClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
      setSelectedDate(dayjs());
      setCurrentView(calendarApi.view.type);
    }
  };

  // Triggered when a date/time selection is made
  function handleDateSelect(selectInfo) {
    const startDateStr = toYYYYMMDD(selectInfo.start);
    console.log("selectInfo", selectInfo.start, selectInfo.end);
    const endDateStr = toYYYYMMDD(selectInfo.end);

    if (
      startDateStr === endDateStr ||
      (selectInfo.allDay &&
        new Date(selectInfo.start).getTime() ===
          new Date(selectInfo.end).getTime() - 86400000)
    )
      if (
        startDateStr === endDateStr ||
        (selectInfo.allDay &&
          new Date(selectInfo.start).getTime() ===
            new Date(selectInfo.end).getTime() - 86400000)
      ) {
        setHighlightedDate(startDateStr);
        selectInfo.view.calendar.unselect();
      } else {
        console.log("Multi-day selection detected:", selectInfo);
        selectInfo.view.calendar.unselect();
      }
  }

  // Triggered when the user clicks on a date or a time
  const handleDateClickForHighlight = (clickInfo) => {
    const clickedDate = clickInfo.date;
    const clickedDateStr = toYYYYMMDD(clickedDate);

    const specialDateInfo = specialDatesData.find(
      (sd) => sd.date === clickedDateStr
    );

    if (!specialDateInfo || !specialDateInfo.isBusy) {
      setHighlightedDate(clickedDateStr);
    } else {
      console.log("This date is busy and cannot be selected.");
      setHighlightedDate(null);
    }

    if (currentView === "dayGridMonth") {
      if (!specialDateInfo || !specialDateInfo.isBusy) {
        setModalSelectInfo(clickInfo);
        setIsModalOpen(true);
      }
    } else {
      console.log(`Date clicked in ${currentView} view. Modal will not open.`);
    }

    clickInfo.view.calendar.unselect();
  };

  function handleModalSubmit({ time }) {
    const calendarApi = modalSelectInfo.view.calendar;
    const startDate = new Date(modalSelectInfo.date);
    const [hours, minutes] = time.split(":");
    startDate.setHours(parseInt(hours), parseInt(minutes), 0);

    if (isNaN(startDate.getTime())) {
      console.error("Invalid date generated. Cannot add event.");
      return;
    }

    calendarApi.addEvent({
      id: createEventId(),
      start: startDate.toISOString(),
      allDay: false,
    });
    setHighlightedDate(toYYYYMMDD(startDate));
    setIsModalOpen(false);
    calendarApi.select(startDate);
  }

  const onDatePickerChange = (date) => {
    if (date && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(date.toDate());
      setSelectedDate(dayjs(date));
    }
  };

  const handleNavButtonClick = (direction) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      if (direction === "prev") {
        calendarApi.prev();
      } else if (direction === "next") {
        calendarApi.next();
      }
      const currentDate = calendarApi.getDate();
      setSelectedDate(dayjs(currentDate));
      setCurrentView(calendarApi.view.type);
    }
  };

  const handleViewChange = (view) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(view);
      setCurrentView(view);
    }
  };

  function dayCellClassNamesFunc(arg) {
    const dateStr = toYYYYMMDD(arg.date);
    const classes = [];
    const specialDateInfo = specialDatesData.find((sd) => sd.date === dateStr);

    if (dateStr === highlightedDate) {
      classes.push("custom-selected-date");
    }

    if (specialDateInfo && specialDateInfo.isBusy) {
      classes.push("custom-busy-date");
    }
    return classes;
  }

  function renderDayCellContentWithSales(dayCellInfo) {
    const dayNumber = dayCellInfo.date.getDate();
    const formattedDayNumber =
      dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();
    const dateStr = toYYYYMMDD(dayCellInfo.date);
    const specialDateInfo = specialDatesData.find((sd) => sd.date === dateStr);

    return (
      <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-start gap-3">
        {
          currentView === "dayGridMonth" && (
            <span className="text-[0.875rem] p-[4px] z-1">{formattedDayNumber}</span>
          )
        }
        {specialDateInfo &&
          specialDateInfo.sale &&
          !dayCellInfo.isOtherMonth && (
            <div className="sale-badge">{specialDateInfo.sale}</div>
          )}
      </div>
    );
  }

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

  const handleSelectAllow = (selectInfo) => {
    if (currentView === "dayGridMonth") {
      const startDateStr = toYYYYMMDD(selectInfo.start);
      const specialDateInfo = specialDatesData.find(
        (sd) => sd.date === startDateStr
      );
      if (specialDateInfo && specialDateInfo.isBusy) {
        return false;
      }
    }
    return true;
  };

  // custom day header content for timeGridWeek and timeGridDay
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
          {/* Calender Header Toolbar */}
          <CalendarToolbar
            selectedDate={selectedDate}
            onDatePickerChange={onDatePickerChange}
            handleNavButtonClick={handleNavButtonClick}
            handleTodayClick={handleTodayClick}
            currentView={currentView}
            handleViewChange={handleViewChange}
          />

          <FullCalendar
            key={currentView}
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={false}
            initialView={currentView}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            initialEvents={INITIAL_EVENTS}
            // select={handleDateSelect}
            dateClick={handleDateClickForHighlight}
            dayCellClassNames={dayCellClassNamesFunc}
            selectAllow={handleSelectAllow}
            dayCellContent={renderDayCellContentWithSales}
            // TimeGrid specific props
            slotMinTime="08:00:00"
            slotMaxTime="18:00:00"
            slotDuration="01:00:00"
            snapDuration="01:00:00"
            scrollTime="08:00:00"
            allDaySlot={false}
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              meridiem: false,
            }}
            dayHeaderContent={
              currentView === "timeGridWeek" || currentView === "timeGridDay"
                ? renderCustomDayHeaderContent
                : null
            }
            slotLaneContent={renderTimeSlotContent}
          />

          <EventModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setHighlightedDate(null);
            }}
            onSubmit={handleModalSubmit}
            selectedDate={
              modalSelectInfo ? new Date(modalSelectInfo.date) : new Date()
            }
            timeSlots={timeSlots}
          />

          {/* Appointment Actions Button */}
          <AppointmentActionsBtn />
        </div>
      </Container>
    </section>
  );
}
