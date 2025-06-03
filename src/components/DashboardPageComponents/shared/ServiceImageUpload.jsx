import React from 'react';
import { Collapse, } from "antd";
const { Panel } = Collapse;
import {  Upload, X } from "lucide-react";

const ServiceImageUpload = ({handleWorkRemoveImage,workImage, handleWorkFileChange, handleButtonClick, setIsModalOpen, fileInputRef, workCroppedImage}) => {
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
                    key="3"
                    header={
                        <div className="flex items-center gap-x-3">
                            <div className="w-10 h-10 flex justify-center items-center border p-4 rounded-full  text-[#262626] font-bold">
                                3
                            </div>
                            <span className="text-[#262626] font-semibold text-base md:text-xl">
                                Upload Image of Your Work
                            </span>
                        </div>
                    }
                    className="rounded-lg p-0 mb-1 overflow-hidden"
                >
                    <div className="ml-4 md:ml-14.5 my-2">
                        <h2 className="mb-3">
                            You can upload up to 10 images to showcase your best work.
                        </h2>
                        <button
                            className="w-[188px] px-3 py-2 rounded-lg flex items-center border border-[#E7E7E7] gap-3"
                            onClick={handleButtonClick}
                            type="button"
                        >
                            <Upload size={18} />
                            <p className="font-medium text-[#262626]">
                                Upload Your Image
                            </p>
                            <input
                                ref={fileInputRef}
                                id="thumbnail"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleWorkFileChange}
                            />
                        </button>
                        {workImage ? (
                            <div className="relative w-full max-w-[180px] my-4">
                                <img
                                    onClick={() => setIsModalOpen(true)}
                                    src={workCroppedImage || workImage}
                                    alt="Uploaded"
                                    className="w-full h-[140px] rounded-lg object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={handleWorkRemoveImage}
                                    className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 group hover:bg-primary01 hover:border-primary01"
                                >
                                    <X className="w-5 h-5 text-[#866BE7] group-hover:scale-105 transform transition-all duration-100 group-hover:text-white" />
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </Panel>
            </Collapse>
        </div>
    );
};

export default ServiceImageUpload;