import React, { useState } from "react";
import { Button, Collapse, Select, Drawer, Radio, Input } from "antd";
import { Check, X, ChevronDown } from "lucide-react";
import { Controller } from "react-hook-form";
import { DownArrowIcon } from "../../../assets/icons/icons";
import { imageProvider } from "../../../lib/imageProvider";
import useResponsive from "../../../hooks/useResponsive";

const { Panel } = Collapse;
const { TextArea } = Input;

const ServiceBasicDetails = ({
    activeKey,
    handleCollapseChange,
    isStepComplete,
    image,
    thumbnailName,
    handleFileChange,
    register,
    control,
    errors, // Make sure to pass errors from the parent
    handleRemoveImage,
    setIsModalOpen,
}) => {
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState("For All");
    const [selectValue, setSelectvalue] = useState(label);
    const { md, lg } = useResponsive();

    // This component should not have its own form tag.
    // It is part of the larger form in AddNewServicePage.
    return (
        <div>
            <Collapse
                expandIconPosition="end"
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
                                className={`w-10 h-10 flex justify-center items-center border rounded-full font-bold transition-all duration-200 ${
                                    isStepComplete
                                        ? "bg-[#262626] text-white"
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
                    {/* The form tag has been removed from here */}
                    <div className="ml-4 md:ml-14.5 pt-4">
                        {/* Image Uploader */}
                        <label className="block mb-2 text-base text-[#3A3B3F]">
                            Thumbnail <span className="text-orange-600">*</span>
                        </label>
                        <div className="mb-6 flex">
                            {!image ? (
                                <label
                                    // Use the handleFileChange from props which triggers the hidden input in the parent
                                    onClick={handleFileChange}
                                    className="w-full max-w-38 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-8 rounded-lg cursor-pointer hover:border-[#866BE7] transition-all text-center"
                                >
                                    <div className="flex flex-col items-center">
                                        <img src={imageProvider.upload} alt="Upload" />
                                        <p className="text-gray-600 font-semibold my-2">
                                            {thumbnailName || "Upload"}
                                        </p>
                                    </div>
                                </label>
                            ) : (
                                <div className="relative w-full max-w-[180px]">
                                    <img
                                        onClick={setIsModalOpen} // Re-opens the cropper
                                        src={image} // Directly use the cropped image passed via props
                                        alt="Uploaded"
                                        className="w-full h-[140px] rounded-lg object-cover cursor-pointer"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 group"
                                    >
                                        <X className="w-5 h-5 text-[#866BE7] group-hover:text-white" />
                                    </button>
                                </div>
                            )}
                        </div>
                         {/* Display thumbnail error if it exists and image is not selected */}
                         {errors.thumbnail && !image && (
                            <p className="text-red-500 text-sm mt-[-1rem] mb-4">Thumbnail is required.</p>
                         )}


                        <div className="flex flex-col md:flex-row md:items-center md:gap-8 w-full">
                            {/* Service Name */}
                            <div className="mb-6 md:w-[440px]">
                                <label htmlFor="serviceName" className="block mb-2 text-base text-[#3A3B3F]">
                                    Service Name <span className="text-orange-600">*</span>
                                </label>
                                <Input
                                    id="serviceName"
                                    {...register("serviceName", { required: "Service name is required." })}
                                    placeholder="e.g Hair cut"
                                    status={errors.serviceName ? 'error' : ''}
                                />
                                {errors.serviceName && <p className="text-red-500 text-sm">{errors.serviceName.message}</p>}
                            </div>

                            {/* Description */}
                            <div className="mb-6 flex-1">
                                <label htmlFor="description" className="block mb-2 text-base text-[#3A3B3F]">
                                    Description <span className="text-orange-600">*</span>
                                </label>
                                <TextArea
                                    id="description"
                                    {...register("description", { required: "Description is required." })}
                                    rows={lg ? 1 : 4}
                                    placeholder="e.g. A haircut is a process of trimming..."
                                    status={errors.description ? 'error' : ''}
                                />
                                 {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                            </div>
                        </div>

                        {/* Available For */}
                        <div>
                            <label className="block mb-2 text-[#3A3B3F]">
                                Available for <span className="text-orange-600">*</span>
                            </label>
                            {(lg || md) ? (
                                <Controller
                                    name="availableFor"
                                    control={control}
                                    defaultValue="For All"
                                    rules={{ required: "This field is required." }}
                                    render={({ field }) => (
                                        <div className="relative md:w-[440px]">
                                            <Select
                                                {...field}
                                                style={{ width: '100%' }}
                                                size="large"
                                                suffixIcon={<DownArrowIcon />}
                                                status={errors.availableFor ? 'error' : ''}
                                            >
                                                <Select.Option value="For All">For All</Select.Option>
                                                <Select.Option value="For male only">For male only</Select.Option>
                                                <Select.Option value="For female only">For female only</Select.Option>
                                                <Select.Option value="For kids only">For kids only</Select.Option>
                                            </Select>
                                            {errors.availableFor && <p className="text-red-500 text-sm">{errors.availableFor.message}</p>}
                                        </div>
                                    )}
                                />
                            ) : (
                                // Mobile Drawer Select
                                <>
                                    <Button
                                        type="default"
                                        className="w-full !flex !justify-between !items-center !h-10"
                                        onClick={() => setOpen(true)}
                                    >
                                        {selectValue} <ChevronDown className="text-description" />
                                    </Button>
                                    <Drawer
                                        placement="bottom"
                                        closable={false}
                                        onClose={() => setOpen(false)}
                                        open={open}
                                        title="Available for"
                                        extra={<Button type="text" onClick={() => setOpen(false)}><X size={24} /></Button>}
                                        className="rounded-t-xl"
                                    >
                                        <Controller
                                            name="availableFor"
                                            control={control}
                                            defaultValue="For All"
                                            render={({ field }) => (
                                                <Radio.Group
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        setLabel(e.target.value);
                                                    }}
                                                    value={field.value}
                                                    style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}
                                                >
                                                    <Radio value="For All">For All</Radio>
                                                    <Radio value="For male only">For male only</Radio>
                                                    <Radio value="For female only">For female only</Radio>
                                                    <Radio value="For kids only">For kids only</Radio>
                                                </Radio.Group>
                                            )}
                                        />
                                        <div className="bg-white pt-5 pb-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-center fixed bottom-0 w-full">
                                            <button
                                                type="button"
                                                onClick={() => { setOpen(false); setSelectvalue(label); }}
                                                className="bg-black text-white w-[95%] flex justify-center py-2.5 rounded-md"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </Drawer>
                                </>
                            )}
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </div>
    );
};

export default ServiceBasicDetails;