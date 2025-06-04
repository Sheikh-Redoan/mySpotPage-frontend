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
  console.log(isStepComplete)
  const { register, handleSubmit, trigger, control } = useForm({
    mode: "onChange",
  });
  const [thumbnailName, setThumbnailName] = useState("");
  const [priceModal1, setPriceModal1] = useState(false);
  const [priceModal2, setPriceModal2] = useState(false);
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [workImages, setWorkImages] = useState([]); // for raw images
  const [workCroppedImages, setWorkCroppedImages] = useState([]);
  const [currentCropIndex, setCurrentCropIndex] = useState(null);
  const fileInputRef = useRef();
  const [hoursCount, setHoursCount] = useState(0);
  const [minuteCount, setMinuteCount] = useState(0);
  const [priceModalList, setPriceModalList] = useState([
    { id: 1, name: "", hour: 0, minute: 0, priceType: "", amount: "" },
  ]);

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
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 10 - workImages.length); // limit to 10 total
    const newImageUrls = newImages.map((file) => URL.createObjectURL(file));

    setWorkImages([...workImages, ...newImageUrls]);
    setWorkCroppedImages([...workCroppedImages, ...newImageUrls]); // initially same, replace when cropped
  };




  const handleCropFinish = (croppedImgDataUrl) => {
    setCroppedImage(croppedImgDataUrl);
  };

  const handleWorkCropFinish = (croppedImgDataUrl, index) => {
    const updated = [...workCroppedImages];
    updated[index] = croppedImgDataUrl;
    setWorkCroppedImages(updated);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setCroppedImage(null);
  };

  const handleWorkRemoveImage = (index) => {
    const updatedImages = workImages.filter((_, i) => i !== index);
    const updatedCropped = workCroppedImages.filter((_, i) => i !== index);
    setWorkImages(updatedImages);
    setWorkCroppedImages(updatedCropped);
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

          <ServicePriceSetting priceModal2={priceModal2} priceModal1={priceModal1} setMinuteCount={setMinuteCount} minuteCount={minuteCount} hoursCount={hoursCount} setHoursCount={setHoursCount} priceCheckboxChange1={priceCheckboxChange1} priceCheckboxChange2={priceCheckboxChange2} priceModalList={priceModalList} setPriceModalList={setPriceModalList} />

          <ServiceImageUpload
            workImages={workImages}
            workCroppedImages={workCroppedImages}
            handleWorkRemoveImage={handleWorkRemoveImage}
            handleWorkFileChange={handleWorkFileChange}
            handleButtonClick={handleButtonClick}
            setIsModalOpen={setIsModalOpen}
            fileInputRef={fileInputRef}
            setCurrentCropIndex={setCurrentCropIndex}
          />

        </Space>
      </div>


      {/* Modal */}
      <ImageCropModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={workImages[currentCropIndex]}
        onCropFinish={(croppedDataUrl) => handleWorkCropFinish(croppedDataUrl, currentCropIndex)}
      />
    </div>
  );
};

export default AddNewService;
