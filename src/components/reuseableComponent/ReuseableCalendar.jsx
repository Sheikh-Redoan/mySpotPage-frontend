// src/components/common/ReusableCalendar.jsx
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import EventModal from "../selectTimeComponents/EventModal";
import CalendarToolbar from "./CalendarToolbar";

let eventGuid = 0;
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

export default function ReusableCalendar({
  initialEvents = [],
  specialDatesData = [],
  timeSlots = [],
  // New props for custom rendering and date click behavior
  renderDayCellContent,
  renderSlotLaneContent,
  renderDayHeaderContent,
  onDayClick, // A prop to override the default date click logic
}) {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const calendarRef = useRef(null);
  const [highlightedDate, setHighlightedDate] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSelectInfo, setModalSelectInfo] = useState(null);

  // Default internal handler for date clicks (used if onDayClick prop is not provided)
  const handleInternalDateClick = (clickInfo) => {
    const clickedDate = clickInfo.date;
    const clickedDateStr = toYYYYMMDD(clickedDate);

    const specialDateInfo = specialDatesData.find(
      (sd) => sd.date === clickedDateStr
    );

    if (!specialDateInfo || !specialDateInfo.isBusy) {
      setHighlightedDate(clickedDateStr);
      if (currentView === "dayGridMonth") {
        setModalSelectInfo(clickInfo);
        setIsModalOpen(true);
      }
    } else {
      console.log("This date is busy and cannot be selected.");
      setHighlightedDate(null);
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
      title: "New Appointment", // You might want to get this from the modal or pass as prop
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

  const handleTodayClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
      setSelectedDate(dayjs());
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

  // Keep dayCellClassNamesFunc internal as it depends on highlightedDate
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
    <>
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
        initialEvents={initialEvents}
        dateClick={onDayClick ? onDayClick : handleInternalDateClick} // Use prop or internal handler
        dayCellClassNames={dayCellClassNamesFunc}
        selectAllow={handleSelectAllow}
        // Use prop for day cell content, default to null for FC's default
        dayCellContent={renderDayCellContent || null}
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
        // Use prop for day header content, default to null for FC's default
        dayHeaderContent={renderDayHeaderContent || null}
        // Use prop for slot lane content, default to null for FC's default
        slotLaneContent={renderSlotLaneContent || null}
      />

      {/* The EventModal is kept here, but its triggering depends on onDayClick prop */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setHighlightedDate(null);
        }}
        onSubmit={handleModalSubmit}
        selectedDate={modalSelectInfo ? new Date(modalSelectInfo.date) : new Date()}
        timeSlots={timeSlots}
      />
    </>
  );
}