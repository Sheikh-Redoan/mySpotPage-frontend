import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const ForgotPassword = () => {
  return (
    <div className="flex justify-center font-golos items-center min-h-screen bg-gray-100">
      <form className="bg-white p-[40px] rounded-[12px] shadow-md w-full max-w-md">
        <div className="flex items-center mb-6">
          <Link to={"/signin"}>
            <ArrowLeft size={24} />
          </Link>
          <h2 className="text-[20px] font-semibold text-center w-full">
            Forgot Password
          </h2>
        </div>

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-medium mb-2"
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

        {/* Signin Button */}
        <button
          type="submit"
          className="w-full bg-[#744CDB] text-white py-2 rounded-md hover:opacity-90 transition duration-200"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
