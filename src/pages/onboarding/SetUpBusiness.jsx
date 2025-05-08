import React from "react";

const SetUpBusiness = () => {
  return (
    <div className="p-[40px]">
      <p className="text-[#866BE7] mb-2 font-medium">Step 1 of 3</p>
      <h1 className="text-[28px] font-semibold my-1">
        Set Up Business Information
      </h1>
      <p className="text-[#888888]">
        Tell us a bit about your business so we can personalize your experience.
      </p>
      <form className="p-[16px] border rounded-md mt-4 max-h-[60vh] overflow-y-auto">
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block mb-2 text-[#888888]">
            Thumbnail <span className="text-orange-600">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Business Name */}
        <div className="mb-6">
          <label className="block mb-2 text-[#888888]">
            Business Name <span className="text-orange-600">*</span>
          </label>
          <input
            type="text"
            className="block w-full text-sm border border-gray-300 p-2 rounded-md"
            placeholder="Name"
            required
          />
        </div>

        {/* Business Type and Classification */}
        <div className="flex gap-6 mb-6">
          {/* Business Type */}
          <div className="flex-1">
            <label className="block mb-2 text-[#888888]">
              Business Type <span className="text-orange-600">*</span>
            </label>
            <select
              className="block text-sm w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Business Type</option>
              <option value="service">Service</option>
              <option value="product">Product</option>
            </select>
          </div>

          {/* Business Classification */}
          <div className="flex-1">
            <label className="block mb-2 text-[#888888]">
              Business Classification <span className="text-orange-600">*</span>
            </label>
            <select
              className="block text-sm w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Classification</option>
              <option value="retail">Retail</option>
              <option value="wholesale">Wholesale</option>
              <option value="franchise">Franchise</option>
            </select>
          </div>
        </div>

        {/* Legal Name and Registration Number */}
        <div className="flex gap-6 mb-6">
          {/* Legal Name */}
          <div className="flex-1">
            <label className="block mb-2 text-[#888888]">
              Legal Name <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
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
            className="block text-sm w-full border border-gray-300 rounded-md p-2 h-40"
            placeholder="Shot intruction"
            required
          />
        </div>
      </form>
      <div className="my-6 text-right mx-5">
        <button className="px-[14px] py-[10px] text-sm rounded-md text-[#82868E] bg-[#E5E7E8] hover:bg-[#cccfd1]">
          Continue
        </button>
      </div>
    </div>
  );
};

export default SetUpBusiness;
