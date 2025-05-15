import { Switch } from "antd";
import { Plus } from "lucide-react";

const Location = () => {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div className="min-h-full">
      <div className="p-6 rounded-md mt-4 bg-[#FFFFFF] ">
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

          <div className="flex items-center gap-2 border border-[#744CDB] rounded-lg px-4 py-2 text-[#744CDB] text-sm sm:text-base font-semibold hover:underline mt-3 xl:mt-0 whitespace-nowrap w-fit hover:scale-95 transform transition-all duration-300 ease-in-out">
            <Plus size={20} /> Add Location
          </div>
        </div>
        <hr className="my-6 text-[#F6F6F6]" />

        <div className="flex items-start gap-5">
          <div>
            <Switch defaultChecked onChange={onChange} />
          </div>
          <div className="flex flex-col justify-start">
            <h4 className="text-[#242528] font-semibold text-base md:text-lg">
              Mobile Service
            </h4>
            <p className="text-[#797979] my-2 text-sm">
              Your mobile service is currently inactive. Please enable it to
              offer on-location services to your clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
