
import React from "react";
import { Button, Collapse, Select } from "antd";
const { Panel } = Collapse;
import { Check, X } from "lucide-react";
import { Controller } from "react-hook-form";
import { DownArrowIcon } from "../../../assets/icons/icons";
import { imageProvider } from "../../../lib/imageProvider";
import useResponsive from "../../../hooks/useResponsive";
import { Drawer } from "antd";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Radio } from "antd";
import { Input } from "antd";

const { TextArea } = Input;

const ServiceBasicDetails = ({
  activeKey,
  handleCollapseChange,
  isStepComplete,
  handleSubmit,
  onSubmit,
  image,
  thumbnailName,
  handleFileChange,
  register,
  control,
  croppedImage,
  handleRemoveImage,
  setIsModalOpen,
}) => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("For All");
  const [selectValue, setSelectvalue] = useState(label);
  const { xs, sm, md, lg } = useResponsive();

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
                      onClick={() => {
                        setIsModalOpen();
                      }}
                      src={croppedImage || image}
                      alt="Uploaded"
                      className="w-full h-[140px] rounded-lg object-cover cursor-pointer"
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

              <div className="flex flex-col md:flex-row md:items-center md:gap-8 w-full">
                {/* Service Name */}
                <div className="mb-6 md:w-[440px]">
                  <label className="block mb-2 text-base text-[#3A3B3F]">
                    Service Name <span className="text-orange-600">*</span>
                  </label>
                  <Input
                    {...register("serviceName", { required: true })}
                    type="text"
                    className="block w-full text-sm border border-gray-300 p-2 rounded-md"
                    placeholder="e.g Hair cut"
                  />
                </div>

                {/* Description */}
                <div className="mb-6 flex-1">
                  <label className="block mb-2 text-base text-[#3A3B3F]">
                    Description<span className="text-orange-600">*</span>
                  </label>

                  {lg ? (
                    <Input
                      {...register("description", { required: true })}
                      type="text"
                      className="block w-full text-sm border border-gray-300 p-2 rounded-md"
                      placeholder="e.g. A haircut is a process of trimming, shaping, or styling hair to achieve a specific look."
                    />
                  ) : (
                    <TextArea
                      {...register("description", { required: true })}
                      rows={4}
                      placeholder="e.g. A haircut is a process of trimming, shaping, or styling hair to achieve a specific look."
                      maxLength={6}
                    />
                  )}
                </div>
              </div>

              {/* Mobile View */}
              {lg || md ? (
                <Controller
                  name="availableFor"
                  control={control}
                  defaultValue="For All"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="relative md:w-[440px]">
                      <label className="block mb-2 text-[#3A3B3F]">
                        Available for <span className="text-orange-600">*</span>
                      </label>
                      <Select
                        {...field}
                        id="availableFor"
                        placeholder="For All"
                        className="!border-none !border-gray-300 rounded-lg w-full !h-10"
                        suffixIcon={<DownArrowIcon />}
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        {[
                          "For All",
                          "For male only",
                          "For female only",
                          "For kids only",
                        ].map((option) => (
                          <Select.Option key={option} value={option}>
                            {option}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  )}
                />
              ) : (
                <>
                  <label className="block mb-2 text-[#3A3B3F]">
                    Available for <span className="text-orange-600">*</span>
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
                    title="Available for"
                    extra={
                      <Button
                        type="text"
                        onClick={() => setOpen(false)}
                        className="!px-0"
                      >
                        <X size={24} className="text-description" />
                      </Button>
                    }
                    // height="38%"
                    onClose={() => setOpen(false)}
                    open={open}
                    className="rounded-t-xl"
                  >
                    <div className="">
                      <Radio.Group
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                          padding: 20,
                          fontSize: "14px",
                        }}
                        onChange={(e) => setLabel(e.target.value)}
                        value={label}
                        options={[
                          { value: "For All", label: "For All" },
                          { value: "For male only", label: "For male only" },
                          { value: "For female only", label: "For female only" },
                          { value: "For kids only", label: "For kids only" },
                        ]}
                      />
                    </div>
                    <div className="bg-white pt-5 pb-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-center fixed bottom-0 w-full">
                      <button
                        onClick={() => {
                          setOpen(false);
                          setSelectvalue(label);
                        }}
                        className="bg-black text-white w-[95%] flex justify-center py-2.5 rounded-md"
                      >
                        Apply
                      </button>
                    </div>
                  </Drawer>
                  <style>
                    {`
          .ant-drawer-body {
            padding: 0 !important;
          }
        `}
                  </style>
                </>
              )}
            </form>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ServiceBasicDetails;
