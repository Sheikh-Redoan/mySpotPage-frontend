import { slideInFromLeft } from "@/animations/variants";
import { ArrowLeft } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router";

const ForgotPassword = () => {
  return (
    <div className=" bg-gray-100 font-golos">
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
          variants={slideInFromLeft()}
          initial="hidden"
          animate="visible"
          className="bg-white p-[40px] rounded-[12px] mx-3 sm:mx-0 shadow-md w-full max-w-md"
        >
          <div className="flex items-center mb-6">
            <Link className="hidden sm:block" to={"/signin"}>
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
              className="w-full text-sm px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB]"
            />
          </div>

          <Link to={"/verify-number"}>
            <button
              type="submit"
              className="w-full bg-[#744CDB] text-white py-2 rounded-md hover:bg-[#633CDB] hover:scale-x-95 transition-all transform duration-200 text-sm"
            >
              Continue
            </button>
          </Link>
        </motion.form>
      </div>
    </div>
  );
};

export default ForgotPassword;
