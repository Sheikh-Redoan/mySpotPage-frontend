import { Button, Popover } from "antd";
import dayjs from "dayjs";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import ClientDetails from "./ClientDetails";
import EventActions from "./EventActions";

export default function Event({ event }) {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <div
      key={event.id}
      className="cursor-pointer text-xs flex items-center justify-between gap-2 text-gray-700">
      <div className="flex items-center gap-2">
        <span
          className={cn("w-1.5 h-1.5 rounded-full block max-md:hidden", {
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
            <span className="max-md:hidden">
              {dayjs(event.start).format("HH:mm")} - {event.title}
            </span>

            <span
              className={cn(
                "md:hidden text-xs truncate line-clamp-1 max-w-[35px]",
                {
                  "bg-[#3E70DD]/10 text-[#3E70DD]":
                    event.status === "Confirmed",
                  "bg-[#3BA55C]/10 text-[#3BA55C]":
                    event.status === "Completed",
                  "bg-[#FC8B23]/10 text-[#FC8B23]": event.status === "Pending",
                  "bg-[#ED4245]/10 text-[#ED4245]":
                    event.status === "Cancelled",
                  "bg-[#82868E]/10 text-[#82868E]": event.status === "Not-show",
                }
              )}>
              {event.title}
            </span>
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
            className="text-xs text-gray-400 max-md:hidden"
          />
        </Button>
      </Popover>
    </div>
  );
}
