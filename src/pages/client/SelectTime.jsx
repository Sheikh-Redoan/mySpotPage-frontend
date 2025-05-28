import React, { useState, useRef, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Container from "./Container";
import { DatePicker } from "antd";
import dayjs from "dayjs";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, "");

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
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

// function to format day numbers
function renderDayCellContent(dayCellInfo) {
  const day = dayCellInfo.date.getDate();
  return day < 10 ? `0${day}` : day.toString();
}

export default function SelectTime() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentView, setCurrentView] = useState("dayGridMonth"); 
  const calendarRef = useRef(null);

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

  return (
    <section className="bg-[#F9FAFC] py-8">
      <Container className="bg-white shadow-md rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
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
              className={`px-[22px] py-[6px] cursor-pointer rounded-[10px] text-[14px] ${
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
          dayCellContent={renderDayCellContent}
        />

        <div className="mt-6 flex justify-between items-center">
          <p className="text-gray-600">
            No suitable time slot?{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-700">
              Join our waitlist!
            </a>
          </p>
          <button className="px-6 py-2 text-[#82868E] bg-[#E5E7E8] rounded-md hover:bg-[#ECEBFC] transition-colors cursor-pointer">
            Continue
          </button>
        </div>
      </Container>
    </section>
  );
}