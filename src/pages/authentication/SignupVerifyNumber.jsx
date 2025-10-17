import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideInFromRight } from "@/animations/variants";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authAPI } from "@/utils/api"; // This import will now work
import { setTokens, setUser } from "@/redux/features/auth/authSlice";
import { useVerifyClientOtpMutation } from "../../redux/features/auth/authApi";

const SignupVerifyNumber = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [verifyClientOtp] = useVerifyClientOtpMutation();

  const { number, type } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!number) {
      setError("Phone number not found. Please go back and try again.");
      return;
    }

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("otp", otp);
    formData.append("number", number);

    try {
      const response = await verifyClientOtp(formData);
      console.log(response);
      
      if (response.data && response.data.token) {
        // User already exists, log them in
        dispatch(setTokens({
          accessToken: response.data.token.access,
          refreshToken: response.data.token.refresh,
        }));
        if (response.data.user) {
          dispatch(setUser({ user: response.data.user }));
        }
        // Redirect based on user type
        navigate(type === 'client' ? '/' : '/dashboard');
      } else {
        // ✅ KEY FIX: Pass type to setup page with state
        navigate(`/setup-signup?type=${type || 'client'}`, {
          state: { number, type: type || 'client' }
        });
      }
    } catch (err) {
      setError("Failed to verify OTP. Please check the code and try again.");
      console.error("OTP verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center font-golos items-center min-h-screen bg-gray-100">
      <motion.form
        variants={slideInFromRight()}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="bg-white p-[40px] rounded-[12px] mx-3 sm:mx-0 shadow-md w-full max-w-md"
      >
        <h2 className="text-[20px] font-semibold text-center w-full">
          Verify Phone Number
        </h2>
        <p className="py-4 text-sm text-[#797979]">
          We've sent an OTP code to <strong>{number || "your phone"}</strong>.
        </p>

        {error && (
          <div className="text-red-600 text-sm text-center mb-4">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label htmlFor="otp" className="block text-gray-700 font-medium mb-2">
            OTP <span className="text-orange-600">*</span>
          </label>
          <input
            id="otp"
            type="text"
            placeholder="Enter your 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className="w-full text-sm px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB]"
            required
            maxLength="6"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#744CDB] text-white py-2 rounded-md hover:bg-[#633CDB] transition-all duration-200 text-sm disabled:opacity-50"
          disabled={isLoading || !otp || otp.length !== 6}
        >
          {isLoading ? "Verifying..." : "Continue"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Haven't received the code?{" "}
          <button
            type="button"
            className="text-[#744CDB] font-medium hover:underline"
          >
            Resend
          </button>
        </p>
      </motion.form>
    </div>
  );
};

export default SignupVerifyNumber;