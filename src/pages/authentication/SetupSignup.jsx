import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { slideInFromLeft } from "@/animations/variants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const SetupSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [dob, setDob] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-golos">
      <motion.form
        variants={slideInFromLeft()}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="bg-white p-[40px] rounded-[12px] mx-3 sm:mx-0 shadow-md w-full max-w-lg"
      >
        <h2 className="text-[22px] font-semibold text-center py-6 mb-4">
          Set up Account
        </h2>

        {/* First and Last Name */}
        <div className="sm:flex gap-4 mb-4">
          <div className="w-full sm:w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              First Name <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              placeholder="First name"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="block text-gray-700 font-medium mb-1">
              Last Name <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Last name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Date of Birth <span className="text-orange-600">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB]"
            />
          </div>
        </div>

        {/* Sex Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Sex <span className="text-orange-600">*</span>
          </label>
          <div className="flex gap-6 text-sm text-gray-700">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sex"
                value="male"
                className="accent-[#744CDB]"
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sex"
                value="female"
                className="accent-[#744CDB]"
              />
              Female
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="sex"
                value="other"
                className="accent-[#744CDB]"
              />
              Other
            </label>
          </div>
        </div>

        {/* Password */}
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-medium mb-2"
          >
            Password <span className="text-orange-600">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
            />
            <span
              className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-medium mb-2"
          >
            Confirm Password <span className="text-orange-600">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
            />
            <span
              className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2 text-sm mb-6">
          <input type="checkbox" className="mt-1 accent-[#744CDB]" />
          <label className="text-gray-700">
            I agree to the{" "}
            <span className="text-[#744CDB] font-medium cursor-pointer">
              privacy policy
            </span>{" "}
            and
            <span className="text-[#744CDB] font-medium cursor-pointer">
              {" "}
              terms of use
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <Link to={"/signup-successfull"}>
          <button
            type="submit"
            className="w-full bg-[#744CDB] text-white py-2 rounded-md hover:bg-[#633CDB] hover:scale-x-95 transition-all transform duration-200 text-sm"
          >
            Sign up
          </button>
        </Link>

        {/* Signin Navigation */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to={"/signin"}>
            <a href="#" className="text-[#744CDB] font-medium hover:underline">
              Signin
            </a>
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default SetupSignup;
