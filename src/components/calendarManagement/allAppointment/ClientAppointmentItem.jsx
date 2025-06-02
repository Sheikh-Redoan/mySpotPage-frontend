import { useState } from "react";
import AppointmentStatusesAction from "../AppointmentStatusesAction";
import { useRef } from "react";
import { useEffect } from "react";
import { MoreVertical } from "lucide-react";

export const ClientAppointmentItem = ({ time, clientName }) => {
  const [showActions, setShowActions] = useState(false);
  const actionButtonRef = useRef(null);
  const actionsRef = useRef(null);

  // Close actions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionButtonRef.current &&
        !actionButtonRef.current.contains(event.target) &&
        actionsRef.current &&
        !actionsRef.current.contains(event.target)
      ) {
        setShowActions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-between rounded-md hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center">
        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span> {/* Blue dot */}
        <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
          {time} - {clientName}
        </span>
      </div>
      <button
        ref={actionButtonRef}
        onClick={() => setShowActions(!showActions)}
        className="p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <MoreVertical className="h-4 w-4 text-gray-600" />
      </button>

      {showActions && (
        <div ref={actionsRef} className="absolute top-full right-0 mt-2">
          <AppointmentStatusesAction />
        </div>
      )}
    </div>
  );
};