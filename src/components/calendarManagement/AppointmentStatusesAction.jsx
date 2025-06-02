import React from 'react';
import { CheckCircle, XCircle, CircleSlash, AlertCircle } from 'lucide-react';

const AppointmentStatusesAction = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {/* Main container for the action card */}
      <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs">
        {/* Each action item */}
        <div className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-200">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
          <span className="text-gray-800 font-medium text-sm sm:text-base">Completed</span>
        </div>
        <div className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-200">
          <XCircle className="h-5 w-5 text-red-500 mr-3" />
          <span className="text-gray-800 font-medium text-sm sm:text-base">Cancelled</span>
        </div>
        <div className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-200">
          <CircleSlash className="h-5 w-5 text-gray-500 mr-3" />
          <span className="text-gray-800 font-medium text-sm sm:text-base">No-show</span>
        </div>
        <div className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-200">
          <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
          <span className="text-red-600 font-medium text-sm sm:text-base">Add to blacklist</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentStatusesAction;
