import React, { useState, useEffect } from "react";
import { Checkbox, Collapse, Select } from "antd";
const { Panel } = Collapse;
const { Option } = Select;
import { Minus, Plus, Trash2, Check } from "lucide-react";
import { DeleteIcon } from "../../../assets/icons/icons2";
import { DownArrowIcon } from "../../../assets/icons/icons";
import { imageProvider } from "../../../lib/imageProvider";

const ServicePriceSetting = ({
    priceCheckboxChange1,
    priceCheckboxChange2,
    priceModal1,
    priceModal2,
    hoursCount,
    setHoursCount,
    minuteCount,
    setMinuteCount,
    priceModalList,
    setPriceModalList
}) => {
    const [isStepComplete, setIsStepComplete] = useState(false);
    const [selectedPriceType, setSelectedPriceType] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        let isValid = false;

        if (priceModal1) {
            isValid = priceModalList.every(
                (item) =>
                    item.name?.trim().length > 0 &&
                    item.hour >= 0 &&
                    item.minute >= 0 &&
                    item.priceType?.trim().length > 0 &&
                    item.amount?.toString().trim().length > 0
            );
        } else if (priceModal2) {
            const isHourValid = hoursCount >= 0;
            const isMinuteValid = minuteCount >= 0 && minuteCount <= 0.75;
            const isPriceTypeValid = selectedPriceType?.trim().length > 0;
            const isAmountValid = amount !== "" && !isNaN(Number(amount)) && Number(amount) > 0;
            isValid = isHourValid && isMinuteValid && isPriceTypeValid && isAmountValid;
        }

        setIsStepComplete(isValid);
    }, [priceModal1, priceModal2, priceModalList, hoursCount, minuteCount, selectedPriceType, amount]);

    const handleChange = (index, field, value) => {
        const newList = [...priceModalList];
        newList[index][field] = value;
        setPriceModalList(newList);
    };

    const incrementHour = (index) => {
        handleChange(index, "hour", priceModalList[index].hour + 1);
    };

    const decrementHour = (index) => {
        handleChange(index, "hour", Math.max(0, priceModalList[index].hour - 1));
    };

    const incrementMinute = (index) => {
        const current = priceModalList[index].minute;
        if (current < 0.75) {
            handleChange(index, "minute", parseFloat((current + 0.25).toFixed(2)));
        }
    };

    const decrementMinute = (index) => {
        const current = priceModalList[index].minute;
        if (current > 0) {
            handleChange(index, "minute", parseFloat((current - 0.25).toFixed(2)));
        }
    };

    const addOption = () => {
        setPriceModalList((prev) => [
            ...prev,
            {
                id: Date.now(),
                name: "",
                hour: 0,
                minute: 0,
                priceType: "",
                amount: "",
            },
        ]);
    };

    const removeOption = (index) => {
        if (priceModalList.length > 1) {
            const updated = [...priceModalList];
            updated.splice(index, 1);
            setPriceModalList(updated);
        }
    };

    return (
        <div>
            <Collapse expandIconPosition="end" className="custom-collapse" bordered={false}>
                <Panel
                    style={{ background: "#FFFFFF", border: "1px solid #E7E7E7", borderRadius: "10px" }}
                    key="2"
                    header={
                        <div className="flex items-center gap-x-3">
                            <div className={`w-10 h-10 flex justify-center items-center border rounded-full font-bold transition-all duration-200 ${isStepComplete ? "bg-[#262626] text-white" : "border p-4 text-[#262626]"}`}>
                                {isStepComplete ? <Check className="w-6 h-6" /> : "2"}
                            </div>
                            <span className="text-[#262626] font-semibold text-base md:text-xl">Price Settings</span>
                        </div>
                    }
                    className="rounded-lg p-0 mb-1 overflow-hidden"
                >
                    <div className="ml-4 md:ml-12">
                        <div className="my-4">
                            <label className="flex gap-2 mb-2 text-[#4F4F4F]">
                                <Checkbox className="custom-checkbox1" onChange={priceCheckboxChange2} checked={priceModal2} />
                                <p>This service comes as a standard offering with no additional options</p>
                            </label>
                            {priceModal2 && (
                                <div className="ml-4 md:ml-12 flex flex-col md:flex-row gap-x-6 gap-y-3 overflow-x-auto pb-3">
                                    <div className="flex gap-6">
                                        <div className="space-y-1.5 w-1/2">
                                            <h4>Hour(s) <span className="text-orange-600">*</span></h4>
                                            <div className="flex justify-between items-center border border-[#E5E7E8] p-2 rounded-lg md:w-[210px]">
                                                <Plus onClick={() => setHoursCount((prev) => prev + 1)} className="text-[#ACAFB4] cursor-pointer" />
                                                <p className="text-[#424348]">{hoursCount}</p>
                                                <Minus onClick={() => setHoursCount((prev) => (prev > 0 ? prev - 1 : 0))} className="text-[#ACAFB4] cursor-pointer" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5 w-1/2">
                                            <h4>Minute(s) <span className="text-orange-600">*</span></h4>
                                            <div className="flex justify-between items-center border border-[#E5E7E8] p-2 rounded-lg md:w-[210px]">
                                                <Plus onClick={() => setMinuteCount((prev) => (prev >= 0 && prev < 0.75 ? prev + 0.25 : 0.75))} className="text-[#ACAFB4]" />
                                                <p className="text-[#424348]">{minuteCount}</p>
                                                <Minus onClick={() => setMinuteCount((prev) => (prev > 0 && prev <= 0.75 ? prev - 0.25 : 0))} className="text-[#ACAFB4]" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <h4>Price Type <span className="text-orange-600">*</span></h4>
                                        <Select
                                            id="price"
                                            placeholder="Select"
                                            className="w-full md:w-[210px] !h-10"
                                            suffixIcon={<DownArrowIcon />}
                                            value={selectedPriceType ? selectedPriceType : "Select"}
                                            onChange={(value) => setSelectedPriceType(value)}
                                        >
                                            {["Fixed Price", "Initial Price Base"].map((type) => (
                                                <Option key={type} value={type}>{type}</Option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block">Amount <span className="text-orange-600">*</span></label>
                                        <div className="relative">
                                            <input
                                                className="border border-[#E5E7E8] p-2 rounded-lg w-full md:w-[210px]"
                                                type="text"
                                                placeholder="Price"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
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
                            <label className="flex gap-2 mb-2 text-[#4F4F4F]">
                                <Checkbox className="custom-checkbox1" onChange={priceCheckboxChange1} checked={priceModal1} />
                                <p>This service offers multiple options</p>
                            </label>
                            {priceModal1 && (
                                <div className="ml-4 md:ml-12">
                                    {priceModalList.map((option, index) => (
                                        <div key={option.id} className="flex flex-col md:flex-row items-center gap-x-6 gap-y-3 border-2 border-border border-dashed md:border-none md:overflow-x-auto md:pb-5 p-4 md:p-0 rounded-lg mb-7 md:mb-0 relative">
                                            {/* <div className={`flex justify-center items-center mt-6 rounded-full h-[40px] w-[40px] ${priceModalList.length === 1 ? "bg-[#F6F6F6] cursor-not-allowed" : "bg-[#F6F6F6] hover:scale-105 transform transition-all duration-300 ease-in-out cursor-pointer"}`} onClick={() => { if (priceModalList.length > 1) removeOption(index); }}>
                                                <Trash2 className={`h-5 w-10 ${priceModalList.length > 1 && "text-red-500"}`} />
                                            </div> */}
                                            <div>
                                                <Trash2
                                                    className={`absolute md:static mt-0 md:mt-7 -top-4 -right-4 size-10 p-2 bg-[#F6F6F6] rounded-full ${priceModalList.length === 1 ? "cursor-not-allowed text-gray-500" : "text-red-500"}`}
                                                    onClick={() => {
                                                        if (priceModalList.length > 1) removeOption(index);
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-1.5 flex flex-col w-full md:w-fit">
                                                <label>Name <span className="text-orange-600">*</span></label>
                                                <input className="border border-[#E5E7E8] p-2 rounded-lg  md:w-[280px]" value={option.name} onChange={(e) => handleChange(index, "name", e.target.value)} placeholder="Name" />
                                            </div>
                                            <div className="flex gap-6 w-full md:w-fit">
                                                <div className="space-y-1.5 w-1/2">
                                                    <h4>Hour(s) <span className="text-orange-600">*</span></h4>
                                                    <div className="flex justify-between items-center border border-[#E5E7E8] p-2 rounded-lg md:w-[210px]">
                                                        <Plus className="text-[#ACAFB4] cursor-pointer" onClick={() => incrementHour(index)} />
                                                        <p className="text-[#424348]">{option.hour}</p>
                                                        <Minus className="text-[#ACAFB4] cursor-pointer" onClick={() => decrementHour(index)} />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5 w-1/2">
                                                    <h4>Minute(s) <span className="text-orange-600">*</span></h4>
                                                    <div className="flex justify-between items-center border border-[#E5E7E8] p-2 rounded-lg md:w-[210px]">
                                                        <Plus className="text-[#ACAFB4] cursor-pointer" onClick={() => incrementMinute(index)} />
                                                        <p className="text-[#424348]">{option.minute}</p>
                                                        <Minus className="text-[#ACAFB4] cursor-pointer" onClick={() => decrementMinute(index)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5 w-full md:w-fit">
                                                <h4>Price Type <span className="text-orange-600">*</span></h4>
                                                <Select
                                                    id={`priceType-${option.id}`}
                                                    value={option.priceType ? option.priceType : "Select"}
                                                    onChange={(value) => handleChange(index, "priceType", value)}
                                                    placeholder="Select" className="w-full md:w-[210px] !h-10"
                                                    suffixIcon={<DownArrowIcon />}
                                                >
                                                    {["Fixed Price", "Initial Price Base"].map((type) => (
                                                        <Option key={type} value={type}>{type}</Option>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div className="space-y-1.5 relative w-full md:w-fit">
                                                <label>Amount <span className="text-orange-600">*</span></label>
                                                <div className="relative">
                                                    <input className="border border-[#E5E7E8] p-2 rounded-lg w-full md:w-[240px]" type="text" value={option.amount} onChange={(e) => handleChange(index, "amount", e.target.value)} placeholder="Price" />
                                                    <div className="pointer absolute inset-y-0 top-0 right-4 flex items-center text-[#888888]">
                                                        <img src={imageProvider.dollor} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-2 p-2 text-[#744CDB] rounded-lg mt-2 cursor-pointer" onClick={addOption}>
                                        <Plus size={20} className="text-[#744CDB]" />
                                        <p className="text-[15px] font-semibold">Add More Option</p>
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
