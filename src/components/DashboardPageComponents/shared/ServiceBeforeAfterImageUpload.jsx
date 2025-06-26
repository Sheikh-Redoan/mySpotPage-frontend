import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
import { X, Plus, Upload } from "lucide-react"; // Assuming Upload icon is used
import { Check } from "lucide-react";

// Note the change in props: `onInitiateUpload` replaces `onChangeImage`
const ServiceBeforeAfterImageUpload = ({
  imagePairs,
  onAddPair,
  onInitiateUpload, // <-- New Prop
  onRemoveImage,
  onCropImage, // For re-cropping
}) => {
  return (
    <div className="mb-10">
      <Collapse expandIconPosition="end" className="custom-collapse" bordered={false}>
        <Panel
          key="3"
          header={
            <div className="flex items-center gap-x-3">
              <div
                className={`w-10 h-10 flex justify-center items-center border rounded-full font-bold transition-all duration-200 ${
                  imagePairs.length > 0 &&
                  imagePairs.every((pair) => pair.before !== null && pair.after !== null)
                    ? "bg-[#262626] text-white "
                    : "border p-4 text-[#262626]"
                }`}
              >
                {imagePairs.length > 0 &&
                imagePairs.every((pair) => pair.before !== null && pair.after !== null) ? (
                  <Check className="w-6 h-6" />
                ) : (
                  "3"
                )}
              </div>
              <span className="text-[#262626] font-semibold text-base md:text-xl">
                Upload Before & After Images
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
              Add up to 5 pairs of images to showcase your work.
            </h2>
            <div className="flex gap-5 overflow-x-auto">
              {imagePairs.map((pair, index) => (
                <div key={index} className="mb-6 relative flex gap-3 items-center mt-3 w-80">
                  {["before", "after"].map((type) => (
                    <div key={type} className="flex flex-col">
                      {pair[type] ? (
                        // This part is for DISPLAYING the cropped image
                        <div className="relative w-36">
                          <img
                            onClick={() => onCropImage(index, type)} // Allows re-cropping
                            src={pair[type]}
                            alt="Uploaded"
                            className="w-full h-40 rounded-lg object-cover cursor-pointer"
                          />
                          <button
                            type="button"
                            onClick={() => onRemoveImage(index, type)}
                            className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 group hover:bg-primary01 hover:border-primary01"
                          >
                            <X className="w-5 h-5 text-[#866BE7] group-hover:scale-105 transform transition-all duration-100 group-hover:text-white" />
                          </button>
                          <p className="text-center mt-3 capitalize">{type}</p>
                        </div>
                      ) : (
                        // This part is the UPLOAD placeholder
                        <div className="flex flex-col">
                          <div
                            onClick={() => onInitiateUpload(index, type)} // <-- KEY CHANGE
                            className="w-36 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-8 rounded-lg cursor-pointer hover:border-[#866BE7] transition-all text-center h-40"
                          >
                            <div className="flex flex-col items-center">
                              <Upload className="text-gray-500"/>
                              <p className="text-gray-600 font-semibold my-2">Upload</p>
                            </div>
                          </div>
                           <p className="text-center mt-3 capitalize">{type}</p>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Plus icon for adding a new pair */}
                  {index === imagePairs.length - 1 && imagePairs.length < 5 && (
                    <div
                      onClick={onAddPair}
                      className="bg-primary01 absolute -right-12 top-[34%] h-10 w-10 p-2 rounded-full text-white cursor-pointer"
                    >
                      <Plus />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ServiceBeforeAfterImageUpload;