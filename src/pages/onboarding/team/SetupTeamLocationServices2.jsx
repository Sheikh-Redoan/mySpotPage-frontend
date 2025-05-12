import { imageProvider } from "../../../lib/imageProvider";
import { Plus } from "lucide-react";
import { Switch } from "antd";
import { Link } from "react-router";
import { useState } from "react";

const SetupTeamLocationServices2 = () => {
  const [showMenu1, setShowMenu1] = useState(false);
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div className="px-2 py-[20px] lg:px-[20px] lg:py-[30px] xl:p-[40px]">
      <p className="text-[#866BE7] mb-2 font-medium">Step 2 of 3</p>
      <h1 className="text-[22px] md:text-[28px] font-semibold my-1">
        Set Up Location
      </h1>
      <p className="text-[#888888]  pb-2.5">
        Choose where your business operates. This helps us show relevant
        settings.
      </p>
      <div className="p-[16px] border-[1px] border-[#DDDAFA] rounded-md mt-4 min-h-[520px] px-8">
        <div className="xl:flex justify-between items-start my-2">
          <div>
            <h2 className="text-xl text-[#242528] font-semibold">
              Fixed Location Services
            </h2>
            <p className="text-[#797979] mt-1 text-sm">
              Your service is based at a specific location. Ensure your address
              settings are correct for customers to find you easily.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[#A496EF]text-sm sm:text-base font-semibold hover:underline mt-3 xl:mt-0 whitespace-nowrap w-fit">
            <Plus /> Add Location
          </div>
        </div>

        <hr className="my-6 text-[#F6F6F6]" />

        <div className="flex justify-between items-center">
          <div className="flex items-start gap-5">
            <div>
              <Switch defaultChecked onChange={onChange} />
            </div>
            <div className="flex flex-col justify-start">
              <h4 className="text-[#242528] font-semibold text-lg">
                TCL Beauty Studio 01{" "}
                <span className="text-[#866BE7] bg-[#F5F4FE] ml-2 p-1 rounded text-sm">
                  Hidden
                </span>
              </h4>
              <p className="text-[#797979] my-2 text-sm">
                15 Rothschild Boulevard, Tel Aviv-Yafo, Israel
              </p>
            </div>
          </div>
          <div className=" hidden sm:flex items-center gap-6">
            <img src={imageProvider.edit} alt="Edit Icon" />
            <img src={imageProvider.deleteIcon} alt="Delete Icon" />
          </div>
          {/* Show on small screens */}
          <div className="block md:hidden relative">
            <button
              className="text-3xl"
              onClick={() => setShowMenu1(!showMenu1)}
            >
              ⋯
            </button>
            {showMenu1 && (
              <div className="absolute  bg-gray-200 rounded z-10 w-10 h-14 p-2 pl-3 mr-3 shadow-md">
                <img
                  className="pb-2"
                  src={imageProvider.edit}
                  alt="Edit Icon"
                />
                <img src={imageProvider.deleteIcon} alt="Delete Icon" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sm:w-auto flex items-center justify-end gap-4 my-6 mx-2 sm:mx-5">
        <Link to={"/onboard/setup-teamservices1"} className="w-full sm:w-auto">
          <button className="w-full sm:w-auto px-[18px] py-[8px] border font-medium border-[#242528] rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out hover:bg-[#f3f3f3] hover:shadow-md">
            Previous
          </button>
        </Link>
        <Link to={"/onboard/service"} className="w-full sm:w-auto">
          <button className="w-full sm:w-auto px-[18px] py-[8px] bg-[#242528] text-[#fff] border font-medium rounded-lg hover:scale-95 transition-all duration-300 ease-in-out hover:bg-[#3a3a3a] hover:shadow-md">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SetupTeamLocationServices2;
