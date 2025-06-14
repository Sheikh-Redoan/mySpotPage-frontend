import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
// Removed react-icons imports, will use inline SVGs

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-['Golos_Text'] max-[700px]:p-0 max-[700px]:bg-white max-[700px]:py-4">
      {/* Main container adjusted for responsiveness */}
      <div className="w-full max-w-[1179px] flex flex-col justify-start items-start gap-4">
        {/* Breadcrumbs */}
        <div className="self-stretch inline-flex flex-wrap justify-start items-center gap-2 px-4 sm:px-0 max-[700px]:gap-1">
          <span className="text-gray-400 text-sm font-normal leading-tight max-[700px]:text-xs">Basic information</span>
          {/* GoChevronRight */}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="text-gray-400 text-sm font-normal leading-tight max-[700px]:text-xs">Services settings</span>
          {/* GoChevronRight */}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="text-gray-950 text-sm font-normal leading-tight max-[700px]:text-xs">Working shift settings</span>
          {/* GoChevronRight */}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="text-gray-400 text-sm font-normal leading-tight max-[700px]:text-xs">Security</span>
        </div>

        {/* Main Form Container */}
        <div className="self-stretch p-6 sm:p-8 bg-white rounded-xl border border-gray-200 flex flex-col justify-start items-center gap-4 max-[700px]:p-0">
          <div className="self-stretch inline-flex justify-start items-start gap-10 w-full max-[768px]:flex-col max-[768px]:gap-4">
            {/* Working Hours Column */}
            <div className="flex-1 p-4 rounded-xl border border-gray-200 flex flex-col justify-start items-start gap-5 overflow-hidden w-full">
              <div className="self-stretch flex flex-col justify-start items-start gap-6">
                {/* Header Row */}
                <div className="self-stretch rounded-xl flex justify-start items-center gap-6 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-2">
                  <div className="w-44 max-[700px]:w-auto text-neutral-800 text-sm font-semibold leading-tight">Working hours</div>
                  <div className="flex-1 flex justify-start items-center gap-3 w-full max-[700px]:gap-2">
                    <div className="flex-1 text-center text-gray-500 text-sm font-normal leading-tight">Start Shift</div>
                    <div className="opacity-0 text-center text-neutral-600 text-sm font-normal leading-tight">-</div>
                    <div className="flex-1 text-center text-gray-500 text-sm font-normal leading-tight">End Shift</div>
                  </div>
                </div>
                {/* Days Loop */}
                {daysOfWeek.map(day => (
                  <div key={day} className="self-stretch rounded-xl flex justify-start items-center gap-6 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-2">
                    <label className="w-44 max-[700px]:w-auto flex justify-start items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        // Removed className="hidden" to make the native checkbox visible
                        checked={workingHours[day].enabled}
                        onChange={() => handleWorkingDayToggle(day)}
                      />
                      {/* Removed SVG icons, native checkbox will be used */}
                      <span className="text-neutral-800 text-sm font-semibold leading-tight">
                        {day}
                      </span>
                    </label>
                    <div className="flex-1 flex justify-start items-center gap-3 w-full max-[700px]:gap-2">
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
                              {/* LuClock */}
                              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
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
                              {/* LuClock */}
                              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
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
            <div className="flex-1 p-4 rounded-xl border border-gray-200 flex flex-col justify-start items-start gap-5 overflow-hidden w-full">
              <div className="self-stretch flex flex-col justify-start items-start gap-6">
                {/* Header Row */}
                <div className="self-stretch rounded-xl flex justify-start items-center gap-6 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-2">
                  <div className="w-44 max-[700px]:w-auto text-neutral-800 text-sm font-semibold leading-tight">Breaking time</div>
                  <div className="flex-1 flex justify-start items-center gap-3 w-full max-[700px]:gap-2">
                    <div className="flex-1 text-center text-gray-500 text-sm font-normal leading-tight">Break Start</div>
                    <div className="opacity-0 text-center text-neutral-600 text-sm font-normal leading-tight">-</div>
                    <div className="flex-1 text-center text-gray-500 text-sm font-normal leading-tight">Break End</div>
                  </div>
                </div>
                {/* Days Loop */}
                {daysOfWeek.map(day => (
                  <div key={`${day}-break`} className="self-stretch rounded-xl flex justify-start items-center gap-6 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-2">
                    <label className="w-44 max-[700px]:w-auto flex justify-start items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        // Removed className="hidden" to make the native checkbox visible
                        checked={workingHours[day].breakEnabled && workingHours[day].enabled} // Break only enabled if day is enabled
                        onChange={() => handleBreakToggle(day)}
                        disabled={!workingHours[day].enabled} // Disable break checkbox if day is disabled
                      />
                      {/* Removed SVG icons, native checkbox will be used */}
                      <span className="text-neutral-800 text-sm font-semibold leading-tight">
                        {day}
                      </span>
                    </label>
                    <div className="flex-1 flex justify-start items-center gap-3 w-full max-[700px]:gap-2">
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
                              {/* LuClock */}
                              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
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
                              {/* LuClock */}
                              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
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
        <div className="self-stretch flex justify-center sm:justify-end items-center gap-2 mt-4 px-4 sm:px-0">
          <button
            type="button"
            onClick={handlePrevious}
            className="h-10 px-3 py-2 bg-white rounded-lg border border-neutral-800 flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors duration-200 text-neutral-800 text-sm font-semibold leading-tight w-full sm:w-auto"
          >
            Previous
          </button>
          <button
            type="submit" // Submits the form implicitly
            onClick={handleContinue}
            className="h-10 px-3 py-2 bg-neutral-800 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-700 transition-colors duration-200 text-white text-sm font-semibold leading-tight w-full sm:w-auto"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffWorkingHoursPage;
