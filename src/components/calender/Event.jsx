import { Button, Popover } from "antd";
import dayjs from "dayjs";
import { EllipsisVertical } from "lucide-react";
import { cn } from "../../lib/utils";
import EventActions from "./EventActions";

export default function Event({ event }) {
  return (
    <div
      key={event.id}
      className="cursor-pointer text-xs flex items-center gap-2 text-gray-700">
      <span
        className={cn("w-1.5 h-1.5 rounded-full", {
          "bg-[#3E70DD]": event.status === "Confirmed",
          "bg-[#3BA55C]": event.status === "Completed",
          "bg-[#FC8B23]": event.status === "Pending",
          "bg-[#ED4245]": event.status === "Cancelled",
          "bg-[#82868E]": event.status === "Not-show",
        })}
      />
      <span>
        {dayjs(event.start).format("HH:mm")} - {event.title}
      </span>

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
