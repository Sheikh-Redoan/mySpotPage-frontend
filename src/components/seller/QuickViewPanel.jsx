// src/components/seller/QuickViewPanel.jsx
import React from "react";
import { BiScreenshot } from "react-icons/bi";
import { FaPhoneAlt, FaUsers, FaCalendarAlt, FaMoon, FaCircle } from "react-icons/fa";

const QuickViewPanel = ({ selectedStaff }) => {
  if (!selectedStaff) {
    return (
      <div className="w-80 p-4 bg-white rounded-xl border border-gray-200 flex flex-col justify-center items-center gap-4 text-center h-[554px]">
        <div className="flex flex-col justify-center items-center gap-3">
          <BiScreenshot className="w-10 h-10 text-[#8B5CF6]" />
          <div className="flex flex-col justify-start items-center gap-1">
            <h3 className="text-gray-950 text-sm font-semibold font-['Golos_Text'] leading-tight">
              Select a Staff Member for Quick View
            </h3>
            <p className="text-gray-500 text-xs font-normal font-['Golos_Text'] leading-none">
              Please choose a staff member to quickly view their services,
              schedule, and expertise.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Status icons configuration
  const statusIcon = {
    Online: <FaCircle className="text-green-500" size={10} />,
    Offline: <FaCircle className="text-gray-400" size={10} />,
    Break: <FaMoon className="text-orange-400" size={10} />,
  };

  return (
    <div className="w-80 h-[554px] p-4 bg-white rounded-xl outline   outline-Boulder-100 inline-flex flex-col justify-start items-center gap-4 overflow-y-auto">
      <div className="self-stretch flex flex-col justify-start items-center gap-2">
        <div className="w-14 h-14 relative rounded-full outline   outline-white">
          <img
            src={selectedStaff.image}
            alt={selectedStaff.name}
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0 flex items-center justify-center w-4 h-4 bg-white rounded-full border border-white">
            {statusIcon[selectedStaff.status]}
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-center items-center gap-1">
          <div className="py-0.5 inline-flex justify-start items-center gap-1">
            <div className="justify-center text-violet-600 text-sm font-semibold font-['Golos_Text'] underline leading-tight">
              {selectedStaff.name}
            </div>
          </div>
          <div className="inline-flex justify-start items-start gap-2">
            {selectedStaff.roles.map((role, index) => (
              <div
                key={index}
                className="px-2 py-1 bg-violet-50 rounded flex justify-center items-center"
              >
                <div className="justify-start text-violet-500 text-xs font-medium font-['Golos_Text'] leading-none">
                  {role}
                </div>
              </div>
            ))}
          </div>
          <div className="self-stretch flex flex-col justify-center items-center gap-1">
            <div className="self-stretch text-center justify-start text-Boulder-500 text-sm font-normal font-['Golos_Text'] leading-tight">
              {selectedStaff.position}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-[#7979799c] "></div>
      <div className="self-stretch flex-1 flex flex-col justify-start items-start gap-3 overflow-y-scroll scrollbar-hidden
scrollbar-hidden">
        {selectedStaff.phone && (
          <div className="self-stretch inline-flex justify-start items-center gap-2">
            <div className="py-0.5 flex justify-start items-center">
              <FaPhoneAlt className="w-4 h-4 text-violet-500" />
            </div>
            <div className="w-64 justify-start text-Boulder-950 text-sm font-medium font-['Golos_Text'] leading-tight">
              {selectedStaff.phone}
            </div>
          </div>
        )}

        {selectedStaff.services && selectedStaff.services.length > 0 && (
          <div className="self-stretch inline-flex justify-start items-start gap-2">
            <div className="py-0.5 flex justify-start items-center">
              <FaUsers className="w-5 h-3.5 text-violet-500" />
            </div>
            <div className="flex-1 inline-flex flex-col justify-center items-start gap-2">
              <div className="self-stretch justify-start text-Boulder-950 text-sm font-medium font-['Golos_Text'] leading-tight">
                Service Provide
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-1.5 flex-wrap content-center">
                {selectedStaff.services.map((service, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 rounded-[100px] outline   outline-offset-[-1px] outline-Boulder-100 flex justify-center items-center"
                  >
                    <p className="justify-start text-Boulder-400 text-xs font-medium font-['Golos_Text'] leading-none">
                      {service}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedStaff.workingShifts &&
          selectedStaff.workingShifts.length > 0 && (
            <div className="self-stretch inline-flex justify-start items-start gap-2">
              <div className="py-0.5 flex justify-start items-center">
                <FaCalendarAlt className="w-3.5 h-4 text-violet-500" />
              </div>
              <div className="flex-1 inline-flex flex-col justify-center items-start gap-2">
                <div className="self-stretch justify-start text-Boulder-950 text-sm font-medium font-['Golos_Text'] leading-tight">
                  Working Shift
                </div>
                <div className="self-stretch flex flex-col justify-start items-start">
                  {selectedStaff.workingShifts.map((shift, index) => (
                    <div
                      key={index}
                      className="self-stretch h-8 rounded-lg inline-flex justify-between items-center"
                    >
                      <div className="flex justify-start items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-violet-200 rounded-full" />
                        <div className="justify-start text-violet-500 text-sm font-medium font-['Golos_Text'] leading-tight">
                          {shift.day}
                        </div>
                      </div>
                      <div className="w-24 text-right justify-start text-Boulder-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                        {shift.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default QuickViewPanel;