import { Button, Popover } from "antd";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import AppointmentStatusesAction from "./AppointmentStatusesAction";

export const ClientAppointmentItem = ({ time, clientName }) => {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      content={
        <a onClick={hide} className="block">
          <AppointmentStatusesAction />
        </a>
      }
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      placement="rightBottom"
      arrow={false}>
      <Button type="text" className="flex items-center">
        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
        <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
          {time} - {clientName}
        </span>
        <MoreVertical className="text-gray-600" size={16} />
      </Button>
    </Popover>
  );
};
