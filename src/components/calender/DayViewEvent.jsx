import { Button, Drawer, Popover } from "antd";
import dayjs from "dayjs";
import { Crown, X } from "lucide-react";
import { useState } from "react";
import { getPendingBookingsById } from "../../dummy-data/bookingsData";
import useResponsive from "../../hooks/useResponsive";
import { cn } from "../../lib/utils";
import BookingDetailsContent from "../calendarManagement/pendingBookings/BookingDetailsContent";
import ClientDetails from "./ClientDetails";

export default function DayViewEvent({ event }) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs(event.start).toDate());
  const { xl } = useResponsive();

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <div
      className={cn("border-l-4 h-full p-3", {
        "border-[#3E70DD]": event.status === "Confirmed",
        "border-[#21C66E]": event.status === "Completed",
        "border-[#FC8B23]": event.status === "Pending",
        "border-[#ED4245]": event.status === "Cancelled",
        "border-[#82868E]": event.status === "Not-show",
      })}>
      <div className="flex flex-col items-start justify-between gap-2">
        {!xl && (
          <Button
            type="text"
            className="!p-0 flex flex-col !items-start !justify-between gap-2"
            onClick={() => setOpen(true)}>
            {event.vip && (
              <span className="bg-[#FFB743] p-1 rounded-full flex items-center justify-center">
                <Crown
                  size={12}
                  strokeWidth={1.5}
                  className="text-white text-xs"
                  fill="#fff"
                />
              </span>
            )}
            <span>{event.title}</span>
          </Button>
        )}

        {xl ? (
          <Popover
            placement="left"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            arrow={false}
            content={<ClientDetails event={event} hide={hide} />}>
            <Button
              type="text"
              className="!p-0 flex flex-col !items-start !justify-between gap-2"
              onClick={() => setOpen(true)}>
              {event.vip && (
                <span className="bg-[#FFB743] p-1 rounded-full flex items-center justify-center">
                  <Crown
                    size={12}
                    strokeWidth={1.5}
                    className="text-white text-xs"
                    fill="#fff"
                  />
                </span>
              )}
              <span>{event.title}</span>
            </Button>
          </Popover>
        ) : (
          <>
            <Drawer
              placement="bottom"
              closable={false}
              onClose={hide}
              open={open}
              height="80%">
              <div className="rounded-t-2xx">
                <div className="flex items-center justify-between mb-4 border-b border-gray-200 p-4">
                  <h3 className="text-base font-bold">Booking Details</h3>
                  <Button type="text" onClick={hide}>
                    <X size={18} className="text-gray-500" />
                  </Button>
                </div>
                <BookingDetailsContent
                  booking={getPendingBookingsById("10")}
                  hide={hide}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
            </Drawer>
            <style>
              {`
        .ant-drawer-body {
          padding: 0;
        }
      `}
            </style>
          </>
        )}
      </div>
    </div>
  );
}
