import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center font-golos items-center min-h-screen bg-gray-100">
      <form className="bg-white p-[40px] rounded-[12px] shadow-md w-full max-w-md">
        <div className="flex items-center mb-6">
          <Link to={"/auth"}>
            <ArrowLeft size={24} />
          </Link>
          <h2 className="text-[20px] font-semibold text-center w-full">
            Sign in
          </h2>
        </div>

        {/* Phone Number Input */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-medium mb-1"
          >
            Phone Number <span className="text-orange-600">*</span>
          </label>
          <input
            id="phone"
            type="text"
            placeholder="Your phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#744CDB]"
          />
        </div>

        {/* Password Input with Eye Icon */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password <span className="text-orange-600">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#744CDB]"
            />
            <span
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" className="accent-[#744CDB]" />
            Remember me
          </label>
          <Link to={"/forgot-password"}>
            <button
              type="button"
              className="text-[#744CDB] font-medium hover:underline"
            >
              Forgot Password?
            </button>
          </Link>
        </div>

        {/* Signin Button */}
        <button
          type="submit"
          className="w-full bg-[#744CDB] text-white py-2 rounded-md hover:opacity-90 transition duration-200"
        >
          Signin
        </button>

        {/* Signup Navigation */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-[#744CDB] font-medium hover:underline">
            Signup
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signin;
