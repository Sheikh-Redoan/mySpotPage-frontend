import { slideInFromRight } from "@/animations/variants";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import icon from "../../assets/icons/icon.jpg";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const ResetSuccessfull = () => {
  return (
    <div className="flex justify-center font-golos items-center min-h-screen bg-gray-100 ">
      <motion.form
        variants={slideInFromRight()}
        initial="hidden"
        animate="visible"
        className="bg-white p-[38px] rounded-[12px] mx-3 sm:mx-0 shadow-md w-full max-w-lg"
      >
        <div className="w-full flex justify-center items-center">
          <img src={icon} alt="icon" className="my-2" />
        </div>
        <div className="text-center">
          <h3 className=" text-2xl font-semibold my-4">
            Your password has been reset successfully!
          </h3>
          <p className="text-[#797979] my-3">
            You've successfully updated your password. You can now log in with
            your new credentials.
          </p>

          <Link
            to={"/signin"}
            className="flex justify-center items-center gap-1 mt-4 text-sm font-medium text-[#744CDB]"
          >
            <ArrowLeft size={18} /> Back to Sign in
          </Link>
        </div>
      </motion.form>
    </div>
  );
};

export default ResetSuccessfull;
