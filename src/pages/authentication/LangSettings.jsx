import React from "react";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { slideInFromLeft } from "@/animations/variants";

const LangSettings = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.form
        variants={slideInFromLeft()}
        initial="hidden"
        animate="visible"
        className="bg-white p-[40px] rounded-[12px] mx-3 sm:mx-0 shadow-md w-full max-w-md"
      >
        <h1 className="text-xl font-semibold mb-4 text-center">
          Language Settings
        </h1>
        <p className="text-gray-600 mb-4 text-sm">
          {/* Reduced font size for paragraph */}
          Set your preferred language to ensure smooth and effective
          communication.
        </p>

        <label
          htmlFor="language"
          className="block text-gray-700 text-base mb-1"
        >
          Language <span className="text-orange-600">*</span>
        </label>
        <div className="relative mb-5">
          <select
            id="language"
            name="language"
            className="block w-full text-sm appearance-none border border-gray-300 rounded-md px-4 py-2.5 pr-10 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="english">English</option>
            <option value="bangla">Bangla</option>
            <option value="hindi">Hindi</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <Link to={"/signin"}>
          <button
            type="submit"
            className="w-full bg-[#744CDB] text-sm text-white py-2 rounded-md hover:bg-[#633CDB] hover:scale-x-95 transition-all transform duration-200"
          >
            Continue
          </button>
        </Link>
      </motion.form>
    </div>
  );
};

export default LangSettings;
