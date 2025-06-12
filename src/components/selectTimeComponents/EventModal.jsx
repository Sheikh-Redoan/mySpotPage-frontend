import { Button, Modal } from "antd";
import dayjs from "dayjs";
import { X } from "lucide-react";
import React from "react";

const EventModal = ({ isOpen, onClose, onSubmit, selectedDate, timeSlots }) => {
  const [selectedTime, setSelectedTime] = React.useState(null);

  const formattedDate = dayjs(selectedDate).format("dddd, MMMM D, YYYY");

  const handleSubmit = () => {
    if (!selectedTime) {
      alert("Please select a time.");
      return;
    }
    onSubmit({ time: selectedTime });
    setSelectedTime(null);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={true}
      closeIcon={<X className="w-6 h-6" />}
      title={
        <h3 className="text-[#242528] text-[18px] font-semibold">
          Select time
        </h3>
      }
      className="!w-[600px]"
      styles={{
        header: {
          padding: "16px 24px",
          borderBottom: "1px solid #E5E7E8",
        },
        body: {
          padding: "16px 24px",
        },
        content: {
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
      }}
      style={{
        backgroundColor: "rgba(75, 85, 99, 0.7)",
      }}
      centered
    >
      <h4 className="text-[#262626] text-[16px] font-medium">
        {formattedDate}
      </h4>

      <div className="max-h-[600px] overflow-y-auto py-2 space-y-2">
        {timeSlots &&
          timeSlots.map((slot) => (
            <div
              key={slot.time}
              className={`px-3 py-2 rounded-lg flex justify-between items-center cursor-pointer ${
                selectedTime === slot.time
                  ? "border-[1px] border-[#866BE7] bg-[#F5F4FE]"
                  : "border-[1px] border-[#E5E7E8]"
              }`}
              onClick={() => setSelectedTime(slot.time)}
            >
              <span>{slot.time}</span>
              {slot.sale && (
                <span className="text-[#866BE7] bg-[#F5F4FE] px-2 py-1 rounded-full text-xs font-medium border-[1px] border-[#C3BCF6]">
                  {slot.sale}
                </span>
              )}
            </div>
          ))}
      </div>

      <div className="flex justify-end px-6 py-4">
        <Button
          type="default"
          onClick={onClose}
          className="!text-[#242528] !border-none !bg-transparent hover:!bg-gray-100"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          className="!px-3 !py-2 !bg-[#242528] !text-white !rounded-md !ml-1"
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default EventModal;
