import { Space } from "antd";
import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ImageCropModal from "../../modal/ImageCropModal";
import ServicePriceSetting from "./ServicePriceSetting";
import ServiceImageUpload from "./ServiceImageUpload";
import ServiceBasicDetails from "./ServiceBasicDetails";
import ServiceBeforeAfterImageUpload from "./ServiceBeforeAfterImageUpload";

const AddNewService = ({ setAddNewService }) => {
  const [useGalleryView, setUseGalleryView] = useState(false);
  const [activeKey, setActiveKey] = useState(["1"]);
  const [isStepComplete, setIsStepComplete] = useState(false);
  const { register, handleSubmit, trigger, control } = useForm({
    mode: "onChange",
  });

  const [thumbnailName, setThumbnailName] = useState("");
  const [priceModal1, setPriceModal1] = useState(false);
  const [priceModal2, setPriceModal2] = useState(false);

  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const [workImages, setWorkImages] = useState([]); // raw images
  const [workCroppedImages, setWorkCroppedImages] = useState([]); // cropped versions

  const [currentCropIndex, setCurrentCropIndex] = useState(null);

  const fileInputRef = useRef();

  const [hoursCount, setHoursCount] = useState(0);
  const [minuteCount, setMinuteCount] = useState(0);
  const [priceModalList, setPriceModalList] = useState([
    { id: 1, name: "", hour: 0, minute: 0, priceType: "", amount: "" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [croppingTarget, setCroppingTarget] = useState(null); // "basicDetails" or "workImage"

  // befor after pair
  const [imagePairs, setImagePairs] = useState([{ before: null, after: null }]);

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
      setThumbnailImage(imageURL);
      setThumbnailName(file.name);
      setCroppingTarget("basicDetails"); // open modal for basic image
      setIsModalOpen(true);
    }
  };

  const handleWorkFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 10 - workImages.length); // max 10
    const newImageUrls = newImages.map((file) => URL.createObjectURL(file));

    setWorkImages([...workImages, ...newImageUrls]);
    setWorkCroppedImages([...workCroppedImages, ...newImageUrls]); // initially same
  };

  const handleCropFinish = (croppedDataUrl) => {
    if (croppingTarget === "basicDetails") {
      setCroppedImage(croppedDataUrl);
    } else if (croppingTarget === "workImage" && currentCropIndex !== null) {
      const updated = [...workCroppedImages];
      updated[currentCropIndex] = croppedDataUrl;
      setWorkCroppedImages(updated);
    }
    setIsModalOpen(false);
  };

  const handleRemoveImage = () => {
    setThumbnailImage(null);
    setCroppedImage(null);
    setThumbnailName("");
  };

  const handleWorkRemoveImage = (index) => {
    const updatedImages = workImages.filter((_, i) => i !== index);
    const updatedCropped = workCroppedImages.filter((_, i) => i !== index);
    setWorkImages(updatedImages);
    setWorkCroppedImages(updatedCropped);
  };

  const handleCollapseChange = async (key) => {
    if (!key.includes("1")) {
      const isValid = await trigger(["serviceName", "description", "availableFor"]);

      const allFilled = isValid && (croppedImage || thumbnailImage);

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

  // befor after logic
  const onAddPair = () => {
    if (imagePairs.length < 5) {
      setImagePairs([...imagePairs, { before: null, after: null }]);
    }
  };

  const onImageChange = (index, type, event) => {
    const file = event.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedPairs = [...imagePairs];
      updatedPairs[index][type] = reader.result;
      setImagePairs(updatedPairs);
    };
    reader.readAsDataURL(file);
  };


  const onRemoveImage = (index, type) => {
    const updatedPairs = [...imagePairs];
    updatedPairs[index][type] = null;
    setImagePairs(updatedPairs);
  };

  const openCropModal = (index, type) => {
    // Example: Open a modal and store index + type in state
    console.log("Crop requested for:", { index, type });
  };

  return (
    <div className="w-full p-5">
      <div className="flex justify-between items-center">
        <div onClick={() => setAddNewService(false)} className="flex items-center gap-1.5">
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
          <ServiceBasicDetails
            activeKey={activeKey}
            handleCollapseChange={handleCollapseChange}
            isStepComplete={isStepComplete}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            image={croppedImage || thumbnailImage}
            thumbnailName={thumbnailName}
            handleFileChange={handleFileChange}
            register={register}
            control={control}
            croppedImage={croppedImage}
            handleRemoveImage={handleRemoveImage}
            setIsModalOpen={() => {
              setCroppingTarget("basicDetails");
              setIsModalOpen(true);
            }}
          />

          <ServicePriceSetting
            priceModal2={priceModal2}
            priceModal1={priceModal1}
            setMinuteCount={setMinuteCount}
            minuteCount={minuteCount}
            hoursCount={hoursCount}
            setHoursCount={setHoursCount}
            priceCheckboxChange1={priceCheckboxChange1}
            priceCheckboxChange2={priceCheckboxChange2}
            priceModalList={priceModalList}
            setPriceModalList={setPriceModalList}
          />

          {useGalleryView ? (
            <ServiceBeforeAfterImageUpload
              imagePairs={imagePairs}
              onAddPair={onAddPair}
              onChangeImage={onImageChange}
              onRemoveImage={onRemoveImage}
              onCropImage={openCropModal}
            />
          ) : (
            <ServiceImageUpload
              workImages={workImages}
              workCroppedImages={workCroppedImages}
              handleWorkRemoveImage={handleWorkRemoveImage}
              handleWorkFileChange={handleWorkFileChange}
              handleButtonClick={handleButtonClick}
              setIsModalOpen={(index) => {
                setCroppingTarget("workImage");
                setCurrentCropIndex(index);
                setIsModalOpen(true);
              }}
              fileInputRef={fileInputRef}
              setCurrentCropIndex={setCurrentCropIndex}
            />
          )}

          <button
            onClick={() => setUseGalleryView(!useGalleryView)}
            className="text-[#866BE7] text-sm underline mt-2"
          >
            Switch to {useGalleryView ? "List View" : "Gallery View"}
          </button>
        </Space>
      </div>

      {/* Single modal for cropping both basic and work images */}
      <ImageCropModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={
          croppingTarget === "basicDetails"
            ? croppedImage || thumbnailImage
            : workImages[currentCropIndex]
        }
        onCropFinish={handleCropFinish}
      />
    </div>
  );
};

export default AddNewService;
