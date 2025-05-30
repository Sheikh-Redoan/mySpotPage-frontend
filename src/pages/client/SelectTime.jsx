import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import EventModal from "../../components/selectTimeComponents/EventModal";
import Container from "./Container";

let eventGuid = 0;
let todayStr = dayjs().format('YYYY-MM-DD'); 

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

function renderEventContent(eventInfo) {
  return (
    <>
      {/* <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i> */}
    </>
  );
}

const toYYYYMMDD = (dateInput) => {
  const d = new Date(dateInput);
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

export default function SelectTime() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
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

  // Triggered when a date/time selection is made
  function handleDateSelect(selectInfo) {
    const startDateStr = toYYYYMMDD(selectInfo.start);
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

    if (currentView === "dayGridMonth") {
      if (!specialDateInfo || !specialDateInfo.isBusy) {
        setHighlightedDate(clickedDateStr);
        setModalSelectInfo(clickInfo);
        setIsModalOpen(true);
      } else {
        console.log("This date is busy and cannot be selected.");
        setHighlightedDate(null);
      }
    } else {
      setHighlightedDate(null); 
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

  function handleEventClick(clickInfo) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
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
      <div className="custom-day-cell-content">
        <span className="custom-day-number">{formattedDayNumber}</span>
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

  return (
    <section className="bg-[#F9FAFC] py-4 px-2 md:px-0 md:py-8">
      <Container className="bg-white shadow-md rounded-lg max-sm:py-4 max-sm:px-2 lg:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              className="cursor-pointer"
              onClick={() => handleNavButtonClick("prev")}>
              <img src="/src/assets/icons/left_arrow.svg" alt="Left Arrow" />
            </button>
            <DatePicker
              onChange={onDatePickerChange}
              picker="month"
              value={selectedDate}
              format="MMMM YYYY" 
              allowClear={false}
              className="w-40"
            />
            <button
              className="cursor-pointer ml-1"
              onClick={() => handleNavButtonClick("next")}>
              <img src="/src/assets/icons/right_arrow.svg" alt="Right Arrow" />
            </button>
            <button
              className="text-[#866be7] cursor-pointer text-[14px] font-semibold"
              onClick={() => {
                if (calendarRef.current) {
                  const calendarApi = calendarRef.current.getApi();
                  calendarApi.today();
                  setSelectedDate(dayjs());
                  setCurrentView(calendarApi.view.type);
                }
              }}>
              Today
            </button>
          </div>

          <div className="flex border border-gray-200 rounded-lg">
            <button
              className={`px-5 py-1 md:py-1.5 cursor-pointer rounded-md text-sm ${
                currentView === "dayGridMonth"
                  ? "bg-[#866BE7] text-white"
                  : ""
              }`}
              onClick={() => handleViewChange("dayGridMonth")}
            >
              Month
            </button>
            <button
              className={`px-5 py-1.5 cursor-pointer rounded-md text-sm ${
                currentView === "timeGridWeek" ? "bg-[#866BE7] text-white" : ""
              }`}
              onClick={() => handleViewChange("timeGridWeek")}
            >
              Week
            </button>
            <button
              className={`px-5 py-1.5 cursor-pointer rounded-md text-sm ${
                currentView === "timeGridDay" ? "bg-[#866BE7] text-white" : ""
              }`}
              onClick={() => handleViewChange("timeGridDay")}
            >
              Day
            </button>
          </div>
        </div>

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
          select={handleDateSelect}
          dateClick={handleDateClickForHighlight}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
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
          slotLabelClassNames="custom-slot-label"
          // Conditionally render dayHeaderContent based on currentView
          dayHeaderContent={
            currentView === "timeGridWeek" || currentView === "timeGridDay"
              ? (arg) => (
                  <div className="custom-day-header-content">
                    <div className="custom-day-header-weekday">
                      {arg.date.toLocaleString("en-US", { weekday: "short" })}
                    </div>
                    <div className="custom-day-header-day">
                      {arg.date.getDate()}
                    </div>
                  </div>
                )
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

        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <p className="text-[#3D3D3D] text-sm">
            No suitable time slot?{" "}
            <Link
              to="#"
              className="hover:text-indigo-700 text-[#744CDB] text-sm underline">
              Join our waitlist!
            </Link>
          </p>
          <button className="px-6 py-2 text-[#82868E] bg-[#E5E7E8] rounded-md hover:bg-[#ECEBFC] transition-colors cursor-pointer">
            Continue
          </button>
        </div>
      </Container>
    </section>
  );
}
