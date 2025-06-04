import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
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

/**
 * A reusable calendar component that provides a full-featured calendar with event management,
 * date selection, and customizable views. It supports both day and time grid views, allowing
 * users to navigate, select dates, and view events. Special dates can be marked as busy or
 * have custom styling. The component also includes a modal for adding new events with a
 * selected time.
 *
 * @param {Array} initialEvents - An array of initial events to display on the calendar.
 * @param {Array} specialDatesData - An array of special dates information including busy dates.
 * @param {Array} timeSlots - An array of available time slots for event scheduling.
 * @param {Function} renderDayCellContent - A function to render custom content in a day cell.
 * @param {Function} renderSlotLaneContent - A function to render content in the slot lane.
 * @param {Function} renderDayHeaderContent - A function to render custom content in the day header.
 * @param {Function} onDayClick - A callback function to handle clicks on a day cell.
 * @param {string} currentView - The initial view of the calendar (e.g., "dayGridMonth").
 * @param {Function} setCurrentView - A function to update the current view state.
 */
export default function ReusableCalendar({
  initialEvents = [],
  specialDatesData = [],
  timeSlots = [],
  renderDayCellContent,
  renderSlotLaneContent,
  renderDayHeaderContent,
  onDayClick,
  currentView = "dayGridMonth",
  setCurrentView,
  applyFilter,
  ...props
}) {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const calendarRef = useRef(null);
  const [highlightedDate, setHighlightedDate] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSelectInfo, setModalSelectInfo] = useState(null);

  /**
   * Handles date clicks within the calendar. If the clicked date is not busy (i.e.
   * marked as `isBusy` in the `specialDatesData` prop), it sets the `highlightedDate`
   * state to the selected date and opens the modal if the current view is "dayGridMonth".
   * If the clicked date is busy, it simply logs a message and resets the `highlightedDate`
   * state to null.
   * @param {import("@fullcalendar/react").DateClickArg} clickInfo
   */
  const handleInternalDateClick = (clickInfo) => {
    const clickedDate = clickInfo.date;
    const clickedDateStr = toYYYYMMDD(clickedDate);

    const specialDateInfo =
      specialDatesData &&
      specialDatesData.find((sd) => sd.date === clickedDateStr);

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

  /**
   * Handles the submission of the modal that appears when a date is clicked
   * within the calendar. It takes the selected time from the modal and adds a
   * new event to the calendar with the selected date and time. If the date is
   * invalid, it logs an error and does not add the event.
   * @param {{ time: string }} timeObj An object containing the selected time
   * in the format "HH:MM".
   */
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
      title: "New Appointment",
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

  /**
   * Handles the navigation buttons (prev/next) in the calendar header.
   * Changes the calendar view to the previous or next month, and updates the selected date and current view state accordingly.
   * @param {string} direction - "prev" or "next" to navigate to the previous or next month.
   */
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

  /**
   * Handles the "Today" button click in the calendar header.
   * Sets the calendar view to the current day and updates the selected date and current view state accordingly.
   */
  const handleTodayClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
      setSelectedDate(dayjs());
      setCurrentView(calendarApi.view.type);
    }
  };

  /**
   * Handles the change of the calendar view.
   * Changes the calendar to the specified view and updates the current view state.
   * @param {string} view - The view type to change to (e.g., "dayGridMonth", "timeGridWeek").
   */
  const handleViewChange = (view) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(view);
      setCurrentView(view);
    }
  };

  /**
   * Returns an array of class names to be applied to the day cells in the
   * calendar based on the date and the specialDatesData.
   * If the date matches the highlightedDate, the class "custom-selected-date" is added.
   * If the date is in the specialDatesData and isBusy is true, the class "custom-busy-date" is added.
   * @param {{ date: Date }} arg - The day cell date to be evaluated.
   * @returns {string[]} An array of class names to be applied to the day cell.
   */
  function dayCellClassNamesFunc(arg) {
    const dateStr = toYYYYMMDD(arg.date);
    const classes = [];
    const specialDateInfo =
      specialDatesData && specialDatesData.find((sd) => sd.date === dateStr);

    if (dateStr === highlightedDate) {
      classes.push("custom-selected-date");
    }

    if (specialDateInfo && specialDateInfo.isBusy) {
      classes.push("custom-busy-date");
    }
    return classes;
  }

  /**
   * Determines whether a date/time selection is allowed in the calendar.
   * If the current view is "dayGridMonth", it checks if the selected start
   * date is marked as busy in the `specialDatesData` prop. If so, the selection
   * is disallowed (returns false). Otherwise, the selection is allowed (returns true).
   * @param {Object} selectInfo - An object containing details about the date/time selection.
   * @returns {boolean} - Returns false if the date is busy and in "dayGridMonth" view, true otherwise.
   */
  const handleSelectAllow = (selectInfo) => {
    if (currentView === "dayGridMonth") {
      const startDateStr = toYYYYMMDD(selectInfo.start);
      const specialDateInfo =
        specialDatesData &&
        specialDatesData.find((sd) => sd.date === startDateStr);
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
        applyFilter={applyFilter}
      />
      <FullCalendar
        schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          resourceTimelinePlugin,
          resourceTimeGridPlugin,
        ]}
        key={currentView}
        ref={calendarRef}
        headerToolbar={false}
        initialView={currentView}
        editable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        initialEvents={initialEvents}
        dateClick={onDayClick ? onDayClick : handleInternalDateClick}
        dayCellClassNames={dayCellClassNamesFunc}
        selectAllow={handleSelectAllow}
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
        dayHeaderContent={
          currentView === "timeGridWeek" || currentView === "timeGridDay"
            ? renderDayHeaderContent
            : null
        }
        slotLaneContent={renderSlotLaneContent || null}
        {...props}
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
        height="auto"
        aspectRatio={2}
      />
    </>
  );
}
