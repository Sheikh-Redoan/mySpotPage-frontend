// src/pages/onboarding/StaffWorkingHoursPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { GoChevronRight } from "react-icons/go"; // Chevron for breadcrumbs
import { FaSquareCheck, FaRegSquare } from "react-icons/fa6"; // Checkbox icons
import { LuClock } from "react-icons/lu"; // Clock icon

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const StaffWorkingHoursPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve all data passed from StaffServicesPage
  const {
    profileImage,
    profileImagePreview,
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
    gender,
    roles,
    jobTitle,
    selectedServices,
  } = location.state || {};

  const [workingHours, setWorkingHours] = useState(() => {
    const initialHours = {};
    daysOfWeek.forEach(day => {
      initialHours[day] = {
        enabled: day !== "Saturday", // Saturday starts disabled as per image
        startShift: "08:00",
        endShift: "14:00",
        breakEnabled: true, // Breaks initially enabled for active days
        breakStart: "12:00",
        breakEnd: "13:00",
      };
      if (day === "Friday") {
        initialHours[day].startShift = "09:00";
      }
      if (day === "Saturday") {
        initialHours[day].breakEnabled = false;
        initialHours[day].startShift = "";
        initialHours[day].endShift = "";
        initialHours[day].breakStart = "";
        initialHours[day].breakEnd = "";
      }
    });
    return initialHours;
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!firstName || !selectedServices || selectedServices.length === 0) {
      setError("Missing previous staff data. Please restart the onboarding process.");
    }
  }, [firstName, selectedServices]);

  const handleWorkingDayToggle = (day) => {
    setWorkingHours(prevHours => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        enabled: !prevHours[day].enabled,
        startShift: !prevHours[day].enabled ? "" : (day === "Friday" ? "09:00" : "08:00"),
        endShift: !prevHours[day].enabled ? "" : "14:00",
        breakEnabled: !prevHours[day].enabled ? false : true, // Enable break by default if day enabled
        breakStart: !prevHours[day].enabled ? "" : "12:00",
        breakEnd: !prevHours[day].enabled ? "" : "13:00",
      }
    }));
  };

  const handleTimeChange = (day, type, value) => {
    setWorkingHours(prevHours => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        [type]: value,
      }
    }));
  };

  const handleBreakToggle = (day) => {
    setWorkingHours(prevHours => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        breakEnabled: !prevHours[day].breakEnabled,
        breakStart: !prevHours[day].breakEnabled ? "" : "12:00",
        breakEnd: !prevHours[day].breakEnabled ? "" : "13:00",
      }
    }));
  };

  const handlePrevious = () => {
    navigate("/onboard/services-settings", {
      state: {
        profileImage, profileImagePreview, firstName, lastName,
        phoneNumber, dateOfBirth, gender, roles, jobTitle, selectedServices,
      },
    });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setError("");

    let hasValidationErrors = false;
    const finalWorkingHours = {};

    daysOfWeek.forEach(day => {
      const dayHours = workingHours[day];
      if (dayHours.enabled) {
        if (!dayHours.startShift || !dayHours.endShift) {
          setError(`Please enter both start and end shift times for ${day}.`);
          hasValidationErrors = true;
          return;
        }
        if (dayHours.breakEnabled && (!dayHours.breakStart || !dayHours.breakEnd)) {
          setError(`Please enter both start and end break times for ${day}.`);
          hasValidationErrors = true;
          return;
        }
        finalWorkingHours[day] = dayHours;
      } else {
        finalWorkingHours[day] = { ...dayHours, startShift: "OFF", endShift: "OFF", breakStart: "OFF", breakEnd: "OFF", breakEnabled: false };
      }
    });

    if (hasValidationErrors) return;


    const staffWorkingHoursInfo = {
      profileImage, profileImagePreview, firstName, lastName,
      phoneNumber, dateOfBirth, gender, roles, jobTitle, selectedServices,
      workingHours: finalWorkingHours,
    };

    console.log("Staff Working Hours Information Collected:", staffWorkingHoursInfo);

    // Navigate to the next step: Security settings
    navigate("/onboard/security-settings", { state: staffWorkingHoursInfo });
  };


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-['Golos_Text']">
        <div className="w-96 p-6 bg-white rounded-lg shadow-lg border border-gray-200 text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => navigate("/seller-management")}
            className="mt-6 px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-gray-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-['Golos_Text']">
      <div className="w-[1179px] flex flex-col justify-start items-start gap-4">
        {/* Breadcrumbs */}
        <div className="self-stretch inline-flex justify-start items-center gap-2">
          <span className="text-gray-400 text-sm font-normal leading-tight">Basic information</span>
          <GoChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-sm font-normal leading-tight">Services settings</span>
          <GoChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-950 text-sm font-normal leading-tight">Working shift settings</span>
          <GoChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-sm font-normal leading-tight">Security</span>
        </div>

        {/* Main Form Container */}
        <div className="self-stretch p-6 bg-white rounded-xl border border-gray-200 flex flex-col justify-start items-center gap-4">
          <div className="self-stretch inline-flex justify-start items-start gap-10 w-full">
            {/* Working Hours Column */}
            <div className="flex-1 p-4 rounded-xl border border-gray-200 flex flex-col justify-start items-start gap-5 overflow-hidden">
              <div className="self-stretch flex flex-col justify-start items-start gap-6">
                {/* Header Row */}
                <div className="self-stretch rounded-xl flex justify-start items-center gap-6">
                  <div className="w-44 text-neutral-800 text-sm font-semibold leading-tight">Working hours</div>
                  <div className="flex-1 flex justify-start items-center gap-3">
                    <div className="flex-1 text-center text-gray-500 text-sm font-normal leading-tight">Start Shift</div>
                    <div className="opacity-0 text-center text-neutral-600 text-sm font-normal leading-tight">-</div>
                    <div className="flex-1 text-center text-gray-500 text-sm font-normal leading-tight">End Shift</div>
                  </div>
                </div>
                {/* Days Loop */}
                {daysOfWeek.map(day => (
                  <div key={day} className="self-stretch rounded-xl flex justify-start items-center gap-6">
                    <label className="w-44 flex justify-start items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={workingHours[day].enabled}
                        onChange={() => handleWorkingDayToggle(day)}
                      />
                      {workingHours[day].enabled ? (
                        <FaSquareCheck className="w-5 h-5 text-violet-500" />
                      ) : (
                        <FaRegSquare className="w-5 h-5 text-neutral-300" />
                      )}
                      <span className="text-neutral-800 text-sm font-semibold leading-tight">
                        {day}
                      </span>
                    </label>
                    <div className="flex-1 flex justify-start items-center gap-3">
                      {workingHours[day].enabled ? (
                        <>
                          <div className="flex-1 relative self-stretch">
                            <input
                              type="time"
                              className="w-full h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal leading-tight pr-8"
                              value={workingHours[day].startShift}
                              onChange={(e) => handleTimeChange(day, 'startShift', e.target.value)}
                              required={workingHours[day].enabled}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <LuClock className="w-5 h-5 text-zinc-400" />
                            </div>
                          </div>
                          <span className="text-center text-neutral-600 text-sm font-normal leading-tight">-</span>
                          <div className="flex-1 relative self-stretch">
                            <input
                              type="time"
                              className="w-full h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal leading-tight pr-8"
                              value={workingHours[day].endShift}
                              onChange={(e) => handleTimeChange(day, 'endShift', e.target.value)}
                              required={workingHours[day].enabled}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <LuClock className="w-5 h-5 text-zinc-400" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex-1 flex justify-center items-center h-10 px-3 py-2 bg-gray-100 rounded-lg text-gray-500 text-sm font-normal leading-tight w-full">
                          Unavailable
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Breaking Time Column */}
            <div className="flex-1 p-4 rounded-xl border border-gray-200 flex flex-col justify-start items-start gap-5 overflow-hidden">
              <div className="self-stretch flex flex-col justify-start items-start gap-6">
                {/* Header Row */}
                <div className="self-stretch rounded-xl flex justify-start items-center gap-6">
                  <div className="w-44 text-neutral-800 text-sm font-semibold leading-tight">Breaking time</div>
                  <div className="flex-1 flex justify-start items-center gap-3">
                    <div className="flex-1 text-center text-gray-500 text-sm font-normal leading-tight">Break Start</div>
                    <div className="opacity-0 text-center text-neutral-600 text-sm font-normal leading-tight">-</div>
                    <div className="flex-1 text-center text-gray-500 text-sm font-normal leading-tight">Break End</div>
                  </div>
                </div>
                {/* Days Loop */}
                {daysOfWeek.map(day => (
                  <div key={`${day}-break`} className="self-stretch rounded-xl flex justify-start items-center gap-6">
                    <label className="w-44 flex justify-start items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={workingHours[day].breakEnabled && workingHours[day].enabled} // Break only enabled if day is enabled
                        onChange={() => handleBreakToggle(day)}
                        disabled={!workingHours[day].enabled} // Disable break checkbox if day is disabled
                      />
                      {(workingHours[day].breakEnabled && workingHours[day].enabled) ? (
                        <FaSquareCheck className="w-5 h-5 text-violet-500" />
                      ) : (
                        <FaRegSquare className="w-5 h-5 text-neutral-300" />
                      )}
                      <span className="text-neutral-800 text-sm font-semibold leading-tight">
                        {day}
                      </span>
                    </label>
                    <div className="flex-1 flex justify-start items-center gap-3">
                      {(workingHours[day].breakEnabled && workingHours[day].enabled) ? (
                        <>
                          <div className="flex-1 relative self-stretch">
                            <input
                              type="time"
                              className="w-full h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal leading-tight pr-8"
                              value={workingHours[day].breakStart}
                              onChange={(e) => handleTimeChange(day, 'breakStart', e.target.value)}
                              required={workingHours[day].breakEnabled && workingHours[day].enabled}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <LuClock className="w-5 h-5 text-zinc-400" />
                            </div>
                          </div>
                          <span className="text-center text-neutral-600 text-sm font-normal leading-tight">-</span>
                          <div className="flex-1 relative self-stretch">
                            <input
                              type="time"
                              className="w-full h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal leading-tight pr-8"
                              value={workingHours[day].breakEnd}
                              onChange={(e) => handleTimeChange(day, 'breakEnd', e.target.value)}
                              required={workingHours[day].breakEnabled && workingHours[day].enabled}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <LuClock className="w-5 h-5 text-zinc-400" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex-1 flex justify-center items-center h-10 px-3 py-2 bg-gray-100 rounded-lg text-gray-500 text-sm font-normal leading-tight w-full">
                          No Break
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>

        {/* Action Buttons */}
        <div className="self-stretch inline-flex justify-end items-center gap-2 mt-4">
          <button
            type="button"
            onClick={handlePrevious}
            className="h-10 px-3 py-2 bg-white rounded-lg border border-neutral-800 flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors duration-200 text-neutral-800 text-sm font-semibold leading-tight"
          >
            Previous
          </button>
          <button
            type="submit" // Submits the form implicitly
            onClick={handleContinue}
            className="h-10 px-3 py-2 bg-neutral-800 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-700 transition-colors duration-200 text-white text-sm font-semibold leading-tight"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffWorkingHoursPage;