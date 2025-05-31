// src/pages/onboarding/StaffInformationPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { IoClose } from "react-icons/io5"; // Close icon

const StaffInformationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve data passed from OTPVerificationPage
  const { phoneNumber, roles, jobTitle, staffName: passedStaffName } = location.state || {};

  const [staffName, setStaffName] = useState(passedStaffName || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // If essential data is missing, redirect back or show error
    if (!phoneNumber || !roles || !jobTitle) {
      setError("Missing staff data. Please restart the onboarding process.");
      // Optional: navigate('/some-error-page-or-back-to-add-staff');
    }
  }, [phoneNumber, roles, jobTitle]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!staffName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
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
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email address.");
        return;
    }

    console.log("Staff Information Submitted:", {
      phoneNumber, // From previous step
      roles,       // From previous step
      jobTitle,    // From previous step
      staffName,
      email,
      password,
    });

    // In a real application, you'd send this data to your backend
    // and then navigate to a success page or the main dashboard.
    navigate("/signup-successfull", { state: { message: "Staff profile created successfully!" } });
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-['Golos_Text']">
      <div className="w-[600px] bg-white rounded-lg shadow-xl flex flex-col justify-start items-start">
        {/* Header */}
        <div className="self-stretch px-6 py-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-neutral-800 text-lg font-semibold font-['Golos_Text'] leading-relaxed">
            Complete Staff Profile
          </h2>
          {/* No close button as it's an onboarding step */}
          <div className="w-6 h-6 opacity-0" />
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="self-stretch px-6 py-4 flex flex-col justify-start items-start gap-4 overflow-y-auto">
          {/* Display pre-filled information if available */}
          <div className="text-gray-700 text-sm font-normal">
            <p>Welcome, <span className="font-semibold">{staffName}</span>! Let's set up your profile.</p>
            <p>Phone: <span className="font-semibold">{phoneNumber || 'N/A'}</span></p>
            <p>Role(s): <span className="font-semibold">{roles?.join(', ') || 'N/A'}</span></p>
            <p>Job Title: <span className="font-semibold">{jobTitle || 'N/A'}</span></p>
          </div>
          <div className="self-stretch h-px bg-gray-100 my-2"></div>

          {/* Full Name */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <label className="rounded-xl inline-flex justify-start items-start gap-1">
              <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                Full Name
              </span>
              <span className="text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="self-stretch h-10 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal font-['Golos_Text'] leading-tight"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <label className="rounded-xl inline-flex justify-start items-start gap-1">
              <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                Email
              </span>
              <span className="text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="self-stretch h-10 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal font-['Golos_Text'] leading-tight"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <label className="rounded-xl inline-flex justify-start items-start gap-1">
              <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                Password
              </span>
              <span className="text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="self-stretch h-10 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal font-['Golos_Text'] leading-tight"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <label className="rounded-xl inline-flex justify-start items-start gap-1">
              <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                Confirm Password
              </span>
              <span className="text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">*</span>
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="self-stretch h-10 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal font-['Golos_Text'] leading-tight"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

          {/* Action Buttons */}
          <div className="self-stretch px-6 py-4 border-t border-gray-200 flex justify-end items-center gap-3 mt-auto">
            {/* Cancel button could go here if needed, but typically not on this final step */}
            <button
              type="submit"
              className="h-10 px-3 py-2 bg-neutral-800 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-700 transition-colors duration-200 text-white text-sm font-semibold font-['Golos_Text'] leading-tight"
            >
              Complete Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffInformationPage;