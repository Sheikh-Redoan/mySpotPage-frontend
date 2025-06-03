import { Collapse, Select, Space } from "antd";
const { Panel } = Collapse;
import { ArrowLeft, Check, X } from "lucide-react";
import { imageProvider } from "../../../lib/imageProvider";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DownArrowIcon } from "../../../assets/icons/icons";
import ImageCropModal from "../../modal/ImageCropModal";
import ServicePriceSetting from "./ServicePriceSetting";
import ServiceImageUpload from "./ServiceImageUpload";

const AddNewService = ({ setAddNewService }) => {
  const [activeKey, setActiveKey] = useState(["1"]);
  const [isStepComplete, setIsStepComplete] = useState(false);
  const { register, handleSubmit, trigger, control } = useForm({
    mode: "onChange",
  });
  const [thumbnailName, setThumbnailName] = useState("");
  const [priceModal1, setPriceModal1] = useState(false);
  const [priceModal2, setPriceModal2] = useState(false);
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [workImage, setWorkImage] = useState(null);
  const [workCroppedImage, setWorkCroppedImage] = useState(null);
  const fileInputRef = useRef();
  const [hoursCount, setHoursCount] = useState(0);
  const [minuteCount,setMinuteCount] = useState(0)

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  const handleWorkFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setWorkImage(imageUrl);
    }
  };

  const handleCropFinish = (croppedImgDataUrl) => {
    setCroppedImage(croppedImgDataUrl);
  };
  const handleWorkCropFinish = (croppedImgDataUrl) => {
    setWorkCroppedImage(croppedImgDataUrl);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setCroppedImage(null);
  };
  const handleWorkRemoveImage = () => {
    setWorkImage(null);
    setWorkCroppedImage(null);
  };

  const handleCollapseChange = async (key) => {
    if (!key.includes("1")) {
      const isValid = await trigger([
        "serviceName",
        "description",
        "availableFor",
      ]);

      const allFilled = isValid && image;

      setIsStepComplete(allFilled);

      if (!allFilled) return;
    }

    setActiveKey(key);
  };

  const priceCheckboxChange1 = (e) => {
    setPriceModal1(e.target.checked);
  };
  const priceCheckboxChange2 = (e) => {
    setPriceModal2(e.target.checked);
  };
  return (
    <div className="w-full p-5">
      <div className="flex justify-between items-center">
        <div
          onClick={() => setAddNewService(false)}
          className="flex items-center gap-1.5"
        >
          <ArrowLeft />
          <p className="text-[#242528] text-lg font-semibold">New Service</p>
        </div>
        <button
          type="button"
          className="text-[#82868E] font-semibold bg-[#E5E7E8] py-2.5 w-20 rounded-lg cursor-pointer hover:scale-95 transform transition-all duration-300 ease-in-out"
        >
          Publish
        </button>
      </div>
      <div>
        <Space direction="vertical" className="w-full my-4 space-y-6">
          <Collapse
            expandIconPosition="end center"
            defaultActiveKey={["1"]}
            activeKey={activeKey}
            onChange={handleCollapseChange}
            className="custom-collapse"
            bordered={false}
          >
            <Panel
              style={{
                background: "#FFFFFF",
                border: "1px solid #E7E7E7",
                borderRadius: "10px",
              }}
              key="1"
              header={
                <div className="flex items-center gap-x-3">
                  <div
                    className={`w-10 h-10 flex justify-center items-center border rounded-full font-bold transition-all duration-200 ${isStepComplete
                        ? "bg-[#262626] text-white "
                        : "border p-4 text-[#262626]"
                      }`}
                  >
                    {isStepComplete ? <Check className="w-6 h-6" /> : "1"}
                  </div>

                  <span className="text-[#262626] font-semibold text-base md:text-xl">
                    Basic Details
                  </span>
                </div>
              }
              className="rounded-lg p-0 mb-1 overflow-hidden"
            >
              <div className="ml-4 md:ml-14.5">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* image uploader */}
                  <label className="block mb-2 text-base text-[#3A3B3F]">
                    Thumbnail <span className="text-orange-600">*</span>
                  </label>
                  <div className="mb-6 flex">
                    {!image ? (
                      <label
                        htmlFor="thumbnail"
                        className="w-full max-w-38 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-8 rounded-lg cursor-pointer hover:border-[#866BE7] transition-all text-center"
                      >
                        <div className="flex flex-col items-center">
                          <img src={imageProvider.upload} alt="Image" />
                          <p className="text-gray-600 font-semibold my-2">
                            {thumbnailName || "Upload"}
                          </p>
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
                      <div className="relative w-full max-w-[180px]">
                        <img
                          onClick={() => setIsModalOpen(true)}
                          src={croppedImage || image}
                          alt="Uploaded"
                          className="w-full h-[140px] rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 group hover:bg-primary01 hover:border-primary01"
                        >
                          <X className="w-5 h-5 text-[#866BE7] group-hover:scale-105 transform transition-all duration-100 group-hover:text-white" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-8 w-full">
                    {/* Service Name */}
                    <div className="mb-6 w-[440px]">
                      <label className="block mb-2 text-base text-[##3A3B3F]">
                        Service Name <span className="text-orange-600">*</span>
                      </label>
                      <input
                        {...register("serviceName", { required: true })}
                        type="text"
                        className="block w-full text-sm border border-gray-300 p-2 rounded-md"
                        placeholder="e.g Hair cut"
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-6 flex-1">
                      <label className="block mb-2 text-base text-[##3A3B3F]">
                        Description<span className="text-orange-600">*</span>
                      </label>
                      <input
                        {...register("description", { required: true })}
                        type="text"
                        className="block w-full text-sm border border-gray-300 p-2 rounded-md"
                        placeholder="e.g. A haircut is a process of trimming, shaping, or styling hair to achieve a specific look."
                      />
                    </div>
                  </div>

                  {/* Available for  */}
                  <Controller
                    name="availableFor"
                    control={control}
                    defaultValue="For All"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="relative w-[440px]">
                        <label className="block mb-2 text-[#888888]">
                          Available for{" "}
                          <span className="text-orange-600">*</span>
                        </label>
                        <Select
                          {...field}
                          id="availableFor"
                          placeholder="For All"
                          className="border border-[#E0E0E0] rounded-lg w-full !h-10"
                          suffixIcon={<DownArrowIcon />}
                          onChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          {["For All", "For male only", "For female only", "For kids only"].map((option) => (
                            <Option key={option} value={option}>
                              {option}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    )}
                  />
                </form>
              </div>
            </Panel>
          </Collapse>

          <ServicePriceSetting priceModal2={priceModal2} priceModal1={priceModal1} setMinuteCount={setMinuteCount} minuteCount={minuteCount} hoursCount={hoursCount} setHoursCount={setHoursCount} priceCheckboxChange1={priceCheckboxChange1} priceCheckboxChange2={priceCheckboxChange2}/>

          <ServiceImageUpload workImage={workImage} handleWorkRemoveImage={handleWorkRemoveImage} handleWorkFileChange={handleWorkFileChange} handleButtonClick={handleButtonClick} setIsModalOpen={setIsModalOpen} fileInputRef={fileInputRef} workCroppedImage={workCroppedImage}/>

        </Space>
      </div>

      {/* Modal1 */}
      <ImageCropModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={image}
        onCropFinish={handleCropFinish}
      />

      {/* Modal */}
      <ImageCropModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={workImage}
        onCropFinish={handleWorkCropFinish}
      />
    </div>
  );
};

export default AddNewService;
