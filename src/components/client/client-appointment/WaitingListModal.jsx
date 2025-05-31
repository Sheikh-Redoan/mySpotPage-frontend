import React from "react";
import { Modal, Button } from "antd";
import { FaCheckCircle } from "react-icons/fa";

const WaitingListModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      title={
        <div className="flex justify-between items-center pb-4 border-b-[1px] border-gray-200">
          <span className="text-lg font-semibold text-[#242528]">Notification</span>
        </div>
      }
      open={isOpen} 
      onCancel={onClose} 
      footer={null} 
      centered 
      closable={true} 
      destroyOnHidden={true} 
      className="rounded-lg overflow-hidden" 
      style={{ padding: '24px', textAlign: 'center' }}
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <FaCheckCircle size={44} className="text-green-500" />

        <h3 className="text-[16px] font-semibold text-[#262626]">
          Join the waiting list successfully
        </h3>

        <p className="text-[#797979] text-[14px] font-normal leading-[150%]">
          You've been added to the waiting list! We'll notify you if a spot opens up.
        </p>

        <Button
          type="primary" 
          onClick={onClose} 
          className="w-full py-2 rounded-md !bg-[#242528] text-[#FFFFFF] text-[14px] font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200"
        >
          Got it
        </Button>
      </div>
    </Modal>
  );
};

export default WaitingListModal;
