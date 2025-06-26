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
  const beforeAfter = "Before & After";
  // const beforeAfter = location.state?.beforeAfter;
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("serviceId");

    const [activeKey, setActiveKey] = useState(["1"]);
    const [isStepComplete, setIsStepComplete] = useState(false);
    const { register, handleSubmit, trigger, control } = useForm({
        mode: "onChange",
    });

    // --- State for Basic Details Image ---
    const [thumbnailName, setThumbnailName] = useState("");
    const [thumbnailImage, setThumbnailImage] = useState(null); // Original image for basic details
    const [croppedImage, setCroppedImage] = useState(null); // Cropped image for basic details

    // --- State for "Only Outcome" Images ---
    const [workImages, setWorkImages] = useState([]); // Original images
    const [workCroppedImages, setWorkCroppedImages] = useState([]); // Cropped images

    // --- State for "Before & After" Images ---
    const [imagePairs, setImagePairs] = useState([{ before: null, after: null }]);
    // --- NEW ---: We need original sources for re-cropping "Before & After" images
    const [originalImagePairs, setOriginalImagePairs] = useState([{ before: null, after: null }]);

    // --- MODIFIED ---: Unified State for Cropping Logic
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null); // Holds the source URL for the image currently in the cropper
    const [croppingTarget, setCroppingTarget] = useState({ type: null, index: null, position: null }); // Single object to track what's being cropped

    // --- Refs for hidden file inputs ---
    const fileInputRef = useRef(); // For "Only Outcome"
    const beforeAfterFileInputRef = useRef(null); // --- NEW ---: For "Before & After"

    // (Other state remains the same)
    const [priceModal1, setPriceModal1] = useState(false);
    const [priceModal2, setPriceModal2] = useState(false);
    const [hoursCount, setHoursCount] = useState(0);
    const [minuteCount, setMinuteCount] = useState(0);
    const [priceModalList, setPriceModalList] = useState([
        { id: 1, name: "", hour: 0, minute: 0, priceType: "", amount: "" },
    ]);

    // --- Simplified "Only Outcome" button click ---
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    // --- MODIFIED ---: Unified Crop Finish Handler
    const handleCropFinish = (croppedDataUrl) => {
        const { type, index, position } = croppingTarget;

        if (type === "basicDetails") {
            setCroppedImage(croppedDataUrl);
        } else if (type === "workImage") {
            const updated = [...workCroppedImages];
            updated[index] = croppedDataUrl;
            setWorkCroppedImages(updated);
        } else if (type === "beforeAfter") {
            const updatedPairs = [...imagePairs];
            updatedPairs[index][position] = croppedDataUrl;
            setImagePairs(updatedPairs);
        }

        // Reset and close modal
        setIsModalOpen(false);
        setImageToCrop(null);
        setCroppingTarget({ type: null, index: null, position: null });
    };

    // --- Handlers for Basic Details Image ---
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setThumbnailImage(imageURL); // Keep original for re-cropping
            setThumbnailName(file.name);
            setImageToCrop(imageURL); // Set image for modal
            setCroppingTarget({ type: "basicDetails" }); // Set target
            setIsModalOpen(true); // Open modal
            e.target.value = null;
        }
    };

    const handleRemoveImage = () => {
        setThumbnailImage(null);
        setCroppedImage(null);
        setThumbnailName("");
    };

    // --- MODIFIED ---: Handlers for "Only Outcome" Images (Crop-First)
    const handleWorkFileChange = (e) => {
        const file = e.target.files[0];
        if (file && workImages.length < 10) {
            const imageURL = URL.createObjectURL(file);
            const newIndex = workImages.length;

            setWorkImages([...workImages, imageURL]); // Store original for re-cropping
            // Add a placeholder to cropped array to maintain length
            setWorkCroppedImages([...workCroppedImages, null]); 

            setImageToCrop(imageURL);
            setCroppingTarget({ type: 'workImage', index: newIndex });
            setIsModalOpen(true);
            e.target.value = null;
        }
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
    setCroppingTarget({ index, type });
    setIsModalOpen(true);
  };

  return (
    <div className="w-full p-4 md:p-5">
      {publishedBtn && (
        <div className="flex justify-between items-center">
          <div
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 cursor-pointer">
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
                        {...{ /* other props */ }}
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

                    {beforeAfter === "Before & After" && (
                        <ServiceBeforeAfterImageUpload
                            imagePairs={imagePairs}
                            onAddPair={onAddPair}
                            // --- MODIFIED ---: Pass the new upload initiator
                            onInitiateUpload={handleInitiateBeforeAfterUpload}
                            onRemoveImage={onRemoveImage}
                            onCropImage={(index, position) => {
                                // For re-cropping
                                setCroppingTarget({ type: "beforeAfter", index, position });
                                setImageToCrop(originalImagePairs[index][position]);
                                setIsModalOpen(true);
                            }}
                        />
                    )}

                    {beforeAfter === "Only Outcome" && (
                        <ServiceImageUpload
                            workImages={workImages}
                            workCroppedImages={workCroppedImages}
                            handleWorkRemoveImage={handleWorkRemoveImage}
                            handleWorkFileChange={handleWorkFileChange}
                            handleButtonClick={handleButtonClick}
                            setIsModalOpen={(index) => {
                                setCroppingTarget({ type: "workImage", index });
                                setImageToCrop(workImages[index]); // Set for re-cropping
                                setIsModalOpen(true);
                            }}
                            fileInputRef={fileInputRef}
                        />
                    )}
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
          className=" md:hidden text-white font-semibold bg-gray-900 py-2.5 w-full rounded-lg cursor-pointer hover:scale-95 transform transition-all duration-300 ease-in-out">
          Publish
        </button>
      </div>
    </div>
  );
};

export default AddNewServicePage;