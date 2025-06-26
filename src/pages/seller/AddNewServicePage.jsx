import { Button, Space } from "antd";
import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import ServiceBasicDetails from "../../components/DashboardPageComponents/shared/ServiceBasicDetails";
import ServiceBeforeAfterImageUpload from "../../components/DashboardPageComponents/shared/ServiceBeforeAfterImageUpload";
import ServiceImageUpload from "../../components/DashboardPageComponents/shared/ServiceImageUpload";
import ServicePriceSetting from "../../components/DashboardPageComponents/shared/ServicePriceSetting";
import ImageCropModal from "../../components/modal/ImageCropModal";

const AddNewServicePage = ({ publishedBtn = false }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const serviceId = searchParams.get("serviceId");

    const [uploadType] = useState("Only Outcome"); // Or "Before & After" based on logic

    const [activeKey, setActiveKey] = useState(["1"]);
    const [isStepComplete, setIsStepComplete] = useState(false);
    const { register, handleSubmit, trigger, control, formState: { errors } } = useForm({
        mode: "onChange",
    });

    // State for image cropping
    const [thumbnailName, setThumbnailName] = useState("");
    const [thumbnailImage, setThumbnailImage] = useState(null); // Original image
    const [croppedThumbnail, setCroppedThumbnail] = useState(null); // Cropped image

    const [workImages, setWorkImages] = useState([]);
    const [croppedWorkImages, setCroppedWorkImages] = useState([]);

    const [imagePairs, setImagePairs] = useState([{ before: null, after: null }]);
    const [originalImagePairs, setOriginalImagePairs] = useState([{ before: null, after: null }]);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);
    const [croppingTarget, setCroppingTarget] = useState({ type: null, index: null, position: null });

    // Refs for hidden file inputs
    const thumbnailInputRef = useRef(null);
    const workImageInputRef = useRef(null);
    const beforeAfterInputRef = useRef(null);

    // Main form submission logic
    const onSubmit = (data) => {
        const finalData = {
            ...data,
            thumbnail: croppedThumbnail,
            workImages: croppedWorkImages,
            beforeAfterImages: imagePairs,
        };
        console.log("Form Submitted Successfully:", finalData);
        // On success, navigate to the next step
        navigate("/onboard/service-table");
    };

    // --- CROP FINISH HANDLER ---
    const handleCropFinish = (croppedDataUrl) => {
        const { type, index, position } = croppingTarget;

        if (type === "basicDetails") {
            setCroppedThumbnail(croppedDataUrl);
        } else if (type === "workImage") {
            const updated = [...croppedWorkImages];
            updated[index] = croppedDataUrl;
            setCroppedWorkImages(updated);
        } else if (type === "beforeAfter") {
            const updatedPairs = [...imagePairs];
            updatedPairs[index][position] = croppedDataUrl;
            setImagePairs(updatedPairs);
        }

        setIsModalOpen(false);
        setImageToCrop(null);
    };
    
    // --- GENERIC FILE HANDLER & CROP INITIATOR ---
    const initiateCrop = (file, target) => {
        if (!file) return;
        const imageURL = URL.createObjectURL(file);
        
        // Set the target for the crop result
        setCroppingTarget(target);
        // Set the image for the modal
        setImageToCrop(imageURL);
        // Open the modal
        setIsModalOpen(true);
    };

    const onThumbnailChange = (e) => {
        const file = e.target.files[0];
        setThumbnailName(file.name);
        setThumbnailImage(URL.createObjectURL(file)); // Save original for re-cropping
        initiateCrop(file, { type: 'basicDetails' });
    };

    const onWorkImageChange = (e) => {
        if (workImages.length >= 10) return;
        const file = e.target.files[0];
        const newIndex = workImages.length;
        setWorkImages([...workImages, URL.createObjectURL(file)]);
        setCroppedWorkImages([...croppedWorkImages, null]);
        initiateCrop(file, { type: 'workImage', index: newIndex });
    };
    
    const onBeforeAfterChange = (e) => {
        const file = e.target.files[0];
        const { index, position } = croppingTarget; // Get target from state
        
        const updatedOriginals = [...originalImagePairs];
        if(!updatedOriginals[index]) updatedOriginals[index] = { before: null, after: null };
        updatedOriginals[index][position] = URL.createObjectURL(file);
        setOriginalImagePairs(updatedOriginals);

        initiateCrop(file, { type: 'beforeAfter', index, position });
    };

    // Trigger for before/after upload
    const handleInitiateBeforeAfterUpload = (index, position) => {
        setCroppingTarget({ type: 'beforeAfter', index, position });
        beforeAfterInputRef.current.click();
    };


    // --- REMOVE & RE-CROP HANDLERS ---
    const handleRemoveThumbnail = () => {
        setThumbnailImage(null);
        setCroppedThumbnail(null);
        setThumbnailName("");
    };

    const handleRemoveWorkImage = (index) => {
        setWorkImages(workImages.filter((_, i) => i !== index));
        setCroppedWorkImages(croppedWorkImages.filter((_, i) => i !== index));
    };

    const onRemoveBeforeAfterImage = (index, type) => {
        const updatedPairs = [...imagePairs];
        updatedPairs[index][type] = null;
        setImagePairs(updatedPairs);
    };

    const openRecropModal = (type, index, position = null) => {
        const target = { type, index, position };
        setCroppingTarget(target);
        if (type === 'basicDetails') setImageToCrop(thumbnailImage);
        else if (type === 'workImage') setImageToCrop(workImages[index]);
        else if (type === 'beforeAfter') setImageToCrop(originalImagePairs[index][position]);
        setIsModalOpen(true);
    };
    
    const onAddPair = () => {
        if (imagePairs.length < 5) {
            setImagePairs([...imagePairs, { before: null, after: null }]);
            setOriginalImagePairs([...originalImagePairs, { before: null, after: null }]);
        }
    };

    const handleCollapseChange = async (key) => {
        if (activeKey.includes("1") && !key.includes("1")) {
            const isValid = await trigger(["serviceName", "description", "availableFor"]);
            if (isValid && croppedThumbnail) {
                setIsStepComplete(true);
                setActiveKey(key);
            } else {
                setIsStepComplete(false);
            }
        } else {
            setActiveKey(key);
        }
    };

    return (
        <div className="w-full p-4 md:p-5">
            <input type="file" ref={thumbnailInputRef} onChange={onThumbnailChange} className="hidden" accept="image/*" />
            <input type="file" ref={workImageInputRef} onChange={onWorkImageChange} className="hidden" accept="image/*" />
            <input type="file" ref={beforeAfterInputRef} onChange={onBeforeAfterChange} className="hidden" accept="image/*" />

            {publishedBtn && (
                <div className="flex justify-between items-center">
                    <div onClick={() => navigate(-1)} className="flex items-center gap-1.5 cursor-pointer">
                        <ArrowLeft size={18} />
                        <p className="text-[#242528] text-lg font-semibold ml-1">{serviceId ? "Update" : "New"} Service</p>
                    </div>
                    <Button type="primary" disabled>Publish</Button>
                </div>
            )}

            {/* The form now wraps everything and uses the correct onSubmit */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-20 md:mb-0">
                    <Space direction="vertical" className="w-full my-4 space-y-6">
                        <ServiceBasicDetails
                            activeKey={activeKey}
                            handleCollapseChange={handleCollapseChange}
                            isStepComplete={isStepComplete}
                            image={croppedThumbnail}
                            thumbnailName={thumbnailName}
                            handleFileChange={() => thumbnailInputRef.current.click()}
                            register={register}
                            control={control}
                            errors={errors} // Pass errors down for display
                            handleRemoveImage={handleRemoveThumbnail}
                            setIsModalOpen={() => openRecropModal('basicDetails')}
                        />

                        <ServicePriceSetting
                            // Pass props
                        />

                        {uploadType === "Only Outcome" ? (
                            <ServiceImageUpload
                                workCroppedImages={croppedWorkImages}
                                handleWorkRemoveImage={handleRemoveWorkImage}
                                handleButtonClick={() => workImageInputRef.current.click()}
                                onCropImage={(index) => openRecropModal('workImage', index)}
                            />
                        ) : (
                            <ServiceBeforeAfterImageUpload
                                imagePairs={imagePairs}
                                onAddPair={onAddPair}
                                onInitiateUpload={handleInitiateBeforeAfterUpload}
                                onRemoveImage={onRemoveBeforeAfterImage}
                                onCropImage={(index, position) => openRecropModal('beforeAfter', index, position)}
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

                {!publishedBtn && (
                    <div className="sm:w-auto flex items-center justify-end gap-4 my-6 mx-2 sm:mx-5">
                        <Link to={-1} className="w-full sm:w-auto">
                            <button type="button" className="w-full sm:w-auto px-[18px] py-[8px] border font-medium border-[#242528] rounded-lg">
                                Previous
                            </button>
                        </Link>
                        {/* This button now correctly submits the form */}
                        <button type="submit" className="w-full sm:w-auto px-[18px] py-[8px] bg-[#242528] text-[#fff] border font-medium rounded-lg">
                            Continue
                        </button>
                    </div>
                )}
                 {publishedBtn && (
                    <div className="flex md:hidden fixed bottom-0 left-0 right-0 bg-white p-5">
                        <button type="submit" className="text-white font-semibold bg-gray-900 py-2.5 w-full rounded-lg">
                            Publish
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default AddNewServicePage;