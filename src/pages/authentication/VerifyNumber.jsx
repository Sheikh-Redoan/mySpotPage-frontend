import { slideInFromRight } from "@/animations/variants";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useVerifyClientOtpMutation, useResendOtpMutation } from "@/redux/features/auth/authApi";

const VerifyNumber = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  const { number, type } = location.state || {};
  
  const [verifyOtp, { isLoading }] = useVerifyClientOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

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

    const formData = new FormData();
    formData.append("otp", otp);
    formData.append("number", number);

    try {
      await verifyOtp(formData).unwrap();
      
      // Navigate based on user type
      if (type === "client") {
        navigate("/", { replace: true }); // Navigate to client home/service provider info
      } else {
        navigate("/dashboard", { replace: true }); // Navigate to seller dashboard
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError(
        err.data?.message ||
          err.data?.detail ||
          "Failed to verify OTP. Please check the code and try again."
      );
    }
  };

  const handleResend = async () => {
    if (!number) {
      setError("Phone number not found.");
      return;
    }

    setError("");
    const formData = new FormData();
    formData.append("number", number);

    try {
      await resendOtp(formData).unwrap();
      alert("OTP has been resent to your phone number.");
    } catch (err) {
      console.error("Resend OTP error:", err);
      setError(
        err.data?.message ||
          err.data?.detail ||
          "Failed to resend OTP. Please try again."
      );
    }
  };

  return (
    <div className="bg-gray-100 font-golos">
      <div className="sm:hidden flex items-center gap-2 px-4 pt-6">
        <Link
          to="/signin"
          className="flex items-center text-[#0f0528] font-medium hover:underline"
        >
          <ArrowLeft size={20} />
          <span className="ml-2">Back</span>
        </Link>
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <motion.form
          onSubmit={handleSubmit}
          variants={slideInFromRight()}
          initial="hidden"
          animate="visible"
          className="bg-white p-[40px] rounded-[12px] mx-3 sm:mx-0 shadow-md w-full max-w-md"
        >
          <div className="flex items-center mb-6">
            <Link className="hidden sm:block" to={"/signin"}>
              <ArrowLeft size={24} />
            </Link>
            <h2 className="text-[20px] font-semibold text-center w-full">
              Verify Phone Number
            </h2>
          </div>
          
          <p className="py-4 text-sm text-[#797979]">
            We've sent an OTP code to <strong>{number || "your phone"}</strong>. Please check and verify.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm text-center mb-4">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="otp"
              className="block text-gray-700 font-medium mb-2"
            >
              OTP <span className="text-orange-600">*</span>
            </label>
            <input
              id="otp"
              type="text"
              placeholder="Enter your 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength="6"
              className="w-full text-sm px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB]"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#744CDB] text-white py-2 rounded-md hover:bg-[#633CDB] hover:scale-x-95 transition-all transform duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-x-100"
            disabled={isLoading || !otp || otp.length !== 6}
          >
            {isLoading ? "Verifying..." : "Continue"}
          </button>

          {/* Resend Navigation */}
          <p className="text-center mt-4 text-sm text-gray-600">
            Haven't received code?{" "}
            <button
              type="button"
              onClick={handleResend}
              className="text-[#744CDB] font-medium hover:underline disabled:opacity-50"
              disabled={isResending}
            >
              {isResending ? "Sending..." : "Resend"}
            </button>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default VerifyNumber;