import { useForm } from "react-hook-form";
import { imageProvider } from "../../lib/imageProvider";
import { CopyIcon } from "../../assets/icons/icons2";
import { Button, ConfigProvider, Drawer, Radio } from "antd";
import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import ImageCropModal from "../modal/ImageCropModal"; // Make sure this path is correct
import useResponsive from "../../hooks/useResponsive";
import Dropdown from "../ui/Dropdown";
import ServiceClassificationDrawer from "../modal/ServiceClassificationDrawer";

const serviceOptions = [
    { value: "Nails", label: "Nails" },
    { value: "Hair & Barber", label: "Hair & Barber" },
    { value: "Makeup", label: "Makeup" },
    // ... other options
];

const businessOptions = [
    { value: "Exempt Business (Osek Patur)", label: "Exempt Business (Osek Patur)" },
    { value: "Licensed Business (Osek Murshé)", label: "Licensed Business (Osek Murshé)" },
    { value: "Limited Company (Ltd.)", label: "Limited Company (Ltd.)" },
    { value: "Non-Profit Organization", label: "Non-Profit Organization" },
];

const BusinessInfo = () => {
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit } = useForm();
    const { md, lg } = useResponsive();
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState("Exempt Business (Osek Patur)");
    const [selectValue, setSelectvalue] = useState(label);

    const [openForClassification, setOpenForClassification] = useState(false);
    const [labelForClassification, setLabelForClassification] = useState("Nails");
    const [selectValueForClassification, setSelectvalueForClassification] = useState(labelForClassification);

    const onSubmit = (data) => {
        console.log({ ...data, thumbnail: croppedImage });
    };

    const handleChange = (value) => {
        console.log("Selected:", value);
    };

    const handleRemoveImage = () => {
        setImage(null);
        setCroppedImage(null);
        // Reset the file input if you have a ref to it
        // e.g., fileInputRef.current.value = null;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
            setIsModalOpen(true); // Open the modal to crop the new image
        }
    };

    const handleCropFinish = (croppedImgDataUrl) => {
        setCroppedImage(croppedImgDataUrl);
        setIsModalOpen(false); // Close modal on finish
    };

    return (
        <div className="min-h-full">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-3 md:p-[26px] border-[1.5px] border-[#E7E7E7] bg-[#FFFFFF] rounded-xl mt-4"
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-[#262626] text-base md:text-xl font-semibold">
                        Business Information
                    </h2>
                    <button type="submit" className="py-2 px-4 text-sm border font-medium rounded-lg bg-[#242528] hover:bg-[#3a3b40] text-[#FFFFFF] hover:scale-95 transform transition-all duration-300 ease-in-out">
                        Save
                    </button>
                </div>

                {/* Image Upload */}
                <div className="my-6">
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
                                    <img src={imageProvider.imageUploader} alt="Upload" />
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
                                    alt="Uploaded"
                                    className="w-full h-[180px] rounded-lg object-cover cursor-pointer"
                                    onClick={() => setIsModalOpen(true)} // Re-open cropper to re-crop
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

                    {/* Public URL */}
                    <div className="flex-1 relative mt-5 md:mt-0">
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
                    {(lg || md) ? (
                        <div className="flex-1 relative">
                            <label className="block mb-2 text-[#888888]">
                                Business Type <span className="text-orange-600">*</span>
                            </label>
                            <ConfigProvider
                                theme={{
                                    token: { colorPrimary: "#8B5CF6", borderRadius: 8 },
                                    components: { Select: { controlHeight: 38 } },
                                }}
                            >
                                <Dropdown options={businessOptions} placeholder="Select" onChange={handleChange} />
                            </ConfigProvider>
                        </div>
                    ) : (
                        <div className="flex-1">
                            <label className="block mb-2 text-[#888888]">
                                Business Type <span className="text-orange-600">*</span>
                            </label>
                            <Button
                                type="default"
                                className="w-full !flex !justify-between !py-5 !border !border-gray-300"
                                onClick={() => setOpen(true)}
                            >
                                {selectValue} <ChevronDown className="text-description" />
                            </Button>
                            <Drawer
                                placement={"bottom"}
                                closable={false}
                                title="Business type"
                                extra={<Button type="text" onClick={() => setOpen(false)} className="!px-0"><X size={24} className="text-description" /></Button>}
                                onClose={() => setOpen(false)}
                                open={open}
                                className="rounded-t-xl"
                            >
                                <Radio.Group
                                    style={{ display: "flex", flexDirection: "column", gap: 10, padding: 20, fontSize: '14px' }}
                                    onChange={(e) => setLabel(e.target.value)}
                                    value={label}
                                    options={businessOptions}
                                />
                                <div className="bg-white pt-5 pb-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-center fixed bottom-0 w-full">
                                    <button
                                        onClick={() => { setOpen(false); setSelectvalue(label); }}
                                        className="bg-black-button text-white w-[95%] flex justify-center py-2.5 rounded-md font-semibold"
                                        type="button"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </Drawer>
                            <style>{`.ant-drawer-body { padding: 0 !important; }`}</style>
                        </div>
                    )}

                    {/* Service Classification */}
                    <div className="flex-1 mt-5 md:mt-0">
                        <ServiceClassificationDrawer
                            openForClassification={openForClassification}
                            setOpenForClassification={setOpenForClassification}
                            setLabelForClassification={setLabelForClassification}
                            selectValueForClassification={selectValueForClassification}
                            setSelectvalueForClassification={setSelectvalueForClassification}
                            serviceOptions={serviceOptions}
                            labelForClassification={labelForClassification}
                            handleChange={handleChange}
                        />
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
                    <div className="flex-1 mt-5 md:mt-0">
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
            <ImageCropModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                image={image}
                onCropFinish={handleCropFinish}
            />
        </div>
    );
};

export default BusinessInfo;