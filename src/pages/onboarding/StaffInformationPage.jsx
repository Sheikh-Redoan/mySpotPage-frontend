import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router"; // Corrected import

const StaffInformationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    phoneNumber: initialPhoneNumber,
    roles, // Roles from AddStaffModal
    jobTitle, // JobTitle from AddStaffModal
    staffName: passedStaffName, // Temporary staffName from AddStaffModal
  } = location.state || {};

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [firstName, setFirstName] = useState(passedStaffName || ""); // Pre-fill first name if available
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || "");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  useEffect(() => {
    // Revoke object URL on component unmount to prevent memory leaks
    return () => {
      if (profileImagePreview) {
        URL.revokeObjectURL(profileImagePreview);
      }
    };
  }, [profileImagePreview]);

  // Effect to check for missing initial data
  useEffect(() => {
    if (!initialPhoneNumber || !roles || !jobTitle) {
      setError("Missing initial staff data. Please restart the onboarding process.");
    }
  }, [initialPhoneNumber, roles, jobTitle]);

  // Handle image file selection and preview generation
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      // Revoke previous object URL if it exists
      if (profileImagePreview) {
        URL.revokeObjectURL(profileImagePreview);
      }
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Validate all required fields
    if (!profileImage || !firstName || !lastName || !phoneNumber || !dateOfBirth || !gender) {
      setError("Please fill in all required fields.");
      return;
    }

    // Combine all collected data to pass to the next page
    const staffBasicInfo = {
      profileImage: profileImage ? URL.createObjectURL(profileImage) : null, // Pass URL for preview
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      gender,
      // Pass data received from previous steps (AddStaffModal)
      roles,
      jobTitle,
    };

    console.log("Staff Basic Information Collected:", staffBasicInfo);

    // Navigate to the Services settings page, passing all collected data
    navigate("/onboard/services-settings", { state: staffBasicInfo });
  };

  // Render error message if there's a critical error
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-['Golos_Text'] max-[475px]:p-0 max-[475px]:bg-white max-[475px]:py-4">
      {/* Main container adjusted for responsiveness */}
      <div className="w-full max-w-[722px] flex flex-col justify-start items-start gap-4">
        {/* Breadcrumbs - adjusted to wrap on small screens */}
        <div className="self-stretch inline-flex flex-wrap justify-start items-center gap-2 px-4 sm:px-0 max-[475px]:gap-1">
          <span className="text-gray-950 text-sm font-normal leading-tight max-[475px]:text-xs">Basic information</span>
          {/* Replaced GoChevronRight with inline SVG */}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="text-gray-400 text-sm font-normal leading-tight max-[475px]:text-xs">Services settings</span>
          {/* Replaced GoChevronRight with inline SVG */}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="text-gray-400 text-sm font-normal leading-tight max-[475px]:text-xs">Working shift settings</span>
          {/* Replaced GoChevronRight with inline SVG */}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="text-gray-400 text-sm font-normal leading-tight max-[475px]:text-xs">Security</span>
        </div>

        {/* Main Form Container */}
        {/* Added responsive padding px-4 for smaller screens */}
        <div className="self-stretch p-6 sm:p-8 bg-white rounded-xl border border-gray-200 flex flex-col justify-start items-center gap-8">
          <form onSubmit={handleSubmit} className="self-stretch flex flex-col justify-start items-start gap-6 overflow-hidden">
            {/* Profile Image Upload */}
            <div className="flex flex-col justify-center items-start gap-3">
              <label htmlFor="profile-image-upload" className="rounded-xl inline-flex justify-start items-start gap-1 cursor-pointer">
                <span className="text-neutral-700 text-sm font-normal leading-tight">Profile image</span>
                <span className="text-red-500 text-sm font-normal leading-tight">*</span>
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
              </label>
              <div
                className="w-20 h-20 rounded-full border border-gray-200 flex flex-col justify-center items-center overflow-hidden relative cursor-pointer"
                onMouseEnter={() => setIsHoveringImage(true)}
                onMouseLeave={() => setIsHoveringImage(false)}
                onClick={() => document.getElementById('profile-image-upload').click()}
              >
                {profileImagePreview ? (
                  <img
                    src={profileImagePreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                    {/* Replaced IoCameraOutline with inline SVG */}
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22c.243.364.63.546 1.026.546H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                )}
                {/* Hover Overlay */}
                {isHoveringImage && (
                  <div className="absolute inset-0 bg-gray-300/50 rounded-full flex items-center justify-center backdrop-blur-[2px] transition-opacity duration-200">
                    <span className="px-2 py-1 bg-white/30 rounded-full backdrop-blur-[6px] text-white text-xs font-semibold leading-none">
                      Upload
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* First Name & Last Name - adjusted to stack on small screens */}
            <div className="self-stretch grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="flex flex-col justify-start items-start gap-1">
                <label htmlFor="firstName" className="rounded-xl inline-flex justify-start items-start gap-1">
                  <span className="text-neutral-700 text-sm font-normal leading-tight">First name</span>
                  <span className="text-red-500 text-sm font-normal leading-tight">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal leading-tight"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              {/* Last Name */}
              <div className="flex flex-col justify-start items-start gap-1">
                <label htmlFor="lastName" className="rounded-xl inline-flex justify-start items-start gap-1">
                  <span className="text-neutral-700 text-sm font-normal leading-tight">Last name</span>
                  <span className="text-red-500 text-sm font-normal leading-tight">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal leading-tight"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Phone Number & Date of Birth - adjusted to stack on small screens */}
            <div className="self-stretch grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Number */}
              <div className="flex flex-col justify-start items-start gap-1">
                <label htmlFor="phoneNumber" className="rounded-xl inline-flex justify-start items-start gap-1">
                  <span className="text-neutral-700 text-sm font-normal leading-tight">Phone number</span>
                  <span className="text-red-500 text-sm font-normal leading-tight">*</span>
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="(+1) 234 567 890"
                  className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal leading-tight"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              {/* Date of Birth */}
              <div className="flex flex-col justify-start items-start gap-1">
                <label htmlFor="dateOfBirth" className="rounded-xl inline-flex justify-start items-start gap-1">
                  <span className="text-neutral-700 text-sm font-normal leading-tight">Date of birth</span>
                  <span className="text-red-500 text-sm font-normal leading-tight">*</span>
                </label>
                <div className="relative self-stretch">
                  <input
                    id="dateOfBirth"
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 appearance-none focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal leading-tight w-full pr-10"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {/* Replaced SlCalender with inline SVG */}
                    <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Gender Radios */}
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <label className="rounded-xl inline-flex justify-start items-start gap-1">
                <span className="text-neutral-700 text-sm font-normal leading-tight">Gender</span>
                <span className="text-red-500 text-sm font-normal leading-tight">*</span>
              </label>
              <div className="inline-flex flex-wrap justify-start items-center gap-4">
                {["Male", "Female", "Other"].map((g) => (
                  <label key={g} className="flex justify-start items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={gender === g}
                      onChange={(e) => setGender(e.target.value)}
                      className="hidden"
                      required
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
                      gender === g ? 'border-violet-500' : 'border-neutral-300'
                    }`}>
                      {gender === g && (
                        <div className="w-2.5 h-2.5 bg-violet-500 rounded-full"></div>
                      )}
                    </div>
                    <span className="text-neutral-700 text-sm font-normal leading-tight">{g}</span>
                  </label>
                ))}
              </div>
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </form>
        </div>

        {/* Continue Button - adjusted for responsiveness */}
        <div className="self-stretch flex justify-center sm:justify-end items-center gap-2 mt-4 px-4 sm:px-0">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full sm:w-auto h-10 px-3 py-2 bg-neutral-800 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-700 transition-colors duration-200 text-white text-sm font-semibold font-['Golos_Text'] leading-tight"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffInformationPage; 