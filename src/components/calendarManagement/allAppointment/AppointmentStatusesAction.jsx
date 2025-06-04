import { AlertCircle, CheckCircle, CircleSlash, XCircle } from "lucide-react";

const AppointmentStatusesAction = () => {
  return (
    <div>
      <div className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-200">
        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
        <span className="text-gray-800 font-medium text-sm sm:text-base">
          Completed
        </span>
      </div>
      <div className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-200">
        <XCircle className="h-5 w-5 text-red-500 mr-3" />
        <span className="text-gray-800 font-medium text-sm sm:text-base">
          Cancelled
        </span>
      </div>
      <div className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-200">
        <CircleSlash className="h-5 w-5 text-gray-500 mr-3" />
        <span className="text-gray-800 font-medium text-sm sm:text-base">
          No-show
        </span>
      </div>
      <div className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-200">
        <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
        <span className="text-red-600 font-medium text-sm sm:text-base">
          Add to blacklist
        </span>
      </div>
    </div>
  );
};

export default AppointmentStatusesAction;
