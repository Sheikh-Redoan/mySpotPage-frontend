import { useState } from "react";
import { Link } from "react-router";
import { imageProvider } from "../../lib/imageProvider";
// eslint-disable-next-line no-unused-vars
import { slideInFromLeft, slideInFromRight } from "@/animations/variants";
import { motion } from "framer-motion";

const SetUpLocation = () => {
  const [selected, setSelected] = useState("solo");
  return (
    <div className="px-2 py-[20px] lg:px-[20px] lg:py-[30px] xl:p-[40px]">
      <p className="text-[#866BE7] mb-2 font-medium">Step 2 of 3</p>
      <h1 className="text-[22px] md:text-[28px] font-semibold my-1">
        Set Up Location
      </h1>
      <p className="text-[#888888] pb-2.5">
        Choose where your business operates. This helps us show relevant
        settings.
      </p>
      <div className="p-[16px] border-[1px] border-[#DDDAFA] flex justify-center items-center rounded-md mt-4 min-h-[520px]">
        <div className="text-left sm:text-center">
          <p className=" mb-4 text-[#262626]">
            Is this a solo business or do others manage bookings too?
          </p>
          <div className="flex flex-row  items-center gap-4">
            <motion.div
              variants={slideInFromLeft()}
              initial="hidden"
              animate="visible"
              onClick={() => setSelected("solo")}
              className={`cursor-pointer flex flex-col justify-center items-center flex-1 h-[150px] lg:w-[235px] border rounded-xl hover:bg-[#efedfc]  ${
                selected === "solo"
                  ? "bg-[#F5F4FE] border-[#866BE7]"
                  : "border-[#E7E7E7]"
              }`}>
              <img
                src={
                  selected === "solo"
                    ? imageProvider.colorPeople
                    : imageProvider.people
                }
                alt="People"
              />
              <p className="text-[#262626] mt-1">It's just me</p>
            </motion.div>

            {/* Card 2: Team */}
            <motion.div
              variants={slideInFromRight()}
              initial="hidden"
              animate="visible"
              onClick={() => setSelected("team")}
              className={`cursor-pointer flex flex-col justify-center items-center flex-1 h-[150px] lg:w-[235px] border rounded-xl hover:bg-[#efedfc] ${
                selected === "team"
                  ? "bg-[#F5F4FE] border-[#866BE7]"
                  : "border-[#E7E7E7]"
              }`}>
              <img
                src={
                  selected === "team"
                    ? imageProvider.multipleCoPeo
                    : imageProvider.multiplePeople
                }
                alt="Multiple People"
              />
              <p className="text-[#262626] mt-1">I have a team</p>
            </motion.div>
          </div>
          <div className="hidden sm:flex  items-center justify-center gap-4 pt-12">
            <Link to={"/onboard"}>
              <button className="px-[18px] py-[8px] border font-medium border-[#242528] rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out hover:bg-[#f3f3f3] hover:shadow-md">
                Previous
              </button>
            </Link>
            <Link
              to={
                selected === "solo"
                  ? "/onboard/setup-services1"
                  : "/onboard/setup-teamservices1"
              }>
              <button className="px-[18px] py-[8px] bg-[#242528] text-[#fff] border font-medium rounded-lg hover:scale-95 transition-all duration-300 ease-in-out hover:bg-[#3a3a3a] hover:shadow-md">
                Confirm
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Buttons outside card - only visible on small screens */}
      <div className="flex sm:hidden  w-full items-center justify-center gap-4 pt-6">
        <Link to="/onboard" className="w-full">
          <button className="w-full px-[18px] py-[8px] border font-medium border-[#242528] rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out hover:bg-[#f3f3f3] hover:shadow-md">
            Previous
          </button>
        </Link>
        <Link
          className="w-full"
          to={
            selected === "solo"
              ? "/onboard/setup-services1"
              : "/onboard/setup-teamservices1"
          }>
          <button className="w-full px-[18px] py-[8px] bg-[#242528] text-[#fff] border font-medium rounded-lg hover:scale-95 transition-all duration-300 ease-in-out hover:bg-[#3a3a3a] hover:shadow-md">
            Confirm
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SetUpLocation;
