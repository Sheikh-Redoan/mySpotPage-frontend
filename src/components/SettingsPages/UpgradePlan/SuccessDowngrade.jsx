import { X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { SmileIcon } from "../../../assets/icons/icons2";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { slideInFromLeft } from "../../../animations/variants";

const SuccessDowngrade = () => {
  const location = useLocation();
  const isMobile = location.state?.isMobile || false;

  return (
    <div className="bg-[#24252880] min-h-[100vh] py-8  flex items-center justify-center font-golos">
      <motion.div
        variants={slideInFromLeft()}
        initial="hidden"
        animate="visible"
        className="bg-[#ffffff] min-h-[260px] w-[430px] rounded-lg max-md:mx-2"
      >
        <div className="flex justify-between items-center my-2 py-3 px-6">
          <p className="text-xl font-semibold"> Notification</p>
          <Link className="hover:scale-105 max-md:hidden" to={"/upgrade-plan"}>
            <X />
          </Link>
          {/* Mobile view */}
          <Link
            className="hover:scale-105 md:hidden"
            to={"/upgrade-plan"}
            state={{ isMobile }}
          >
            <X />
          </Link>
        </div>
        <hr className="text-[#E7E7E7]" />
        <div className="flex justify-center items-center">
          <div className="text-center p-5">
            <div className=" flex justify-center pt-2 mb-1">
              <SmileIcon />
            </div>
            <h2 className="text-[#262626] text-lg font-semibold mb-2">
              A Step Down, But Still With Us
            </h2>
            <p className="text-[#797979] my-2">
              You've downgraded your subscription. While you'll have fewer
              features, we're glad you're staying!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessDowngrade;
