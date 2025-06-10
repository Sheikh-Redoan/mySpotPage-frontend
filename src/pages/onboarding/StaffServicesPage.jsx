import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
// Removed react-icons imports as they will be replaced with inline SVGs
// import { GoChevronRight } from "react-icons/go";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// import { FaSquareCheck, FaRegSquare } from "react-icons/fa6";
import { staffData as initialStaffData } from "../../lib/staffData";

const StaffServicesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const servicesDropdownRef = useRef(null);

  // Retrieve all data passed from the previous StaffInformationPage
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
  } = location.state || {};

  const [selectedServices, setSelectedServices] = useState([]);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [error, setError] = useState("");

  const allAvailableServices = useMemo(() => {
    return Array.from(new Set(initialStaffData.flatMap((staff) => staff.services)));
  }, []);

  useEffect(() => {
    if (!firstName || !lastName || !phoneNumber || !roles || !jobTitle) {
      setError("Missing previous staff data. Please restart the onboarding process.");
    }
  }, [firstName, lastName, phoneNumber, roles, jobTitle]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target) &&
        !event.target.closest(".services-select-input")
      ) {
        setShowServicesDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleServiceChange = (service) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(service)
        ? prevSelected.filter((s) => s !== service)
        : [...prevSelected, service]
    );
  };

  const handlePrevious = () => {
    // Navigate back to the StaffInformationPage, passing current data back
    navigate("/onboard/staff-info", {
      state: {
        profileImage,
        profileImagePreview,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        gender,
        roles,
        jobTitle,
      },
    });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setError("");

    if (selectedServices.length === 0) {
      setError("Please select at least one service.");
      return;
    }

    // Combine all collected data to pass to the next page
    const staffServicesInfo = {
      profileImage,
      profileImagePreview,
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      gender,
      roles,
      jobTitle,
      selectedServices, // New data from this page
    };

    console.log("Staff Services Information Collected:", staffServicesInfo);

    // Navigate to the next step: Working shift settings
    navigate("/onboard/working-shift-settings", { state: staffServicesInfo });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-['Golos_Text']">
        <div className="w-96 p-6 bg-white rounded-lg shadow-lg border border-gray-200 text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => navigate("/seller-management")} // Go back to staff list
            className="mt-6 px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-gray-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-['Golos_Text'] max-[475px]:p-0 max-[475px]:bg-white max-[475px]:py-4">
      <div className="w-full max-w-[722px] flex flex-col justify-start items-start gap-4">
        {/* Breadcrumbs */}
        <div className="self-stretch inline-flex flex-wrap justify-start items-center gap-2 px-4 sm:px-0 max-[475px]:gap-1">
          <span className="text-gray-400 text-sm font-normal leading-tight max-[475px]:text-xs">Basic information</span>
          {/* Replaced GoChevronRight with inline SVG */}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="text-gray-950 text-sm font-normal leading-tight max-[475px]:text-xs">Services settings</span>
          {/* Replaced GoChevronRight with inline SVG */}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="text-gray-400 text-sm font-normal leading-tight max-[475px]:text-xs">Working shift settings</span>
          {/* Replaced GoChevronRight with inline SVG */}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="text-gray-400 text-sm font-normal leading-tight max-[475px]:text-xs">Security</span>
        </div>

        {/* Main Form Container */}
        <div className="self-stretch p-6 sm:p-8 bg-white rounded-xl border border-gray-200 flex flex-col justify-start items-center gap-8">
          <form onSubmit={handleContinue} className="self-stretch flex flex-col justify-start items-start gap-6">
            {/* Role & Job Title (Read-only, passed from previous steps) */}
            <div className="self-stretch grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Role */}
              <div className="flex flex-col justify-start items-start gap-1">
                <label className="rounded-xl inline-flex justify-start items-start gap-1">
                  <span className="text-neutral-700 text-sm font-normal leading-tight">Role</span>
                  <span className="text-red-500 text-sm font-normal leading-tight">*</span>
                </label>
                <div className="self-stretch h-10 px-3 py-2 rounded-lg border border-gray-200 inline-flex justify-start items-center gap-2 bg-gray-50 overflow-y-scroll">
                  <div className="flex-1 flex flex-wrap items-center gap-2 overflow-hidden pr-2">
                    {roles && roles.length > 0 ? (
                      roles.map((role) => (
                        <span
                          key={role}
                          className="px-2 py-1 bg-violet-50 rounded text-violet-500 text-xs font-medium leading-none whitespace-nowrap"
                        >
                          {role}
                        </span>
                      ))
                    ) : (
                      <span className="text-zinc-400 text-sm font-normal leading-tight">N/A</span>
                    )}
                  </div>
                  {/* Replaced FiChevronDown with inline SVG */}
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
              {/* Job title */}
              <div className="flex flex-col justify-start items-start gap-1">
                <label className="rounded-xl inline-flex justify-start items-start gap-1">
                  <span className="text-neutral-700 text-sm font-normal leading-tight">Job title</span>
                  <span className="text-red-500 text-sm font-normal leading-tight">*</span>
                </label>
                <input
                  type="text"
                  value={jobTitle || ''}
                  className="self-stretch h-10 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-sm font-normal leading-tight pointer-events-none"
                  readOnly
                />
              </div>
            </div>

            {/* Services Multi-select */}
            <div className="self-stretch flex flex-col justify-start items-start gap-2 relative">
              <label htmlFor="services-select" className="rounded-xl inline-flex justify-start items-start gap-1">
                <span className="text-neutral-700 text-sm font-normal leading-tight">Services</span>
                <span className="text-red-500 text-sm font-normal leading-tight">*</span>
              </label>
              <div
                id="services-select"
                className="services-select-input self-stretch h-10 px-3 py-2 rounded-lg border border-gray-200 inline-flex justify-between items-center gap-2 cursor-pointer hover:border-gray-300 focus-within:border-violet-500 overflow-y-scroll"
                onClick={() => setShowServicesDropdown(!showServicesDropdown)}
              >
                <div className="flex-1 flex flex-wrap items-center gap-2 overflow-hidden pr-2">
                  {selectedServices.length > 0 ? (
                    selectedServices.map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-violet-50 rounded text-violet-500 text-xs font-medium leading-none whitespace-nowrap"
                      >
                        {service}
                      </span>
                    ))
                  ) : (
                    <span className="text-zinc-400 text-sm font-normal leading-tight">
                      Select
                    </span>
                  )}
                </div>
                {showServicesDropdown ? (
                  // Corrected inline SVG placement for FiChevronUp
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                ) : (
                  // Corrected inline SVG placement for FiChevronDown
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                )}
              </div>

              {showServicesDropdown && (
                <div
                  ref={servicesDropdownRef}
                  className="absolute top-[calc(100%+8px)] left-0 w-full p-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-60 overflow-y-auto"
                >
                  {allAvailableServices.length > 0 ? (
                    allAvailableServices.map((service) => (
                      <label
                        key={service}
                        className="self-stretch h-8 px-2 py-1 rounded flex items-center gap-2 cursor-pointer hover:bg-violet-50 transition-colors duration-150"
                      >
                        {selectedServices.includes(service) ? (
                          // Corrected inline SVG placement for FaSquareCheck
                          <svg className="w-5 h-5 text-violet-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        ) : (
                          // Corrected inline SVG placement for FaRegSquare
                          <svg className="w-5 h-5 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12V6m0 0a2 2 0 10-4 0v6a2 2 0 002 2h2m0 0a2 2 0 104 0v-6a2 2 0 00-2-2h-2m-2 0v6a2 2 0 104 0v-6a2 2 0 00-2-2H9z"></path></svg>
                        )}
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={selectedServices.includes(service)}
                          onChange={() => handleServiceChange(service)}
                        />
                        <span className="flex-1 text-neutral-800 text-sm font-normal leading-tight">
                          {service}
                        </span>
                      </label>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm px-2 py-1">No services available.</p>
                  )}
                </div>
              )}
            </div>
            <p className="justify-start text-gray-400 text-xs font-normal leading-none">The services this staff member will be responsible for: --</p>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </form>
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
            type="submit" // Submits the form
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

export default StaffServicesPage;
