import { Button, Popover } from "antd";
import { Check } from "lucide-react";
import { Clock } from "lucide-react";
import React from "react";
import { useState } from "react";

const timeSlots = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "13:00 PM",
  "14:00 PM",
  "15:00 PM",
  "16:00 PM",
  "17:00 PM",
  "18:00 PM",
  "19:00 PM",
  "20:00 PM",
  "21:00 PM",
  "22:00 PM",
];

const TimePicker = ({ scheduledTime }) => {
  const [selectedTime, setSelectedTime] = useState(scheduledTime);

  const handleTimeSelect = (time) => {
    // Handle time selection
    console.log("Selected time:", time);
    setSelectedTime(time);
  };

  const handleReset = () => {
    setSelectedTime(scheduledTime);
  };

  const handleApply = () => {
    // Here you can handle saving the selected time
    console.log("Applying time:", selectedTime);
  };

  const content = () => (
    <div className="w-full relative">
      <div className="max-h-[250px] overflow-y-auto">
        <div className="flex flex-col">
          {timeSlots.map((time) => (
            <button
              key={time}
              className="flex justify-between items-center px-4 py-2 hover:bg-[#F5F4FE] w-full text-sm text-gray-700"
              onClick={() => handleTimeSelect(time)}
            >
              {time}
              {selectedTime === time && (
                <Check className="h-4 w-4 text-primary01" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2 p-2 bg-white sticky bottom-0">
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleApply} color="default" variant="solid">
          Apply
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      arrow={false}
      placement="bottomRight"
      trigger="click"
    >
      <Button className="bg-[#FFFFFF] px-3 py-2 rounded-lg border-[1px] border-[#262626] text-[#242528] text-sm font-normal flex gap-2 items-center">
        {selectedTime}
        <Clock size={16} />
      </Button>
    </Popover>
  );
};

export default TimePicker;
