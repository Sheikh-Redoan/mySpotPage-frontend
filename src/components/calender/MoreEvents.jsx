import { Button, Popover } from "antd";
import { X } from "lucide-react";
import { useState } from "react";
import Event from "./Event";

export default function MoreEvents({ events, maxEventsPerMonthCell }) {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      arrow={false}
      content={
        <div>
          <div className="flex items-center justify-between border-b border-gray-200 min-w-xs">
            <h3 className="font-medium">Booking lists</h3>
            <Button type="text" onClick={hide}>
              <X size={18} className="text-gray-500" />
            </Button>
          </div>
          {events.slice(maxEventsPerMonthCell).map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </div>
      }>
      <Button type="text" className="!p-0">
        <span className="text-xs text-gray-500">
          +{events.length - maxEventsPerMonthCell} more
        </span>
      </Button>
    </Popover>
  );
}
