import React, { useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

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

function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
  return (
    <div className="demo-app-sidebar">
      <div className="demo-app-sidebar-section">
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div className="demo-app-sidebar-section">
        <label>
          <input
            type="checkbox"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          ></input>
          toggle weekends
        </label>
      </div>
      <div className="demo-app-sidebar-section">
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function SidebarEvent({ event }) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

export default function SelectTime() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleDateSelect(selectInfo) {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

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

  return (
    <div className="demo-app">
      <Sidebar
        weekendsVisible={weekendsVisible}
        handleWeekendsToggle={handleWeekendsToggle}
        currentEvents={currentEvents}
      />
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </div>
    </div>
  );
}





// import React, { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import Container from "./Container";

// const SelectTime = () => {
//   const [currentView, setCurrentView] = useState("dayGridMonth");

//   const events = [
//     {
//       title: "25% OFF",
//       start: "2025-01-06",
//       backgroundColor: "#f0f0ff",
//       textColor: "#5d5fef",
//       classNames: ["discount-event"],
//     },
//     {
//       title: "20% OFF",
//       start: "2025-01-14",
//       backgroundColor: "#f0f0ff",
//       textColor: "#5d5fef",
//       classNames: ["discount-event"],
//     },
//   ];

//   return (
//     <section className="py-8">
//       <Container>
//         <div>
//           <div className="flex gap-2">
//             <button
//               className={`px-4 py-2 rounded-md transition-colors ${
//                 currentView === "dayGridMonth"
//                   ? "bg-indigo-600 text-white"
//                   : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
//               }`}
//               onClick={() => setCurrentView("dayGridMonth")}
//             >
//               Month
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md transition-colors ${
//                 currentView === "dayGridWeek"
//                   ? "bg-indigo-600 text-white"
//                   : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
//               }`}
//               onClick={() => setCurrentView("dayGridWeek")}
//             >
//               Week
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md transition-colors ${
//                 currentView === "dayGridDay"
//                   ? "bg-indigo-600 text-white"
//                   : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
//               }`}
//               onClick={() => setCurrentView("dayGridDay")}
//             >
//               Day
//             </button>
//           </div>

//           <div className="p-6">
//             <FullCalendar
//               plugins={[dayGridPlugin, interactionPlugin]}
//               initialView={currentView}
//               headerToolbar={{
//                 left: "prev",
//                 center: "title",
//                 right: "next",
//               }}
//               events={events}
//               selectable={true}
//               selectMirror={true}
//               dayMaxEvents={true}
//             />
//           </div>

//           <div className="mt-6 flex justify-between items-center">
//             <p className="text-gray-600">
//               No suitable time slot?{" "}
//               <a href="#" className="text-indigo-600 hover:text-indigo-700">
//                 Join our waitlist!
//               </a>
//             </p>
//             <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
//               Continue
//             </button>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default SelectTime;
