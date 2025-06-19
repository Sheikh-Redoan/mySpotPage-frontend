import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
import { Upload, X } from "lucide-react";

const ServiceImageUpload = ({
  handleWorkRemoveImage,
  workImages,
  handleWorkFileChange,
  handleButtonClick,
  setIsModalOpen, // now expects a function that receives index (number)
  fileInputRef,
  workCroppedImages,
  setCurrentCropIndex,
}) => {
  return (
    <div className="mb-10">
      <Collapse expandIconPosition="end" className="custom-collapse" bordered={false}>
        <Panel
          key="3"
          header={
            <div className="flex items-center gap-x-3">
              <div className="w-10 h-10 flex justify-center items-center border p-4 rounded-full text-[#262626] font-bold">
                3
              </div>
              <span className="text-[#262626] font-semibold text-base md:text-xl">
                Upload Image Of Your Work
              </span>
            </div>
          }
          style={{
            background: "#FFFFFF",
            border: "1px solid #E7E7E7",
            borderRadius: "10px",
          }}
          className="rounded-lg p-0 mb-1 overflow-hidden"
        >
          <div className="ml-4 md:ml-14.5 my-4">
            <h2 className="mb-3 text-[#666]">
              You can upload up to 10 images to showcase your best work.
            </h2>

            {workImages.length < 10 && (
              <button
                className="w-[188px] px-3 py-2 rounded-lg flex items-center border border-[#E7E7E7] gap-3 hover:shadow-sm transition"
                onClick={handleButtonClick}
                type="button"
              >
                <Upload size={18} />
                <p className="font-medium text-[#262626]">Upload Your Image</p>
                <input
                  ref={fileInputRef}
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleWorkFileChange}
                />
              </button>
            )}

            {workImages.length > 0 && (
              <div className="mt-4 pb-8 overflow-x-auto">
                <div className="flex gap-3 min-w-max sm:min-w-full">
                  {workImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-[150px] h-[150px] rounded-lg overflow-hidden border border-gray-200 shrink-0"
                    >
                      <img
                        src={workCroppedImages?.[index] || img}
                        alt={`Uploaded ${index}`}
                        onClick={() => {
                          setCurrentCropIndex(index);
                          setIsModalOpen(index);
                        }}
                        className="w-full h-full object-cover cursor-pointer"
                      />
                      <button
                        type="button"
                        onClick={() => handleWorkRemoveImage(index)}
                        className="absolute top-1 right-1 bg-white border border-gray-300 rounded-full p-1 group hover:bg-[#866BE7] hover:border-[#866BE7]"
                      >
                        <X className="w-4 h-4 text-[#866BE7] group-hover:text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ServiceImageUpload;
