import React from 'react';
import { Checkbox, Collapse, Select, } from "antd";
const { Panel } = Collapse;
import { Minus, Plus, } from "lucide-react";
import { DeleteIcon } from "../../../assets/icons/icons2";
import { DownArrowIcon } from "../../../assets/icons/icons";
import { imageProvider } from "../../../lib/imageProvider";

const ServicePriceSetting = ({ priceCheckboxChange1, priceCheckboxChange2, priceModal1, priceModal2, hoursCount, setHoursCount, minuteCount, setMinuteCount }) => {
    return (
        <div>
            <Collapse
                expandIconPosition="end"
                className="custom-collapse"
                bordered={false}
            >
                <Panel
                    style={{
                        background: "#FFFFFF",
                        border: "1px solid #E7E7E7",
                        borderRadius: "10px",
                    }}
                    key="2"
                    header={
                        <div className="flex items-center gap-x-3">
                            <div className="w-10 h-10 flex justify-center items-center border p-4 rounded-full  text-[#262626] font-bold">
                                2
                            </div>
                            <span className="text-[#262626] font-semibold text-base md:text-xl">
                                Price Settings
                            </span>
                        </div>
                    }
                    className="rounded-lg p-0 mb-1 overflow-hidden"
                >
                    <div className="ml-4 md:ml-12">
                        <div className="my-4">
                            <label className="flex  gap-2 mb-2 text-[#4F4F4F]">
                                <Checkbox
                                    className="custom-checkbox1"
                                    onChange={priceCheckboxChange2}
                                    checked={priceModal2}
                                />

                                <p>
                                    This service comes as a standard offering with no
                                    additional options
                                </p>
                            </label>
                            {priceModal2 && (
                                <div className="ml-4 md:ml-12 flex gap-x-6 gap-y-3">
                                    <div className="space-y-1.5">
                                        <h4>
                                            Hour(s) <span className="text-orange-600">*</span>
                                        </h4>
                                        <div className="flex justify-between items-center border border-[#E5E7E8] p-2 rounded-lg w-[210px]">
                                            <Plus onClick={() => setHoursCount(prev => prev + 1)} className="text-[#ACAFB4] cursor-pointer" />
                                            <p className="text-[#424348]">{hoursCount}</p>
                                            <Minus onClick={() => setHoursCount(prev => (prev > 0 ? prev - 1 : 0))} className="text-[#ACAFB4] cursor-pointer" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <h4>
                                            Minute(s) <span className="text-orange-600">*</span>
                                        </h4>
                                        <div className="flex justify-between items-center border border-[#E5E7E8] p-2 rounded-lg w-[210px]">
                                            <Plus onClick={() => setMinuteCount(prev => ((prev >= 0 && prev < 0.75) ? prev + 0.25 : 0.75))} className="text-[#ACAFB4]" />
                                            <p className="text-[#424348]">{minuteCount}</p>
                                            <Minus onClick={() => setMinuteCount(prev => ((prev > 0 && prev <= 0.75) ? prev - 0.25 : 0))} className="text-[#ACAFB4]" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <h4>
                                            Price Type <span className="text-orange-600">*</span>
                                        </h4>
                                        <Select
                                            id="price"
                                            placeholder="Select"
                                            className="w-[210px] !h-10"
                                            suffixIcon={<DownArrowIcon />}
                                        >
                                            {["Fixed Price", "Initial Price Base"].map((city) => (
                                                <Option
                                                    className="text-[#ACAFB4] text-base"
                                                    key={city}
                                                    value={city}
                                                >
                                                    {city}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5 relative">
                                        <label className="block">
                                            Amount <span className="text-orange-600">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="border border-[#E5E7E8] p-2 rounded-lg w-[210px]"
                                                type="text"
                                                placeholder="Price"
                                            />
                                            <div className="pointer absolute inset-y-0 top-0 right-3 flex items-center text-[#888888]">
                                                <img src={imageProvider.dollor} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="flex  gap-2 mb-2 text-[#4F4F4F]">
                                <Checkbox
                                    className="custom-checkbox1"
                                    onChange={priceCheckboxChange1}
                                    checked={priceModal1}
                                />

                                <p>This service offers multiple options</p>
                            </label>
                            {priceModal1 && (
                                <div className="ml-4 md:ml-12">
                                    <div className="flex items-center gap-x-6 gap-y-3">
                                        <div className="flex justify-center items-center mt-6 rounded-full h-[40px] w-[40px] bg-[#F6F6F6] hover:scale-105 transform transition-all duration-300 ease-in-out">
                                            <DeleteIcon className="h-5 w-5" />
                                        </div>
                                        <div className="space-y-1.5 ">
                                            <label className="block">
                                                Name <span className="text-orange-600">*</span>
                                            </label>
                                            <input
                                                className="border border-[#E5E7E8] p-2 rounded-lg w-[280px]"
                                                type="text"
                                                placeholder="Name"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <h4>
                                                Hour(s) <span className="text-orange-600">*</span>
                                            </h4>
                                            <div className="flex justify-between items-center border border-[#E5E7E8] p-2 rounded-lg w-[210px]">
                                                <Plus className="text-[#ACAFB4]" />
                                                <p className="text-[#424348]">0</p>
                                                <Minus className="text-[#ACAFB4]" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <h4>
                                                Minute(s) <span className="text-orange-600">*</span>
                                            </h4>
                                            <div className="flex justify-between items-center border border-[#E5E7E8] p-2 rounded-lg w-[210px]">
                                                <Plus className="text-[#ACAFB4]" />
                                                <p className="text-[#424348]">0</p>
                                                <Minus className="text-[#ACAFB4]" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <h4>
                                                Price Type{" "}
                                                <span className="text-orange-600">*</span>
                                            </h4>
                                            <Select
                                                id="price"
                                                placeholder="Select"
                                                className="w-[210px] !h-10"
                                                suffixIcon={<DownArrowIcon />}
                                            >
                                                {["Fixed Price", "Initial Price Base"].map(
                                                    (city) => (
                                                        <Option
                                                            className="text-[#ACAFB4] text-base"
                                                            key={city}
                                                            value={city}
                                                        >
                                                            {city}
                                                        </Option>
                                                    )
                                                )}
                                            </Select>
                                        </div>
                                        <div className="space-y-1.5 relative">
                                            <label className="block">
                                                Amount <span className="text-orange-600">*</span>
                                            </label>
                                            <input
                                                className="border border-[#E5E7E8] p-2 rounded-lg w-[210px]"
                                                type="text"
                                                placeholder="Price"
                                            />
                                            <div className="pointer absolute inset-y-0 top-8 right-3 flex items-center text-[#888888]">
                                                <img src={imageProvider.dollor} alt="" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 p-2 text-[#744CDB] rounded-lg mt-2">
                                        <Plus size={20} className="text-[#744CDB]" />
                                        <p className="text-[15px] font-semibold">
                                            Add More Option
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </div>
    );
};

export default ServicePriceSetting;