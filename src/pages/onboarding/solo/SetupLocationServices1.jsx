import { Switch } from "antd";
import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const SetupLocationServices1 = () => {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div className="p-[40px]">
      <p className="text-[#866BE7] mb-2 font-medium">Step 2 of 3</p>
      <h1 className="text-[28px] font-semibold my-1">Set Up Location</h1>
      <p className="text-[#888888]  pb-2.5">
        Choose where your business operates. This helps us show relevant
        settings.
      </p>
      <div className="p-[16px] border-[1px] border-[#DDDAFA] rounded-md mt-4 min-h-[520px]">
        <div className="flex justify-between items-center my-2">
          <h2 className="text-xl text-[#242528] font-semibold">
            Fixed Location Services
          </h2>
          <div className="flex items-center gap-2 text-[#744CDB] font-semibold hover:underline">
            <Plus /> Add Location
          </div>
        </div>
        <p className="text-[#797979] mt-1 text-sm">
          Your service is based at a specific location. Ensure your address
          settings are correct for customers to find you easily.
        </p>
        <hr className="my-6 text-[#F6F6F6]" />

        <div className="flex items-start gap-5">
          <div>
            <Switch defaultChecked onChange={onChange} />
          </div>
          <div className="flex flex-col justify-start">
            <h4 className="text-[#242528] font-semibold text-lg">
              Mobile Service
            </h4>
            <p className="text-[#797979] my-2 text-sm">
              Your mobile service is currently inactive. Please enable it to
              offer on-location services to your clients.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 my-6 mx-5">
        <Link to={"/onboard/setup-location"}>
          <button className="px-[18px] py-[8px] border font-medium border-[#242528] rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out hover:bg-[#f3f3f3] hover:shadow-md">
            Previous
          </button>
        </Link>

        <Link to={"/onboard/setup-services2"}>
          <button className="px-[18px] py-[8px] font-medium rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out  hover:shadow-md text-[#82868E] bg-[#E5E7E8] hover:bg-[#cccfd1]">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SetupLocationServices1;
