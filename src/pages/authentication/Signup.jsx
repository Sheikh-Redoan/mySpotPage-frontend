import { slideInFromLeft } from "@/animations/variants";
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";

const Signup = () => {
  return (
    <div className="flex justify-center font-golos items-center min-h-screen bg-gray-100 ">
      <motion.form
        variants={slideInFromLeft()}
        initial="hidden"
        animate="visible"
        className="bg-white p-[40px] rounded-[12px] mx-3 sm:mx-0 shadow-md w-full max-w-md"
      >
        <h2 className="text-[20px] font-semibold text-center w-full my-3">
          Sign up
        </h2>

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
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB] text-sm"
          />
        </div>

        {/* Signin Button */}
        <Link to={"/signup-verify-number"}>
          <button
            type="submit"
            className="w-full bg-[#744CDB] text-white py-2 rounded-md hover:bg-[#633CDB] hover:scale-x-95 transition-all transform duration-200 text-sm"
          >
            Continue
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

export default Signup;
