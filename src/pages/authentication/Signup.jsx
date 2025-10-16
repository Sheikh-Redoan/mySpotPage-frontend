import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideInFromLeft } from "@/animations/variants";
import { Link, useNavigate, useLocation } from "react-router";
import axios from "axios";

const Signup = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type") || "client"; // Default to client type

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!number) {
      setError("Please enter a valid phone number.");
      return;
    }

    const formData = new FormData();
    formData.append("number", number);

    setIsLoading(true);

    try {
      // Use import.meta.env for Vite environment variables
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
      
      // Call the API to request the OTP for the entered number
      const response = await axios.post(`${baseUrl}/auth/signup/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Signup successful:", response.data);

      // On success, navigate to the verification page and pass the number and type
      navigate("/signup-verify-number", { state: { number, type } });
    } catch (err) {
      console.error("Signup error:", err);
      
      // Better error handling
      if (err.response) {
        // Server responded with error
        setError(
          err.response.data?.message || 
          err.response.data?.detail || 
          err.response.data?.number?.[0] ||
          "Failed to send OTP. Please try again."
        );
      } else if (err.request) {
        // Request made but no response
        setError("No response from server. Please check your connection.");
      } else {
        // Other errors
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-golos">
      <motion.form
        variants={slideInFromLeft()}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="bg-white p-[40px] rounded-[12px] shadow-md w-full max-w-lg mx-3 sm:mx-0"
      >
        <h2 className="text-[22px] font-semibold mb-2">Sign up</h2>
        <p className="text-sm text-gray-500 mb-6">
          Get started with your account
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm text-center mb-4">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-medium mb-2"
          >
            Phone Number <span className="text-orange-600">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Your phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#744CDB] text-white py-2.5 rounded-md hover:bg-[#633CDB] hover:scale-x-95 transition-all transform duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-x-100"
          disabled={isLoading}
        >
          {isLoading ? "Sending OTP..." : "Continue"}
        </button>
        
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to={"/signin"}>
            <span className="text-[#744CDB] font-medium hover:underline">
              Sign in
            </span>
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Signup;