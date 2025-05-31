// src/components/seller/ResolveBookingsModal.jsx
import React, { useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5"; // Close icon
import { FaExclamationTriangle } from "react-icons/fa"; // Warning icon

const ResolveBookingsModal = ({ onClose, staffName, onReassignOrCancelClick }) => {
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
      className="relative w-[570px] bg-white rounded-lg flex flex-col justify-start items-start shadow-xl z-50"
    >
      {/* Header */}
      <div className="self-stretch px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-neutral-800 text-lg font-semibold font-['Golos_Text'] leading-relaxed">
          Notification
        </h2>
        <button onClick={onClose} className="text-zinc-600 hover:text-zinc-800">
          <IoClose size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="self-stretch px-6 py-4 flex flex-col justify-center items-center gap-4">
        <div className="self-stretch flex flex-col justify-start items-center gap-3">
          <div className="p-3 bg-red-100 rounded-full inline-flex justify-center items-center">
            <FaExclamationTriangle className="w-5 h-5 text-red-500" />
          </div>
          <h3 className="self-stretch text-center text-gray-950 text-base font-semibold font-['Golos_Text'] leading-normal">
            Resolve Bookings Before Inactivation
          </h3>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-3">
          <p className="self-stretch text-gray-700 text-sm font-normal font-['Golos_Text'] leading-tight">
            Marking <span className="font-semibold">{staffName}</span> as inactive will prevent future bookings.
            <br />
            They currently have upcoming bookings assigned. To proceed, you must:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-sm font-normal font-['Golos_Text'] leading-tight pl-4">
            <li>Reassign all bookings to another staff member</li>
            <li>Cancel any remaining bookings if needed</li>
          </ul>
        </div>

        <div className="w-full h-px bg-gray-100 my-2"></div> {/* Separator */}

        <button
          onClick={onReassignOrCancelClick}
          className="w-full h-10 px-3 py-2 bg-neutral-800 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-700 transition-colors duration-200"
        >
          <span className="justify-center text-white text-sm font-semibold font-['Golos_Text'] underline leading-tight">
            Click Here to Reassign or Cancel
          </span>
        </button>

        <div className="w-full h-px bg-gray-100 my-2"></div> {/* Separator */}

        <p className="self-stretch text-gray-700 text-sm font-normal font-['Golos_Text'] leading-tight">
          Once all bookings are reassigned or canceled, you will be able to complete this action.
        </p>
      </div>
    </div>
  );
};

export default ResolveBookingsModal;