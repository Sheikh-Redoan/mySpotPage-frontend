import { Switch } from "antd";
import { Plus } from "lucide-react";
import React from "react";
import { imageProvider } from "../../../lib/imageProvider";
import { Link } from "react-router";

const SetupLocationServices2 = () => {
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
      <div className="p-[16px] border-[1px] border-[#DDDAFA] rounded-md mt-4 min-h-[520px] px-8">
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

        <div className="flex justify-between items-center mb-2">
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
          <div className="flex items-center gap-6">
            <img src={imageProvider.edit} alt="Edit Icon" />
            <img src={imageProvider.deleteIcon} alt="Delete Icon" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-start gap-5">
            <div>
              <Switch defaultChecked onChange={onChange} />
            </div>
            <div className="flex flex-col justify-start">
              <h4 className="text-[#242528] font-semibold text-lg">
                Mobile Service
              </h4>
              <p className="text-[#797979] my-2 text-sm">
                15 Rothschild Boulevard, Tel Aviv-Yafo, Israel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <img src={imageProvider.edit} alt="Edit Icon" />
            <img src={imageProvider.deleteIcon} alt="Delete Icon" />
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
                Mobile Service
              </h4>
              <p className="text-[#797979] my-2 text-sm">
                Your mobile service is currently inactive. Please enable it to
                offer on-location services to your clients.
              </p>
            </div>
          </div>
          <div>
            <img src={imageProvider.edit} alt="Edit Icon" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 my-6 mx-5">
        <Link to={"/onboard/setup-services1"}>
          <button className="px-[18px] py-[8px] border font-medium border-[#242528] rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out hover:bg-[#f3f3f3] hover:shadow-md">
            Previous
          </button>
        </Link>
        <Link to={"/onboard/service"}>
          <button className="px-[18px] py-[8px] bg-[#242528] text-[#fff] border font-medium rounded-lg hover:scale-95 transition-all duration-300 ease-in-out hover:bg-[#3a3a3a] hover:shadow-md">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SetupLocationServices2;
