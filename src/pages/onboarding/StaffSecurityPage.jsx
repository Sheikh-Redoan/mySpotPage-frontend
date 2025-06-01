// src/pages/onboarding/StaffSecurityPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { GoChevronRight } from "react-icons/go"; // Chevron for breadcrumbs
import { LuEye, LuEyeOff } from "react-icons/lu"; // Eye icons for password toggle
import { FaSquareCheck, FaRegSquare } from "react-icons/fa6"; // Checkbox icons

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-['Golos_Text']">
      <div className="w-[722px] flex flex-col justify-start items-start gap-4">
        {/* Breadcrumbs */}
        <div className="self-stretch inline-flex justify-start items-center gap-2">
          <span className="text-gray-400 text-sm font-normal leading-tight">Basic information</span>
          <GoChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-sm font-normal leading-tight">Services settings</span>
          <GoChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-sm font-normal leading-tight">Working shift settings</span>
          <GoChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-950 text-sm font-normal leading-tight">Security</span>
        </div>

        {/* Main Form Container */}
        <div className="self-stretch p-6 bg-white rounded-xl border border-gray-200 flex flex-col justify-start items-center gap-8">
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
                  {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
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
                  {showConfirmPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms and Privacy Checkbox */}
            <div className="self-stretch inline-flex justify-start items-center gap-1">
              <label htmlFor="agreeToTerms" className="flex items-center cursor-pointer">
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="hidden" // Hide native checkbox
                  required // Make agreeing to terms mandatory
                />
                <div className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center transition-all duration-150 ${
                  agreedToTerms ? 'border-violet-500 bg-violet-500' : 'border-neutral-300'
                }`}>
                  {agreedToTerms && <FaSquareCheck className="w-4 h-4 text-white" />}
                </div>
              </label>
              <div className="justify-start text-neutral-700 text-sm font-normal leading-tight ml-1">
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
            onClick={handleFinish}
            className="h-10 px-3 py-2 bg-neutral-800 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-700 transition-colors duration-200 text-white text-sm font-semibold leading-tight"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffSecurityPage;