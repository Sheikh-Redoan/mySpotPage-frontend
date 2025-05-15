import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { imageProvider } from "../../lib/imageProvider";
import { CopyIcon } from "../../assets/icons/icons2";

const BusinessInfo = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="min-h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-[26px] border-[1px] border-[#E7E7E7] bg-[#FFFFFF] rounded-md mt-4"
      >
        <div className="flex justify-between items-center my-4">
          <h2 className="text-[#262626] text-xl font-semibold">
            Business Information
          </h2>
          <button className="py-2 px-4 border font-medium rounded-lg bg-[#242528] hover:bg-[#3a3b40] text-[#FFFFFF] hover:scale-95 transform transition-all duration-300 ease-in-out">
            Save
          </button>
        </div>
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block mb-2 text-[#888888]">
            Thumbnail <span className="text-orange-600">*</span>
          </label>
          <div className="mb-6 flex">
            <label
              htmlFor="thumbnail"
              className="w-full max-w-md flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-8 rounded-lg cursor-pointer hover:border-[#866BE7] transition-all text-center"
            >
              <div className="flex flex-col items-center">
                <img src={imageProvider.imageUploader} alt="Image" />
                <p className="text-gray-600 text-lg font-semibold underline my-2">
                  Upload Image
                </p>
                <p className="text-sm text-gray-500">JPEG, PNG up to 50MB</p>
              </div>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="sm:flex gap-6 mb-6">
          {/* Business Name */}
          <div className="flex-1">
            <label className="block mb-2 text-[#888888]">
              Business Name <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              {...register("businessName", { required: true })}
              className="block w-full text-sm border border-gray-300 p-2 rounded-md"
              placeholder="Name"
              required
            />
          </div>

          {/* Public URL  */}
          <div className="flex-1 relative">
            <label className="block mb-2 text-[#888888]">
              Public URL <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              {...register("registerURL")}
              className="block text-sm w-full border border-gray-300 rounded-md p-2"
              placeholder="https://bit.ly/3sGjUeA"
              required
            />
            <div className="pointer absolute inset-y-0 top-8 right-3 flex items-center text-[#888888] hover:scale-90 transform transition-all duration-300 ease-in-out">
              <CopyIcon />
            </div>
          </div>
        </div>

        {/* Business Type and Classification */}
        <div className="sm:flex gap-6 mb-6">
          {/* Business Type */}
          <div className="flex-1 relative">
            <label className="block mb-2 text-[#888888]">
              Business Type <span className="text-orange-600">*</span>
            </label>
            <select
              {...register("businessType", { required: true })}
              className="block text-sm w-full border border-gray-300 rounded-md p-2 appearance-none text-[#242528]"
              required
            >
              <option value="">Select Business Type</option>
              <option value="service">Service</option>
              <option value="product">Product</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 top-8 right-3 flex items-center text-[#888888]">
              <ChevronDown />
            </div>
          </div>

          {/* Business Classification */}
          <div className="flex-1 relative">
            <label className="block mb-2 text-[#888888]">
              Business Classification <span className="text-orange-600">*</span>
            </label>
            <select
              {...register("businessClassification", { required: true })}
              className="block text-sm w-full border border-gray-300 rounded-md p-2 appearance-none text-[#242528]"
              required
            >
              <option value="">Select Classification</option>
              <option value="retail">Retail</option>
              <option value="wholesale">Wholesale</option>
              <option value="franchise">Franchise</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 top-8 right-3 flex items-center text-[#888888]">
              <ChevronDown />
            </div>
          </div>
        </div>

        {/* Legal Name and Registration Number */}
        <div className="sm:flex gap-6 mb-6">
          {/* Legal Name */}
          <div className="flex-1">
            <label className="block mb-2 text-[#888888]">
              Legal Name <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              {...register("legalName", { required: true })}
              className="block text-sm w-full border border-gray-300 rounded-md p-2"
              placeholder="Legal name"
              required
            />
          </div>

          {/* Registration Number */}
          <div className="flex-1">
            <label className="block mb-2 text-[#888888]">
              Registration Number <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              {...register("registerNumber")}
              className="block text-sm w-full border border-gray-300 rounded-md p-2"
              placeholder="Number"
              required
            />
          </div>
        </div>

        {/* About Us */}
        <div>
          <label className="block mb-2 text-[#888888]">
            About Us <span className="text-orange-600">*</span>
          </label>
          <textarea
            {...register("aboutUs", { required: true })}
            className="block text-sm w-full border border-gray-300 rounded-md p-2 h-40"
            placeholder="Shot intruductions"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default BusinessInfo;
