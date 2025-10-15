import { slideInFromLeft } from "@/animations/variants";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router"; // Correct import

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const phone = e.target.phone.value;

    if (!phone) {
      setError("Phone number is required.");
      return;
    }

    const formData = new FormData();
    formData.append("number", phone);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signup/`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        // Navigate to the OTP verification page after successful signup
        navigate("/auth/signup-verify-number");
      } else {
        console.error("Signup failed:", data);
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center font-golos items-center min-h-screen bg-gray-100 ">
      <motion.form
        onSubmit={handleSubmit} // Use onSubmit for the form
        variants={slideInFromLeft()}
        initial="hidden"
        animate="visible"
        className="bg-white p-[40px] rounded-[12px] mx-3 sm:mx-0 shadow-md w-full max-w-md"
      >
        <h2 className="text-[20px] font-semibold text-center w-full my-3">
          Sign up
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {/* Phone Number Input */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
            Phone Number <span className="text-orange-600">*</span>
          </label>
          <input
            id="phone"
            name="phone" // Add name attribute
            type="text"
            placeholder="Your phone number"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#744CDB] text-white py-2 rounded-md hover:bg-[#633CDB] hover:scale-x-95 transition-all transform duration-200 text-sm"
        >
          Continue
        </button>

        {/* Signin Navigation */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to={"/auth/signin"}> {/* Corrected Link */}
            <span className="text-[#744CDB] font-medium hover:underline">
              Signin
            </span>
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Signup;