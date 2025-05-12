import { imageProvider } from "../../lib/imageProvider";

import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

const SetUpBusiness = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailName, setThumbnailName] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const formData = { ...data, thumbnail };
    console.log(formData);
    navigate("setup-location");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailName(file.name);
    }
  };

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };
  return (
    <div className="px-2 py-[20px] lg:px-[20px] lg:py-[30px] xl:p-[40px]">
      <p className="text-[#866BE7] mb-2 font-medium">Step 1 of 3</p>
      <h1 className="text-[22px] md:text-[28px] font-semibold my-1">
        Set Up Business Information
      </h1>
      <p className="text-[#888888] pb-2.5">
        Tell us a bit about your business so we can personalize your experience.
      </p>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="p-[16px] border-[1px] border-[#DDDAFA] rounded-md mt-4 max-h-[60vh] overflow-y-auto"
      >
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
                  {thumbnailName || "Upload Image"}
                </p>
                <p className="text-sm text-gray-500">JPEG, PNG up to 50MB</p>
              </div>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* Business Name */}
        <div className="mb-6">
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

        {/* Business Type and Classification */}
        <div className="sm:flex gap-6 mb-6">
          {/* Business Type */}
          <div className="flex-1 relative">
            <label className="block mb-2 text-[#888888]">
              Business Type <span className="text-orange-600">*</span>
            </label>
            <select
              {...register("businessType", { required: true })}
              className="block text-sm w-full border border-gray-300 rounded-md p-2 appearance-none"
              required
            >
              <option value="">Select Business Type</option>
              <option value="service">Service</option>
              <option value="product">Product</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 top-8 right-3 flex items-center text-gray-600">
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
              className="block text-sm w-full border border-gray-300 rounded-md p-2 appearance-none"
              required
            >
              <option value="">Select Classification</option>
              <option value="retail">Retail</option>
              <option value="wholesale">Wholesale</option>
              <option value="franchise">Franchise</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 top-8 right-3 flex items-center text-gray-600">
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
      <div className="mt-8 sm:my-6 w-full px-5 text-right">
        <button
          disabled={!isValid}
          onClick={handleExternalSubmit}
          className={`w-full md:w-auto block md:inline-block text-center md:text-right px-[14px] py-[10px] rounded-lg transition-all duration-300 ease-in-out ${
            isValid
              ? "text-white bg-[#242528] hover:bg-[#1c1d1f] hover:shadow-lg"
              : "text-[#82868E] bg-[#E5E7E8] hover:bg-[#cccfd1] cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SetUpBusiness;
