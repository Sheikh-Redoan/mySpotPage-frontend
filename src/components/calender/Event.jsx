import { Button, Drawer, Popover } from "antd";
import dayjs from "dayjs";
import { EllipsisVertical, X } from "lucide-react";
import { useState } from "react";
import { getPendingBookingsById } from "../../dummy-data/bookingsData";
import { cn } from "../../lib/utils";
import BookingDetailsContent from "../calendarManagement/pendingBookings/BookingDetailsContent";
import ClientDetails from "./ClientDetails";
import EventActions from "./EventActions";

export default function Event({ event, isMobile = false }) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs(event.start).toDate());

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return isMobile ? (
    <div
      key={event.id}
      className="cursor-pointer text-xs flex items-center justify-between gap-2 text-gray-700">
      <div className="flex items-center gap-2">
        <Button type="text" className="!p-0" onClick={() => setOpen(true)}>
          <span
            className={cn(
              "lg:hidden text-xs truncate line-clamp-1 max-w-[35px]",
              {
                "bg-[#3E70DD]/10 text-[#3E70DD]": event.status === "Confirmed",
                "bg-[#3BA55C]/10 text-[#3BA55C]": event.status === "Completed",
                "bg-[#FC8B23]/10 text-[#FC8B23]": event.status === "Pending",
                "bg-[#ED4245]/10 text-[#ED4245]": event.status === "Cancelled",
                "bg-[#82868E]/10 text-[#82868E]": event.status === "Not-show",
              }
            )}>
            {event.title}
          </span>
        </Button>
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
      </div>
    </div>
  ) : (
    <div
      key={event.id}
      className="cursor-pointer text-xs flex items-center justify-between gap-2 text-gray-700">
      <div className="flex items-center gap-2">
        <span
          className={cn("w-1.5 h-1.5 rounded-full block", {
            "bg-[#3E70DD]": event.status === "Confirmed",
            "bg-[#3BA55C]": event.status === "Completed",
            "bg-[#FC8B23]": event.status === "Pending",
            "bg-[#ED4245]": event.status === "Cancelled",
            "bg-[#82868E]": event.status === "Not-show",
          })}
        />

        <Popover
          placement="left"
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
          arrow={false}
          content={<ClientDetails event={event} hide={hide} />}>
          <Button type="text" className="!p-0">
            {dayjs(event.start).format("HH:mm")} - {event.title}
          </Button>
        </Popover>
      </div>

      <Popover
        placement="rightTop"
        trigger="click"
        arrow={false}
        content={<EventActions />}>
        <Button type="text" className="!p-0">
          <EllipsisVertical
            size={16}
            strokeWidth={0.5}
            className="text-xs text-gray-400"
          />
        </Button>
      </Popover>
    </div>
  );
}
