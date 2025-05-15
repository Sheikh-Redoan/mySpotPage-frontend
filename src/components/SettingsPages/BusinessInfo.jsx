import { useForm } from "react-hook-form";
import { imageProvider } from "../../lib/imageProvider";
import { CopyIcon } from "../../assets/icons/icons2";
import { ConfigProvider } from "antd";
import SearchableDropdown from "../ui/SearchableDropdown";
import Dropdown from "../ui/Dropdown";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import AvatarEditor from "react-avatar-editor";

const serviceOptions = [
  { value: "nails", label: "Nails" },
  { value: "hair_barber", label: "Hair & Barber" },
  { value: "makeup", label: "Makeup" },
  { value: "lash_brow", label: "Lash & Brow" },
  { value: "waxing", label: "Waxing" },
  { value: "tanning", label: "Tanning" },
  { value: "massage", label: "Massage" },
  { value: "skincare", label: "Skincare" },
  { value: "spa_wellness", label: "Spas & Wellness" },
  { value: "fitness", label: "Fitness" },
  { value: "tattoo_piercing", label: "Tattoo & Piercing" },
  { value: "teeth_white", label: "Teeth White" },
  { value: "holistic", label: "Holistic" },
];

const businessOptions = [
  {
    value: "exempt_business_(Osek Patur)",
    label: "Exempt Business (Osek Patur)",
  },
  {
    value: "licensed_business_(Osek Murshé)",
    label: "Licensed Business (Osek Murshé)",
  },
  {
    value: "limited_company_(Ltd.)",
    label: "Limited Company (Ltd.)",
  },
  {
    value: "non_profit_organization",
    label: "Non-Profit Organization",
  },
];

const BusinessInfo = () => {
  const [image, setImage] = useState(null);
  const [editorImage, setEditorImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const editorRef = useRef(null);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleChange = (value) => {
    console.log("Selected:", value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setEditorImage(imageURL);
      setImage(imageURL);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const [imgSclaeValue, setImgSclaeValue] = useState(1.2);

  const handleCropFinish = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImage = canvas.toDataURL();

      setImage(croppedImage);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-[26px] border-[1.5px] border-[#E7E7E7] bg-[#FFFFFF] rounded-md mt-4"
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
            {!image ? (
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
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="relative w-full max-w-md">
                <img
                  onClick={() => setIsModalOpen(true)}
                  src={image}
                  alt="Uploaded"
                  className="w-full h-[180px] rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 hover:bg-[#866BE7] hover:border-none transform transition-all duration-300 ease-in-out "
                >
                  <X className="w-5 h-5 text-[#866BE7] hover:text-[#FFFFFF]" />
                </button>
              </div>
            )}
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
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#8B5CF6",
                  borderRadius: 8,
                },
                components: {
                  Select: {
                    controlHeight: 38,
                  },
                },
              }}
            >
              <Dropdown
                options={businessOptions}
                placeholder="Select"
                onChange={handleChange}
              />
            </ConfigProvider>
          </div>

          {/* Business Classification */}
          <div className="flex-1">
            <label className="block mb-2 text-[#888888]">
              Business Classification <span className="text-orange-600">*</span>
            </label>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#8B5CF6",
                  borderRadius: 8,
                },
                components: {
                  Select: {
                    controlHeight: 38,
                  },
                },
              }}
            >
              <SearchableDropdown
                options={serviceOptions}
                placeholder="Select"
                searchPlaceholder="Search"
                onChange={handleChange}
              />
            </ConfigProvider>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#111113cc] flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-3xl">
            {/* Header */}
            <div className="flex justify-between items-center py-6 px-6">
              <h3 className="text-xl font-semibold text-[#242528]">
                Crop image
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-6 h-6 text-[#52555B] hover:scale-105 hover:text-[#3c3e42]" />
              </button>
            </div>

            {/* Avatar Editor */}
            <div className="flex justify-center items-center py-2">
              <div
                onWheel={(e) => {
                  e.preventDefault();
                  const delta = e.deltaY;

                  setImgSclaeValue((prev) => {
                    let newScale = prev + (delta > 0 ? -0.05 : 0.05);
                    newScale = Math.min(Math.max(newScale, 0.5), 3);
                    return newScale;
                  });
                }}
              >
                <AvatarEditor
                  ref={editorRef}
                  image={editorImage}
                  width={720}
                  height={450}
                  scale={imgSclaeValue}
                  rotate={0}
                  className="object-contain w-full max-h-[70vh]"
                />
              </div>
            </div>

            {/* Finish Button */}
            <div className="flex justify-end my-3 pr-6">
              <button
                onClick={handleCropFinish}
                className="text-[#242528] cursor-pointer hover:text-[#141516] hover:font-semibold font-medium text-lg py-2"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessInfo;
