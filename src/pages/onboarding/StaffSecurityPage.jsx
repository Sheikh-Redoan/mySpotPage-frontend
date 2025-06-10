import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
// Removed react-icons imports, will use inline SVGs

const StaffSecurityPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve all data passed from StaffWorkingHoursPage
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
    workingHours,
  } = location.state || {};

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // If essential initial data is missing, redirect or show error
    if (!firstName || !workingHours) {
      setError("Missing previous staff data. Please restart the onboarding process.");
      // navigate('/seller-management', { replace: true });
    }
  }, [firstName, workingHours]);


  const handlePrevious = () => {
    // Navigate back to the StaffWorkingHoursPage, passing all data
    navigate("/onboard/working-shift-settings", {
      state: {
        profileImage, profileImagePreview, firstName, lastName,
        phoneNumber, dateOfBirth, gender, roles, jobTitle,
        selectedServices, workingHours,
      },
    });
  };

  const handleFinish = (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword || !agreedToTerms) {
      setError("Please fill in all required fields and agree to the terms.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    // Add more complex password validation (e.g., strong password regex) if needed

    // Combine ALL collected data from all onboarding steps
    const finalStaffData = {
      profileImage: profileImage, // This is the File object or URL
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      gender,
      roles,
      jobTitle,
      selectedServices,
      workingHours,
      password, // Password from this step
      // In a real app, you would hash the password before sending to backend
    };

    console.log("Final Staff Data for Submission:", finalStaffData);

    // In a real application, you would send this 'finalStaffData' to your backend
    // to create the new staff member's full profile in your database.
    // After successful submission, you would typically redirect to a success page
    // or the staff member's dashboard.
    navigate("/signup-successfull", { state: { message: "Your staff profile has been successfully created!" } });
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
      {/* Main container adjusted for responsiveness */}
      <div className="w-full max-w-[722px] flex flex-col justify-start items-start gap-4">
        {/* Breadcrumbs */}
        <div className="self-stretch inline-flex flex-wrap justify-start items-center gap-2 px-4 sm:px-0 max-[475px]:gap-1">
          <span className="text-gray-400 text-sm font-normal leading-tight max-[475px]:text-xs">Basic information</span>
          {/* GoChevronRight */}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="text-gray-400 text-sm font-normal leading-tight max-[475px]:text-xs">Services settings</span>
          {/* GoChevronRight */}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="text-gray-400 text-sm font-normal leading-tight max-[475px]:text-xs">Working shift settings</span>
          {/* GoChevronRight */}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="text-gray-950 text-sm font-normal leading-tight max-[475px]:text-xs">Security</span>
        </div>

        {/* Main Form Container */}
        <div className="self-stretch p-6 sm:p-8 bg-white rounded-xl border border-gray-200 flex flex-col justify-start items-center gap-8 max-[475px]:p-3">
          <form onSubmit={handleFinish} className="self-stretch flex flex-col justify-start items-start gap-4 w-full">
            {/* Password */}
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <label htmlFor="password" className="rounded-xl inline-flex justify-start items-start gap-1">
                <span className="text-neutral-700 text-sm font-normal leading-tight">Password</span>
                <span className="text-red-500 text-sm font-normal leading-tight">*</span>
              </label>
              <div className="relative self-stretch">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal leading-tight w-full pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600"
                >
                  {showPassword ? (
                    // LuEyeOff
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.602-2.316c.304-.15.632-.239.976-.239 3.324 0 6.016 2.684 6.016 6s-2.692 6-6.016 6c-.345 0-.673-.09-.976-.24m6.602-3.606c-.304-.15-.632-.239-.976-.239-3.324 0-6.016 2.684-6.016 6s2.692 6 6.016 6c.345 0 .673-.09.976-.24"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  ) : (
                    // LuEye
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <label htmlFor="confirmPassword" className="rounded-xl inline-flex justify-start items-start gap-1">
                <span className="text-neutral-700 text-sm font-normal leading-tight">Confirm password</span>
                <span className="text-red-500 text-sm font-normal leading-tight">*</span>
              </label>
              <div className="relative self-stretch">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal leading-tight w-full pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600"
                >
                  {showConfirmPassword ? (
                    // LuEyeOff
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.602-2.316c.304-.15.632-.239.976-.239 3.324 0 6.016 2.684 6.016 6s-2.692 6-6.016 6c-.345 0-.673-.09-.976-.24m6.602-3.606c-.304-.15-.632-.239-.976-.239-3.324 0-6.016 2.684-6.016 6s2.692 6 6.016 6c.345 0 .673-.09.976-.24"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  ) : (
                    // LuEye
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Privacy Checkbox */}
            <div className="self-stretch inline-flex justify-start items-center gap-2"> {/* Increased gap for native checkbox */}
              <label htmlFor="agreeToTerms" className="flex items-center cursor-pointer">
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  // Removed className="hidden" to make native checkbox visible
                  required // Make agreeing to terms mandatory
                  className="w-5 h-5 text-violet-600 rounded border-gray-300 focus:ring-violet-500" // Tailwind classes for styling native checkbox
                />
              </label>
              <div className="justify-start text-neutral-700 text-sm font-normal leading-tight">
                I agree to the{" "}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-violet-600 text-sm font-normal underline leading-tight">
                  privacy policy
                </a>{" "}
                and{" "}
                <a href="/terms-of-use" target="_blank" rel="noopener noreferrer" className="text-violet-600 text-sm font-normal underline leading-tight">
                  terms of use
                </a>
              </div>
            </div>
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
            type="submit" // Submits the form implicitly
            onClick={handleFinish}
            className="h-10 px-3 py-2 bg-neutral-800 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-700 transition-colors duration-200 text-white text-sm font-semibold leading-tight w-full sm:w-auto"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffSecurityPage;
