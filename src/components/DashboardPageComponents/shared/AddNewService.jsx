import { Space } from "antd";
import { ArrowLeft, } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ImageCropModal from "../../modal/ImageCropModal";
import ServicePriceSetting from "./ServicePriceSetting";
import ServiceImageUpload from "./ServiceImageUpload";
import ServiceBasicDetails from "./ServiceBasicDetails";

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

          <ServiceBasicDetails activeKey={activeKey} handleCollapseChange={handleCollapseChange} isStepComplete={isStepComplete} handleSubmit={handleSubmit} onSubmit={onSubmit} image={image} thumbnailName={thumbnailName} handleFileChange={handleFileChange} register={register} control={control} croppedImage={croppedImage} handleRemoveImage={handleRemoveImage} setIsModalOpen={setIsModalOpen} />

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
