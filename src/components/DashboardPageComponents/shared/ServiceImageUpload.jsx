import { Check, Upload, X } from "lucide-react";
import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

const ServiceImageUpload = ({
  workImages,
  workCroppedImages,
  handleWorkRemoveImage,
  handleWorkFileChange,
  handleButtonClick,
  fileInputRef,
  onImageClick, // Function to re-open the cropper
}) => {
  return (
    <div className="mb-10">
      <Collapse
        expandIconPosition="end"
        className="custom-collapse"
        bordered={false}
      >
        <Panel
          key="3"
          header={
            <div className="flex items-center gap-x-3">
              <div
                className={`w-10 h-10 flex justify-center items-center border rounded-full font-bold transition-all duration-200 ${
                  workCroppedImages.length > 0
                    ? "bg-[#262626] text-white"
                    : "border p-4 text-[#262626]"
                }`}
              >
                {workCroppedImages.length > 0 ? (
                  <Check className="w-6 h-6" />
                ) : (
                  "3"
                )}
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

            {workCroppedImages.length < 10 && (
              <button
                className="w-[188px] px-3 py-2 rounded-lg flex items-center border border-[#E7E7E7] gap-3 hover:shadow-sm transition"
                onClick={handleButtonClick}
                type="button"
              >
                <Upload size={18} />
                <p className="font-medium text-[#262626]">Upload Your Image</p>
                <input
                  ref={fileInputRef}
                  id="work-images-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleWorkFileChange}
                />
              </button>
            )}

            {workCroppedImages.length > 0 && (
              <div className="mt-4 pb-8 overflow-x-auto">
                <div className="flex gap-3 min-w-max sm:min-w-full">
                  {workCroppedImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-[150px] h-[150px] rounded-lg overflow-hidden border border-gray-200 shrink-0"
                    >
                      <img
                        src={img}
                        alt={`Uploaded ${index + 1}`}
                        onClick={() => onImageClick(index)} // Allow re-cropping
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