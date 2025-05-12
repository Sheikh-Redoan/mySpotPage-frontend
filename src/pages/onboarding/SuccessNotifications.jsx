import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { imageProvider } from "../../lib/imageProvider";
import { slideInFromLeft } from "@/animations/variants";

const SuccessNotifications = () => {
  return (
    <div className="flex justify-center bg-[#11121580] items-center h-[100vh]">
      <motion.div
        variants={slideInFromLeft()}
        initial="hidden"
        animate="visible"
        className=" max-w-[420px] min-h-[295px] bg-[#FFFFFF] rounded-md shadow-md mx-2 md:mx-0"
      >
        <h1 className="text-[#242528] text-xl font-bold p-4 border-b border-b-gray-300">
          Notification
        </h1>
        <div className="text-center my-2 mx-2">
          <div className=" flex justify-center pt-2 mb-1">
            <img src={imageProvider.smile} alt="image icon" />
          </div>
          <h2 className="text-[#262626] font-semibold mb-2">You're All Set!</h2>
          <p className="text-[#797979] my-2">
            You've completed the setup. Your workspace is ready time to explore
            and start doing great things!
          </p>
          <div className="flex items-center justify-center gap-4 my-6 mx-5">
            <Link to={"/onboard/service-table"}>
              <button className="px-[18px] py-[8px] border font-medium border-[#242528] rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out hover:bg-[#f3f3f3] hover:shadow-md">
                Previous
              </button>
            </Link>
            <Link to={"/calendar"}>
              <button className="px-[18px] py-[8px] bg-[#242528] text-[#fff] border font-medium rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out hover:bg-[#3a3a3a] hover:shadow-md">
                Explore Now
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessNotifications;
