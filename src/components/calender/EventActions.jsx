import { Button } from "antd";
import { CircleAlert, CircleCheck, CircleOff, CircleX } from "lucide-react";

export default function EventActions() {
  return (
    <div
      className="flex flex-col space-y-2 p-2 items-start 
    ">
      <Button
        type="text"
        className="!text-green-600 !gap-0.5 w-full !justify-start">
        <CircleCheck size={16} strokeWidth={1} /> <span>Completed</span>
      </Button>
      <Button
        type="text"
        className="!text-red-600 !gap-0.5 w-full !justify-start">
        <CircleX size={16} strokeWidth={1} /> <span>Cancelled</span>
      </Button>
      <Button
        type="text"
        className="!text-gray-600 !gap-0.5 w-full !justify-start">
        <CircleOff size={16} strokeWidth={1} /> <span>Not Show</span>
      </Button>
      <Button
        type="text"
        className="!text-red-600 !gap-0.5 w-full !justify-start">
        <CircleAlert size={16} strokeWidth={1} /> <span>Add to blacklist</span>
      </Button>
    </div>
  );
}
