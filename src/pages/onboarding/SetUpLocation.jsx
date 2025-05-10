import React, { useState } from "react";
import { imageProvider } from "../../lib/imageProvider";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/animations/variants";

const SetUpLocation = () => {
  const [selected, setSelected] = useState("solo");
  return (
    <div className="p-[40px]">
      <p className="text-[#866BE7] mb-2 font-medium">Step 2 of 3</p>
      <h1 className="text-[28px] font-semibold my-1">Set Up Location</h1>
      <p className="text-[#888888] pb-2.5">
        Choose where your business operates. This helps us show relevant
        settings.
      </p>
      <div className="p-[16px] border-[1px] border-[#DDDAFA] flex justify-center items-center rounded-md mt-4 min-h-[520px]">
        <div className="text-center">
          <p className=" mb-4 text-[#262626]">
            Is this a solo business or do others manage bookings too?
          </p>
          <div className="flex items-center gap-4">
            <motion.div
              variants={slideInFromLeft()}
              initial="hidden"
              animate="visible"
              onClick={() => setSelected("solo")}
              className={`cursor-pointer flex flex-col justify-center items-center h-[150px] w-[235px] border rounded-xl hover:bg-[#efedfc]  ${
                selected === "solo"
                  ? "bg-[#F5F4FE] border-[#866BE7]"
                  : "border-[#E7E7E7]"
              }`}
            >
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
              className={`cursor-pointer flex flex-col justify-center items-center h-[150px] w-[235px] border rounded-xl hover:bg-[#efedfc] ${
                selected === "team"
                  ? "bg-[#F5F4FE] border-[#866BE7]"
                  : "border-[#E7E7E7]"
              }`}
            >
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
          <div className="flex items-center justify-center gap-4 pt-12">
            <button className="px-[18px] py-[8px] border font-medium border-[#242528] rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out hover:bg-[#f3f3f3] hover:shadow-md">
              Previos
            </button>
            <Link
              to={
                selected === "solo"
                  ? "/onboard/setup-services1"
                  : "/onboard/setup-teamservices1"
              }
            >
              <button className="px-[18px] py-[8px] bg-[#242528] text-[#fff] border font-medium rounded-lg hover:scale-95 transition-all duration-300 ease-in-out hover:bg-[#3a3a3a] hover:shadow-md">
                Confirm
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetUpLocation;
