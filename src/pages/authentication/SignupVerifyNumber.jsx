import { slideInFromRight } from "@/animations/variants";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const SignupVerifyNumber = () => {
  return (
    <div className="flex justify-center font-golos items-center min-h-screen bg-gray-100 ">
      <motion.form
        variants={slideInFromRight()}
        initial="hidden"
        animate="visible"
        className="bg-white p-[40px] rounded-[12px] mx-3 sm:mx-0 shadow-md w-full max-w-md"
      >
        <h2 className="text-[20px] font-semibold text-center w-full">
          Verify Phone Number
        </h2>
        <p className="py-4 text-sm text-[#797979]">
          We've sent an OTP code to (+1) 234 567 890. Please check and verify.
        </p>

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-medium mb-2"
          >
            OTP <span className="text-orange-600">*</span>
          </label>
          <input
            id="phone"
            type="text"
            placeholder="Your phone number"
            className="w-full text-sm px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#744CDB]"
          />
        </div>

        <Link to={"/setup-signup"}>
          <button
            type="submit"
            className="w-full bg-[#744CDB] text-white py-2 rounded-md hover:bg-[#633CDB] hover:scale-x-95 transition-all transform duration-200 text-sm"
          >
            Continue
          </button>
        </Link>

        {/* Resend Navigation */}
        <p className="text-center mt-4 text-sm text-gray-600">
          heven't recieved code ?{" "}
          <a href="#" className="text-[#744CDB] font-medium hover:underline">
            Resend
          </a>
        </p>
      </motion.form>
    </div>
  );
};

export default SignupVerifyNumber;
