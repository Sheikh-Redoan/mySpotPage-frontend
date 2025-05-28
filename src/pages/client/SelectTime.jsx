import React, { useState, useRef, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Container from "./Container";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, "");

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
  console.log("eventInfo", eventInfo);
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

// Utility to format a Date object or date string to YYYY-MM-DD
const toYYYYMMDD = (dateInput) => {
  const d = new Date(dateInput);
  const year = d.getFullYear();
  const month = (`0${d.getMonth() + 1}`).slice(-2);
  const day = (`0${d.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};

export default function SelectTime() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentView, setCurrentView] = useState("dayGridMonth"); 
  const calendarRef = useRef(null);

  const [highlightedDate, setHighlightedDate] = useState(null);

  // Update currentView when the calendar view changes
  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      setCurrentView(calendarApi.view.type);
      const viewDidMountHandler = () => { 
        setCurrentView(calendarApi.view.type);
      };
      calendarApi.on("viewDidMount", viewDidMountHandler);

      return () => { 
        calendarApi.off("viewDidMount", viewDidMountHandler);
      };
    }
  }, []);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleDateSelect(selectInfo) {
    console.log("select infol", selectInfo);
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
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
    // console.log("events", events);
    setCurrentEvents(events);
  }

  const onDatePickerChange = (date) => {
    if (date && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(date.toDate());
      setSelectedDate(date);
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
    }
  };

  // Handle view change and update currentView state
  const handleViewChange = (view) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(view);
      setCurrentView(view);
    }
  };

  // Function to add custom classes to day cells
  function dayCellClassNamesFunc(arg) {
    const dateStr = toYYYYMMDD(arg.date);
    const classes = [];
    const specialDateInfo = specialDatesData.find(sd => sd.date === dateStr);

    if (dateStr === highlightedDate) {
      classes.push('custom-selected-date');
    }

    if (specialDateInfo && specialDateInfo.isBusy) {
      classes.push('custom-busy-date');
    }
    return classes;
  }

  // Handler for clicking a date to "select" it (custom highlight)
  const handleDateClickForHighlight = (clickInfo) => {
    // console.log("clickInfo", clickInfo);
    const clickedDateStr = clickInfo.dateStr;
    const specialDateInfo = specialDatesData.find(sd => sd.date === clickedDateStr);

    if (specialDateInfo && specialDateInfo.isBusy) {
      console.log("This date is busy and cannot be highlighted.");
      return;
    }
    setHighlightedDate(clickedDateStr);
    clickInfo.view.calendar.unselect();
  };

  // Function to render day cell content (number + sale badge)
  function renderDayCellContentWithSales(dayCellInfo) {
    const dayNumber = dayCellInfo.date.getDate();
    const formattedDayNumber = dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();
    const dateStr = toYYYYMMDD(dayCellInfo.date);
    const specialDateInfo = specialDatesData.find(sd => sd.date === dateStr);

    return (
      <div className="custom-day-cell-content">
        <span className="custom-day-number">{formattedDayNumber}</span>
        {specialDateInfo && specialDateInfo.sale && !dayCellInfo.isOtherMonth && (
          <div className="sale-badge">
            {specialDateInfo.sale}
          </div>
        )}
      </div>
    );
  }

  // Prevent selection (for event creation) on busy dates
  const handleSelectAllow = (selectInfo) => {
    const startDateStr = toYYYYMMDD(selectInfo.start);
    const specialDateInfo = specialDatesData.find(sd => sd.date === startDateStr);

    if (specialDateInfo && specialDateInfo.isBusy) {
      return false; 
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
              onClick={() => handleNavButtonClick("prev")}
            >
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
              onClick={() => handleNavButtonClick("next")}
            >
              <img src="/src/assets/icons/right_arrow.svg" alt="Right Arrow" />
            </button>
            <button
              className="text-[#866be7] cursor-pointer text-[14px] font-semibold"
              onClick={() => {
                if (calendarRef.current) {
                  const calendarApi = calendarRef.current.getApi();
                  calendarApi.today();
                  setSelectedDate(dayjs());
                }
              }}
            >
              Today
            </button>
          </div>

          <div className="flex border-[1px] border-[#e5e7e8] rounded-[8px]">
            <button
              className={`px-[22px] py-[4px] md:py-[6px] cursor-pointer rounded-[10px] text-[14px] ${
                currentView === "dayGridMonth"
                  ? "bg-[#866be7] text-white"
                  : ""
              }`}
              onClick={() => handleViewChange("dayGridMonth")}
            >
              Month
            </button>
            <button
              className={`px-[22px] py-[6px] cursor-pointer rounded-[10px] text-[14px] ${
                currentView === "timeGridWeek"
                  ? "bg-[#866be7] text-white"
                  : ""
              }`}
              onClick={() => handleViewChange("timeGridWeek")}
            >
              Week
            </button>
            <button
              className={`px-[22px] py-[6px] cursor-pointer rounded-[10px] text-[14px] ${
                currentView === "timeGridDay"
                  ? "bg-[#866be7] text-white"
                  : ""
              }`}
              onClick={() => handleViewChange("timeGridDay")}
            >
              Day
            </button>
          </div>
        </div>

        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={false}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          dayCellClassNames={dayCellClassNamesFunc}
          dateClick={handleDateClickForHighlight}
          selectAllow={handleSelectAllow}
          dayCellContent={renderDayCellContentWithSales}
        />

        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <p className="text-[#3D3D3D] text-[14px]">
            No suitable time slot?{" "}
            <Link to="#" className="hover:text-indigo-700 text-[#744CDB] text-[14px] underline">
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