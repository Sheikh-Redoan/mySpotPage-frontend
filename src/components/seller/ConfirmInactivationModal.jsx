// src/components/seller/ConfirmInactivationModal.jsx
import React, { useRef, useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa"; // Warning icon

const ConfirmInactivationModal = ({ onClose, staffName, onConfirmInactivate }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="relative w-96 bg-white rounded-lg flex flex-col justify-start items-start shadow-xl z-50"
    >
      {/* Header */}
      <div className="self-stretch px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="justify-start text-neutral-800 text-lg font-semibold font-['Golos_Text'] leading-relaxed">
          Notification
        </h2>
        {/* The close button is hidden in the 2nd image, so we'll omit it here or make it transparent */}
        <div className="w-6 h-6 opacity-0" />
      </div>

      {/* Content */}
      <div className="self-stretch px-6 py-4 flex flex-col justify-start items-start gap-4">
        <div className="self-stretch flex flex-col justify-start items-start gap-3">
          <div className="self-stretch flex flex-col justify-start items-center gap-3">
            <div className="p-3 bg-red-100 rounded-full inline-flex justify-center items-center">
              <FaExclamationTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="self-stretch text-center text-gray-950 text-base font-semibold font-['Golos_Text'] leading-normal">
              Confirm Staff Inactivation
            </h3>
            <p className="w-80 text-center text-gray-500 text-sm font-normal font-['Golos_Text'] leading-tight">
              Marking <span className="font-semibold">{staffName}</span> as inactive will prevent future bookings.
              This action is final. Do you want to proceed?
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="self-stretch px-6 py-4 inline-flex justify-between items-center border-t border-gray-200">
        <div className="flex-1 flex justify-start items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-10 px-3 py-2 bg-white rounded-lg border border-neutral-800 flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors duration-200 text-neutral-800 text-sm font-semibold font-['Golos_Text'] leading-tight"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmInactivate}
            className="flex-1 h-10 px-3 py-2 bg-red-500 rounded-lg flex justify-center items-center gap-2 hover:bg-red-600 transition-colors duration-200 text-white text-sm font-semibold font-['Golos_Text'] leading-tight"
          >
            Inactivate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmInactivationModal;