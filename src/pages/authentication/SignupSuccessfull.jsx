import { slideInFromRight } from "@/animations/variants";
import { motion } from "framer-motion";
import React from "react";
import icon from "../../assets/icons/icon.jpg";
import { Link, useLocation } from "react-router";
import { ArrowLeft } from "lucide-react";

const SignupSuccessfull = () => {
  const location = useLocation();
  
  // Get user type from location state (passed from SetupSignup)
  const userType = location.state?.type || "seller";
  const isClient = userType === "client";

  // ✅ KEY FIX: Dynamically set the sign-in path based on user type
  const signInPath = isClient ? "/signin?type=client" : "/signin";

  return (
    <div className="flex justify-center font-golos items-center min-h-screen bg-gray-100">
      <motion.div
        variants={slideInFromRight()}
        initial="hidden"
        animate="visible"
        className="bg-white p-[38px] rounded-[12px] mx-3 sm:mx-0 shadow-md w-full max-w-lg"
      >
        <div className="w-full flex justify-center items-center">
          <img src={icon} alt="icon" className="my-2" />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-semibold my-4">
            Welcome to My Spot Page!
          </h3>
          <p className="text-[#797979] my-3">
            Your {isClient ? 'client' : 'seller'} account has been created successfully! 
            Let's offer the best services today!
          </p>

          <Link
            to={signInPath} // ✅ Uses dynamic path based on user type
            className="flex justify-center items-center gap-1 mt-4 font-medium text-sm text-[#744CDB]"
          >
            <ArrowLeft size={18} /> Back to Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupSuccessfull;