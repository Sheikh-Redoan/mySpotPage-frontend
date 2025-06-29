import { Button, Modal } from "antd";
import { X } from "lucide-react";
import React from "react";
import { NotificationIcon } from "../../assets/icons/icons2";

export default function CancelBookingModal({
  isOpen,
  onClose,
  onDeleteConfirm,
}) {
  return (
    <>
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        closable={true}
        closeIcon={<X className="w-6 h-6" />}
        title={
          <div className="border-b-[1px] border-gray-200">
            <h2 className="text-[#242528] text-[18px] font-semibold p-4">
              Notification
            </h2>
          </div>
        }
        centered
      >
        <div className="flex-1 flex flex-col justify-center items-center p-4">
          <div className="flex justify-center items-center my-2 rounded-full h-[40px] w-[40px] bg-[#FBD9DA] mx-auto">
            <NotificationIcon className="h-5 w-5" />
          </div>

          <h2 className="text-[#262626] font-semibold my-1">
            Cancel This Booking?
          </h2>
          <p className="text-[#797979] my-1 text-sm pb-4 text-center">
            Your appointment will be canceled. You can book a new one anytime
            after that!
          </p>
        </div>

        <div className="flex justify-between gap-4 items-center w-full p-4">
          <Button
            type="default"
            onClick={onClose}
            className="w-1/2 !border !border-[#242528] !text-[#242528] !rounded-lg hover:!scale-95 transform transition-all duration-300 ease-in-out"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={onDeleteConfirm}
            className="!w-1/2 !bg-[#ED4245] !text-white !rounded-lg hover:!scale-95 transform transition-all duration-300 ease-in-out"
          >
            Confirm
          </Button>
        </div>
      </Modal>

      <style>
        {`
          .ant-modal-content {
            padding: 0 !important;
          }
        `}
      </style>
    </>
  );
}
