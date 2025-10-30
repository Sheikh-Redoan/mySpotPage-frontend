import { useForm } from "react-hook-form";
import { imageProvider } from "../../lib/imageProvider";
import { ChevronDown, X } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import ImageCropModal from "../../components/modal/ImageCropModal"; // Make sure this path is correct

const SetUpBusiness = () => {
  const {
    register,
    handleSubmit,
    setValue, // Use setValue to update form state
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  // State for image cropping
  const [image, setImage] = useState(null); // Holds the original image for the cropper
  const [croppedImage, setCroppedImage] = useState(null); // Holds the final cropped image
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formRef = useRef(null);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Include the cropped image in the final form data
    const formData = { ...data, thumbnail: croppedImage };
    console.log(formData);
    navigate("setup-location");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the selected file and open the crop modal
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
      setIsModalOpen(true);
    }
  };

  const handleCropFinish = (croppedImgDataUrl) => {
    // Set the cropped image, update the form value, and close the modal
    setCroppedImage(croppedImgDataUrl);
    setValue("thumbnail", croppedImgDataUrl, { shouldValidate: true }); // Set hidden form value
    setIsModalOpen(false);
  };

  const handleRemoveImage = () => {
    // Clear all image states
    setImage(null);
    setCroppedImage(null);
    setValue("thumbnail", null, { shouldValidate: true }); // Clear hidden form value
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
            {!croppedImage ? (
              <label
                htmlFor="thumbnail"
                className="w-full max-w-md flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-8 rounded-lg cursor-pointer hover:border-[#866BE7] transition-all text-center"
              >
                <div className="flex flex-col items-center">
                  <img src={imageProvider.imageUploader} alt="Upload Icon" />
                  <p className="text-gray-600 text-lg font-semibold underline my-2">
                    Upload Image
                  </p>
                  <p className="text-sm text-gray-500">JPEG, PNG up to 50MB</p>
                </div>
                <input
                  id="thumbnail"
                  type="file"
                  accept="image/jpeg, image/png"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="relative w-full max-w-md">
                <img
                  src={croppedImage}
                  alt="Cropped Thumbnail"
                  className="w-full h-[180px] rounded-lg object-cover cursor-pointer"
                  onClick={() => setIsModalOpen(true)} // Re-open cropper
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 group hover:bg-[#866BE7] hover:border-[#866BE7]"
                >
                  <X className="w-5 h-5 text-[#866BE7] group-hover:text-white" />
                </button>
              </div>
            )}
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
          <div className="flex-1 relative mt-5 sm:mt-0">
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
          <div className="flex-1 mt-5 sm:mt-0">
            <label className="block mb-2 text-[#888888]">
              Registration Number <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              {...register("registerNumber", { required: true })}
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
            placeholder="Short introductions"
            required
          />
        </div>
        {/* Hidden input to hold the cropped image value for form validation */}
        <input type="hidden" {...register("thumbnail", { required: true })} />
      </form>

      {/* Continue Button */}
      <div className="mt-8 sm:my-6 w-full px-5 text-right">
        <button
          disabled={!isValid}
          onClick={handleExternalSubmit}
          className={`w-full md:w-auto block md:inline-block text-center md:text-right px-[14px] py-[10px] rounded-lg transition-all duration-300 ease-in-out ${
            isValid
              ? "text-white bg-[#242528] hover:bg-[#1c1d1f] hover:shadow-lg"
              : "text-[#82868E] bg-[#E5E7E8] cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>

      {/* Modal for Cropping */}
      <ImageCropModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={image}
        onCropFinish={handleCropFinish}
      />
    </div>
  );
};

export default SetUpBusiness;