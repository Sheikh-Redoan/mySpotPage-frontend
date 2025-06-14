import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { imageProvider } from "../../../lib/imageProvider";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { slideInFromBottom } from "./../../../animations/variants";
import { Drawer, Select } from "antd";
import SelectPlanContent from "./SelectPlanContent";

const Upgradeplan = () => {
  const [open, setOpen] = useState(true);

  const location = useLocation();
  const currentPlan = location.state?.currentPlan || "Spark";
  const isMobile = location.state?.isMobile || false;
  const UpgradeCard = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (UpgradeCard.current && !UpgradeCard.current.contains(event.target)) {
        navigate("/dashboard/settings/subscription");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  const plans = [
    {
      name: "Spark",
      price: "Free",
      subtext: "/ 10 Bookings",
      desc: "Start Smart , Dream Big",
      image: imageProvider.spark,
    },
    {
      name: "Glow",
      price: "$79",
      subtext: "/ Month",
      desc: "For the Professional You are",
      image: imageProvider.glow,
    },
    {
      name: "Bloom",
      price: "$149",
      subtext: "/ Month",
      desc: "Lead The Team With Confidence",
      image: imageProvider.bloom,
    },
  ];

  if (isMobile) {
    return (
      <Drawer
        placement={"bottom"}
        closable={false}
        height="90%"
        onClose={() => setOpen(false)}
        open={open}
      >
        <motion.div
          variants={slideInFromBottom()}
          initial="hidden"
          animate="visible"
          ref={UpgradeCard}
          className="bg-[#ffffff] w-full rounded-lg"
        >
          <SelectPlanContent plans={plans} currentPlan={currentPlan} fromMobile={true} />
        </motion.div>
      </Drawer>
    );
  }

  return (
    <div className="relative">
      <div className="bg-[#24252880] py-8 min-h-screen flex items-center justify-center font-golos">
        <motion.div
          variants={slideInFromBottom()}
          initial="hidden"
          animate="visible"
          ref={UpgradeCard}
          className="bg-[#ffffff] min-h-screen w-[90%] md:w-[66%] rounded-lg md:p-2"
        >
          <SelectPlanContent plans={plans} currentPlan={currentPlan} />
        </motion.div>
      </div>
    </div>
  );
};

export default Upgradeplan;
