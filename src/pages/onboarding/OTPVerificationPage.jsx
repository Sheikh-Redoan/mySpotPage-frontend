// src/pages/onboarding/OTPVerificationPage.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router"; // Use react-router-dom for navigation

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // To access state passed during navigation

  // Example: Retrieve initial staff data passed from AddStaffModal (simulated via state)
  // In a real app, this data would likely be stored on the server after SMS is sent
  // and retrieved securely on this page using a token from the URL.
  const { phoneNumber, roles, jobTitle } = location.state || {};
  const staffNamePlaceholder = location.state?.staffName || "New Staff Member";


  const handleContinue = (e) => {
    e.preventDefault();
    setError("");

    // Basic OTP validation (for demo purposes)
    if (otp === "123456") { // Hardcoded OTP for demonstration
      console.log("OTP verified successfully for", phoneNumber);
      // Navigate to the information entering page, passing pre-filled data
      navigate("/onboard/staff-info", {
        state: { phoneNumber, roles, jobTitle, staffName: staffNamePlaceholder },
      });
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-['Golos_Text']">
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col justify-start items-center gap-8">
        <form onSubmit={handleContinue} className="self-stretch flex flex-col justify-start items-start gap-5">
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <label className="rounded-xl inline-flex justify-start items-start gap-1">
              <span className="justify-start text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                OTP
              </span>
              <span className="justify-start text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">
                *
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your OTP code"
              className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal font-['Golos_Text'] leading-tight"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            className="self-stretch h-10 px-3 py-2 bg-neutral-800 rounded-lg inline-flex justify-center items-center gap-2 hover:bg-gray-700 transition-colors duration-200"
          >
            <span className="justify-center text-white text-sm font-semibold font-['Golos_Text'] leading-tight">
              Continue
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerificationPage;