import { useSelector } from "react-redux";
import { imageProvider } from "../../lib/imageProvider";
import { Plus } from "lucide-react";
import { Link } from "react-router";

const ServiceTable = () => {
  const serviceData = useSelector((state) => state.service);
  console.log(serviceData);
  return (
    <div className="p-[20px] lg:p-[40px]">
      <p className="text-[#866BE7] mb-2 font-medium">Step 3 of 3</p>
      <h1 className="text-[28px] font-semibold my-1">Set Up Service</h1>
      <p className="text-[#888888] pb-2.5">
        Choose where your business operates. This helps us show relevant
        settings.
      </p>
      <div className="w-full lg:max-h-[300px] overflow-auto rounded-lg border border-gray-200 shadow-md">
        <table className="w-full text-left ">
          <thead className="w-full bg-[#262626] text-[#FFFFFF]">
            <tr>
              <th className="px-5 py-4 font-normal">Thumbnail</th>
              <th className="px-5 py-4 font-normal">Name/Available For</th>
              <th className="px-5 py-4 font-normal">Description</th>
              <th className="px-5 py-4 font-normal">Duration</th>
              <th className="px-5 py-4 font-normal">Options</th>
              <th className="px-5 py-4 font-normal">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-5 py-3">
                <img
                  src="https://i.ibb.co.com/nsgfP3Pt/Frame-2147226180.png"
                  alt="thumbnail"
                  className="w-22 h-22 object-cover rounded-md"
                />
              </td>
              <td>
                <p className="pb-1 text-[#3D3D3D] font-medium text-lg">
                  {serviceData.serviceName || "Hair Cut"}{" "}
                </p>
                <p className="text-[#866BE7] font-semibold px-2 py-0.5 max-w-32 border border-[#866BE7] rounded-2xl">
                  {serviceData.availableFor || "For All"}
                </p>
              </td>
              <td className="px-5 py-3 lg:max-w-[350px] text-[#797979]">
                {serviceData.description || "Classic men's haircut and style."}
              </td>
              <td className="px-5 py-3">30 H</td>
              <td className="px-5 py-3">05</td>
              <td className="px-4 py-3">
                <div className="flex justify-center gap-4">
                  <img src={imageProvider.edit} alt="Edit Icon" />
                  <img src={imageProvider.deleteIcon} alt="Delete Icon" />
                </div>
              </td>
            </tr>
          </tbody>

          <Link to={"/onboard/service"}>
            <div className="flex items-center gap-2 text-[#744CDB] font-semibold hover:underline my-5 ml-3">
              <Plus /> Add Service
            </div>
          </Link>
        </table>
      </div>

      <div className="flex items-center justify-end gap-4 my-6 mx-5">
        <Link to={"/onboard/service"}>
          <button className="px-[18px] py-[8px] border font-medium border-[#242528] rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out hover:bg-[#f3f3f3] hover:shadow-md">
            Previous
          </button>
        </Link>
        <Link to={"/success-notification"}>
          <button className="px-[18px] py-[8px] bg-[#242528] text-[#fff] border font-medium rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out hover:bg-[#3a3a3a] hover:shadow-md">
            Finish
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceTable;
