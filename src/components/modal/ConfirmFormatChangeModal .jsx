import { Modal } from "antd";
import { ShieldAlert } from "lucide-react";
import React from "react";

const ConfirmFormatChangeModal = ({ open, onCancel, onProceed }) => {
  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      centered
      className="custom-modal"
      width={380}
    >
      <div className="font-golos">
        <div>
          <h1 className="text-lg font-semibold">Notification</h1>
          <hr className="my-4 text-border" />
        </div>
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="bg-red-100 p-3 rounded-full">
            <ShieldAlert className="text-red-500" />
          </div>
          <h2 className="text-[16px] font-semibold text-[#1D1D1D]">
            Are you sure to change the format?
          </h2>
          <p className="text-sm text-description">
            Changing the format will remove all your existing images. This action
            cannot be undone. Do you want to proceed?
          </p>
          <div className="flex w-full gap-3 pt-2">
            <button
              onClick={onCancel}
              className="w-full border border-gray-300 rounded-md py-2 font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onProceed}
              className="w-full bg-black text-white rounded-md py-2 font-medium hover:bg-gray-900 cursor-pointer"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmFormatChangeModal;
