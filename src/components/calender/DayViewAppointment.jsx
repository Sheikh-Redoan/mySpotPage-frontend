import { Avatar } from "antd";
import dayjs from "dayjs";
import React from "react";
import useResponsive from "../../hooks/useResponsive";
import { cn } from "../../lib/utils";
import DayViewEvent from "./DayViewEvent";

export default function DayViewAppointment({ currentDate, resources, events }) {
  const { xl } = useResponsive();
  const today = dayjs("2025-06-18").startOf("day");

  const appointmentUsers = resources;

  // 2. Define 30-minute time slots for the first sticky column (9 AM to 5 PM)
  const getTimeSlots = (date, startHour = 8, endHour = 17) => {
    const slots = [];
    for (let i = startHour; i <= endHour; i++) {
      slots.push(date.hour(i).minute(0).second(0));
    }
    return slots;
  };
  const timeSlots = getTimeSlots(currentDate);

  // Set minimum width for user columns
  const MIN_COLUMN_WIDTH = xl ? "180px" : "120px";
  const columns = [
    { key: "time", title: "Time Slot", width: "70px" },
    ...appointmentUsers.map((user) => ({
      key: user.id,
      title: user.name,
      avatar: user.avatar,
      width: `minmax(${MIN_COLUMN_WIDTH}, 1fr)`, // Min width with auto resize
    })),
  ];

  const generateAppointmentData = () => {
    const gridData = [];

    const eventsByResourceAndTime = {};
    events.forEach((event) => {
      const eventStart = dayjs(event.start);
      if (eventStart.isSame(currentDate, "day")) {
        const resourceId = event.resourceId;
        const timeKey = eventStart.format("h:mm A");

        if (!eventsByResourceAndTime[resourceId]) {
          eventsByResourceAndTime[resourceId] = {};
        }
        eventsByResourceAndTime[resourceId][timeKey] = event;
      }
    });

    // Populate the grid data row by row (time slot by time slot)
    timeSlots.forEach((slot) => {
      const rowData = { time: slot.format("HH:mm") }; // Initialize row with the time slot
      appointmentUsers.forEach((user) => {
        const resourceId = user.id;
        const appointment =
          eventsByResourceAndTime[resourceId]?.[slot.format("h:mm A")] || null;
        rowData[resourceId] = appointment; // Assign event object or null
      });
      gridData.push(rowData);
    });
    return gridData;
  };

  const appointmentGridData = generateAppointmentData();

  const gridTemplateColumns = `70px repeat(${appointmentUsers.length}, minmax(${MIN_COLUMN_WIDTH}, 1fr))`;
  const date = dayjs(currentDate);

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Main scrollable container */}
      <div className="relative overflow-auto max-h-screen lg:rounded-md">
        {/* The actual grid container */}
        <div
          className="grid relative" // Add relative positioning here
          style={{
            gridTemplateColumns: gridTemplateColumns,
            minWidth: "100%", // Instead of width: "max-content"
          }}>
          {/* Sticky Header Row (Users) */}
          {columns.map((column, colIndex) => (
            <div
              key={column.key}
              className={`
                    sticky top-0 p-3 bg-indigo-100 text-left
                    border-b-2 border-gray-200 z-20 whitespace-nowrap overflow-hidden text-ellipsis
                    flex items-center justify-center flex-col
                    ${
                      colIndex === 0
                        ? "sticky left-0 z-30 bg-white !border-0"
                        : ""
                    }
                  `}>
              {colIndex === 0 ? (
                <div
                  className={cn("text-sm lg:hidden", "text-gray-800 mt-3", {
                    "text-gray-400": !date.isSame(currentDate, "day"),
                    "text-white bg-primary01 rounded-full w-8 h-8 flex items-center justify-center mx-auto":
                      date.isSame(currentDate, "day"),
                  })}>
                  {date.format("DD")}
                </div>
              ) : (
                <div
                  className={cn("flex flex-col items-center gap-2", {
                    "rounded-tl-xl": colIndex === 1,
                  })}>
                  <Avatar
                    src={column.avatar}
                    alt={column.title}
                    size={xl ? 50 : 30}
                    className="outline-1 outline-offset-2 outline-primary01/30 object-cover"
                  />

                  <span className="text-xs lg:text-sm text-gray-700 text-center text-nowrap">
                    {column.title}
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Data Rows (Time Slots and User Appointments) */}
          {appointmentGridData.map((rowData) => (
            <React.Fragment key={rowData.time}>
              {columns.map((column, colIndex) => {
                const cellContent =
                  colIndex === 0
                    ? rowData.time // First column is the time slot
                    : rowData[column.key]; // Other columns are appointment data for that user/time slot

                const isAppointment =
                  cellContent && typeof cellContent === "object";

                return (
                  <div
                    key={`${rowData.time}-${column.key}`}
                    className={cn(
                      "bg-white border border-gray-200 text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis h-48 max-h-[130px]",
                      {
                        "sticky left-0 z-10 text-sm !border-0 !max-w-[120px]":
                          colIndex === 0,
                        "bg-white": colIndex > 0 && !isAppointment,
                        "hover:bg-gray-50 transition-colors duration-200":
                          !isAppointment,
                      }

                      // Condition for empty non-time cells
                    )}>
                    {
                      isAppointment ? (
                        <DayViewEvent event={cellContent} />
                      ) : colIndex === 0 ? (
                        cellContent
                      ) : (
                        ""
                      ) // Display 'Available' for empty slots
                    }
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
