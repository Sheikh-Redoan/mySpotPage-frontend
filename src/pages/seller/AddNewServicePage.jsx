import { Button, Space } from "antd";
import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import ServiceBasicDetails from "../../components/DashboardPageComponents/shared/ServiceBasicDetails";
import ServiceBeforeAfterImageUpload from "../../components/DashboardPageComponents/shared/ServiceBeforeAfterImageUpload";
import ServiceImageUpload from "../../components/DashboardPageComponents/shared/ServiceImageUpload";
import ServicePriceSetting from "../../components/DashboardPageComponents/shared/ServicePriceSetting";
import ImageCropModal from "../../components/modal/ImageCropModal";

const AddNewServicePage = ({ publishedBtn = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { beforeAfter } = location.state || {};
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("serviceId");

  const { register, handleSubmit, trigger, control } = useForm({
    mode: "onChange",
  });

  const [activeKey, setActiveKey] = useState(["1"]);
  const [isStepComplete, setIsStepComplete] = useState(false);

  // --- Image and Cropping State ---
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [thumbnailName, setThumbnailName] = useState("");

  const [workImages, setWorkImages] = useState([]);
  const [workCroppedImages, setWorkCroppedImages] = useState([]);

  const [imagePairs, setImagePairs] = useState([{ before: null, after: null }]);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [croppingTarget, setCroppingTarget] = useState(null); // e.g., 'basicDetails', 'workImage', { type: 'beforeAfter', ... }
  const [currentCropIndex, setCurrentCropIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileInputRef = useRef();

  // --- Other States ---
  const [priceModal1, setPriceModal1] = useState(false);
  const [priceModal2, setPriceModal2] = useState(false);
  const [hoursCount, setHoursCount] = useState(0);
  const [minuteCount, setMinuteCount] = useState(0);
  const [priceModalList, setPriceModalList] = useState([
    { id: 1, name: "", hour: 0, minute: 0, priceType: "", amount: "" },
  ]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  // --- Image Handling and Cropping Logic ---

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailName(file.name);
      setCroppingTarget("basicDetails");
      setImageToCrop(URL.createObjectURL(file));
      setIsModalOpen(true);
    }
  };

  const handleWorkFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCroppingTarget("workImage");
      setImageToCrop(URL.createObjectURL(file));
      setIsModalOpen(true);
    }
  };

  const handleBeforeAfterImageChange = (index, type, event) => {
    const file = event.target.files[0];
    if (file) {
      setCroppingTarget({ type: "beforeAfter", index, position: type });
      setImageToCrop(URL.createObjectURL(file));
      setIsModalOpen(true);
    }
  };

  const handleCropFinish = (croppedDataUrl) => {
    if (!croppingTarget) return;

    if (croppingTarget === "basicDetails") {
      setThumbnailImage(imageToCrop);
      setCroppedImage(croppedDataUrl);
    } else if (croppingTarget === "workImage") {
      setWorkImages([...workImages, imageToCrop]);
      setWorkCroppedImages([...workCroppedImages, croppedDataUrl]);
    } else if (croppingTarget.type === "beforeAfter") {
      const { index, position } = croppingTarget;
      const updatedPairs = [...imagePairs];
      updatedPairs[index][position] = croppedDataUrl;
      setImagePairs(updatedPairs);
    }

    // Reset state after crop is finished
    setIsModalOpen(false);
    setImageToCrop(null);
    setCroppingTarget(null);
    setCurrentCropIndex(null);
  };

  const handleRemoveImage = () => {
    setThumbnailImage(null);
    setCroppedImage(null);
    setThumbnailName("");
  };

  const handleWorkRemoveImage = (indexToRemove) => {
    setWorkImages((prev) => prev.filter((_, i) => i !== indexToRemove));
    setWorkCroppedImages((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const onRemoveBeforeAfterImage = (index, type) => {
    const updatedPairs = [...imagePairs];
    updatedPairs[index][type] = null;
    setImagePairs(updatedPairs);
  };

  // --- UI and Navigation Logic ---

  const handleCollapseChange = async (key) => {
    if (!key.includes("1")) {
      const isValid = await trigger(["serviceName", "description", "availableFor"]);
      const allFilled = isValid && croppedImage;
      setIsStepComplete(allFilled);
      if (!allFilled) return;
    }
    setActiveKey(key);
  };

  const onAddPair = () => {
    if (imagePairs.length < 5) {
      setImagePairs([...imagePairs, { before: null, after: null }]);
    }
  };

  return (
    <div className="w-full p-4 md:p-5">
      {/* Header */}
      {publishedBtn && (
        <div className="flex justify-between items-center">
          <div onClick={() => navigate(-1)} className="flex items-center gap-1.5 cursor-pointer">
            <ArrowLeft size={18} />
            <p className="text-[#242528] text-lg font-semibold ml-1">
              {serviceId ? "Update" : "New"} Service
            </p>
          </div>
          <Button color="default" variant="solid" disabled>
            Publish
          </Button>
        </div>
      )}

      <div className="mb-20 md:mb-0">
        <Space direction="vertical" className="w-full my-4 space-y-6">
          <ServiceBasicDetails
            activeKey={activeKey}
            handleCollapseChange={handleCollapseChange}
            isStepComplete={isStepComplete}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            image={croppedImage}
            thumbnailName={thumbnailName}
            handleFileChange={handleFileChange}
            register={register}
            control={control}
            croppedImage={croppedImage}
            handleRemoveImage={handleRemoveImage}
            setIsModalOpen={() => {
              if (thumbnailImage) {
                setCroppingTarget("basicDetails");
                setImageToCrop(thumbnailImage);
                setIsModalOpen(true);
              }
            }}
          />

          <ServicePriceSetting
            priceModal2={priceModal2}
            priceModal1={priceModal1}
            setMinuteCount={setMinuteCount}
            minuteCount={minuteCount}
            hoursCount={hoursCount}
            setHoursCount={setHoursCount}
            priceCheckboxChange1={(e) => setPriceModal1(e.target.checked)}
            priceCheckboxChange2={(e) => setPriceModal2(e.target.checked)}
            priceModalList={priceModalList}
            setPriceModalList={setPriceModalList}
          />

          {beforeAfter === "Before & After" && (
            <ServiceBeforeAfterImageUpload
              imagePairs={imagePairs}
              onAddPair={onAddPair}
              onImageSelect={handleBeforeAfterImageChange}
              onRemoveImage={onRemoveBeforeAfterImage}
            />
          )}

          {beforeAfter === "Only Outcome" && (
            <ServiceImageUpload
              workImages={workImages}
              workCroppedImages={workCroppedImages}
              handleWorkRemoveImage={handleWorkRemoveImage}
              handleWorkFileChange={handleWorkFileChange}
              handleButtonClick={handleButtonClick}
              fileInputRef={fileInputRef}
              onImageClick={(index) => {
                setCroppingTarget("workImage");
                setCurrentCropIndex(index);
                setImageToCrop(workImages[index]);
                setIsModalOpen(true);
              }}
            />
          )}
        </Space>
      </div>

      <ImageCropModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={imageToCrop}
        onCropFinish={handleCropFinish}
      />

      {/* Footer Buttons */}
      {!publishedBtn && (
        <div className="sm:w-auto flex items-center justify-end gap-4 my-6 mx-2 sm:mx-5">
          <Link to={-1} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-[18px] py-[8px] border font-medium border-[#242528] rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out hover:bg-[#f3f3f3] hover:shadow-md">
              Previous
            </button>
          </Link>
          <Link to={"/onboard/service-table"} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-[18px] py-[8px] bg-[#242528] text-[#fff] border font-medium rounded-lg hover:scale-95 transition-all duration-300 ease-in-out hover:bg-[#3a3a3a] hover:shadow-md">
              Continue
            </button>
          </Link>
        </div>
      )}

      <div className="flex justify-between items-center md:hidden fixed bottom-0 left-0 right-0 bg-white pb-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-5 z-50">
        <button
          type="button"
          className="md:hidden text-white font-semibold bg-gray-900 py-2.5 w-full rounded-lg cursor-pointer hover:scale-95 transform transition-all duration-300 ease-in-out"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default AddNewServicePage;