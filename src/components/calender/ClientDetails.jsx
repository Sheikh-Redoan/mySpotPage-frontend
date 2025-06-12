import { Button, List, Popover } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Ensure locale is loaded for dayjs formatting
import { ArrowUpRight, ChevronDown, CircleCheck, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { cn } from "../../lib/utils";
import EventActions from "./EventActions";

export default function ClientDetails({ event, hide }) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <div
      className="max-w-sm" // Added custom class for
    >
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
        <h3 className="font-medium flex items-center gap-2">
          Booking detail
          <Link to={`/bookings/${event.id}`}>
            <ArrowUpRight size={20} className="text-gray-400" />
          </Link>
        </h3>
        <Button type="text" onClick={hide}>
          <X size={18} className="text-gray-500" />
        </Button>
      </div>

      {/* Client Information Section */}
      <div>
        <ul className="list-none flex flex-col gap-2">
          <li className="text-sm text-[#797979] mb-2 flex items-center justify-between">
            <span>Client name</span>
            <Link to={`/clients/${appointmentData.clientId}`}>
              {appointmentData.clientName}
            </Link>
          </li>
          <li className="text-sm text-[#797979] mb-2 flex items-center justify-between">
            <span>Time</span>
            <span className="text-[#262626]">
              {appointmentData.time.format("DD MMM YYYY, HH:mm")}
            </span>
          </li>
          <li className="text-sm text-[#797979] mb-2 flex items-center justify-between">
            <span>Staff</span>
            <span className="text-[#262626]">{appointmentData.staff}</span>
          </li>
          <li className="text-sm text-[#797979] mb-2 flex items-center justify-between">
            <span>Status</span>
            <span
              className={cn("rounded-full block px-2 py-0.5", {
                "bg-[#3E70DD]/10 text-[#3E70DD]":
                  appointmentData.status === "Confirmed",
                "bg-[#3BA55C]/10 text-[#3BA55C]":
                  appointmentData.status === "Completed",
                "bg-[#FC8B23]/10 text-[#FC8B23]":
                  appointmentData.status === "Pending",
                "bg-[#ED4245] text-[#ED4245]":
                  appointmentData.status === "Cancelled",
                "bg-[#82868E]/10 text-[#82868E]":
                  appointmentData.status === "Not-show",
              })}>
              {appointmentData.status}
            </span>
          </li>
        </ul>
      </div>

      {/* Service Lists Section */}
      <div className="pt-4 pb-4 mt-4">
        {/* Adjusted top margin and added dotted border */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-normal text-[#797979]">Service lists</h3>
          <Link
            to={`/bookings/${event.id}`}
            type="link"
            className="!text-primary01 text-sm">
            View detail
          </Link>
        </div>
        <List
          dataSource={appointmentData.serviceLists}
          renderItem={(item) => (
            <List.Item className="!py-1 !px-0 !border-b-0">
              {/* Remove Ant Design's default padding/border */}
              <div className="flex items-start text-sm w-full gap-2">
                {/* Custom Checkbox for rounded appearance and correct alignment */}
                <CircleCheck size={16} strokeWidth={1} />
                <div className="flex flex-col flex-grow">
                  {/* Use flex-grow to take available space */}
                  <span className="font-medium text-[#262626]">
                    {item.name}
                  </span>
                  {item.description && (
                    <span className="text-sm text-[#6B7280] mt-2">
                      {item.description}
                    </span>
                  )}
                </div>
              </div>
            </List.Item>
          )}
          className="space-y-3" // Custom class to remove padding
        />
      </div>

      {/* Note Section */}
      <div className="mt-4 p-2.5 bg-[#FAFAFA] flex gap-2 rounded-lg">
        <p className="text-sm text-[#4B5563] leading-relaxed">
          <span className="text-[#262626] font-medium">Note:</span>{" "}
          {appointmentData.note}
        </p>
      </div>

      {/* Specific Note Section */}
      <div className="mt-4 p-2.5 bg-[#FAFAFA] flex gap-2 rounded-lg">
        <p className="text-sm text-[#4B5563] leading-relaxed">
          <span className="text-[#262626] font-medium">Specific note:</span>{" "}
          {appointmentData.specificNote}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-5 items-center pt-4 border-t border-gray-200 mt-4 w-full">
        <h3 className="text-sm font-normal text-[#4B5563]">Action</h3>
        <div className="w-full flex gap-3">
          <Button
            type="default"
            size="large"
            className="!text-[#F24458] !border-[#F24458] flex-1">
            Add to blacklist
          </Button>

          <Popover
            placement="rightBottom"
            content={<EventActions block={false} />}
            arrow={false}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}>
            <Button
              type="primary"
              size="large"
              shape="default"
              onClick={() => setOpen(!open)}
              className="!flex !items-center !justify-between !w-full !bg-[#242528] !text-white !border-none">
              <span>Status</span>
              <ChevronDown
                size={20}
                strokeWidth={1.5}
                className={cn("ml-2 transition-transform", {
                  "rotate-180": open,
                })}
              />
            </Button>
          </Popover>
        </div>
      </div>
    </div>
  );
}

// Mock data for the appointment details
const appointmentData = {
  clientName: "Alexander",
  time: dayjs("2025-01-06T17:00:00"),
  staff: "Pixe | Nomad",
  status: "Confirmed", // This will be rendered as blue text, not a dropdown initially
  serviceLists: [
    {
      id: "s1",
      name: "Classic Ombre",
      description: "Smooth / Scalp treatment",
      completed: true,
    },
    {
      id: "s3",
      name: "Reverse Ombre",
      description: "Shadow Root",
      completed: true,
    },
    { id: "s5", name: "Balayage with Toner", completed: true },
  ],
  note: "Hair is thick and slightly wavy, prefers a shoulder-length layered cut with light texture.",
  specificNote: "shop recommend booking a trim every 6-8 weeks",
};
