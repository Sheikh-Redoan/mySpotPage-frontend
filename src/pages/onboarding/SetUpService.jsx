import { Collapse, Space, Upload } from "antd";
import React from "react";
import { imageProvider } from "../../lib/imageProvider";
const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const SetUpService = () => {
  return (
    <div className="p-[40px] overflow-y-auto">
      <p className="text-[#866BE7] mb-2 font-medium">Step 3 of 3</p>
      <h1 className="text-[28px] font-semibold my-1">Set Up Service</h1>
      <p className="text-[#888888] pb-2.5">
        Choose where your business operates. This helps us show relevant
        settings.
      </p>

      <Space direction="vertical" className="w-full my-4 space-y-6">
        <Collapse
          expandIconPosition="end"
          defaultActiveKey={["1"]}
          className="custom-collapse"
        >
          <Panel
            key="1"
            header={
              <div className="flex items-center gap-x-3">
                <div className="w-10 h-10 flex justify-center items-center border p-4 rounded-full bg-[#f7f6f9] text-[#262626] font-bold">
                  1
                </div>
                <span className="text-[#242528] font-medium text-xl">
                  Basic Details
                </span>
              </div>
            }
            className="rounded-lg p-0 mb-1 overflow-hidden"
          >
            <div className="ml-14.5">
              <form>
                {/* image uploader */}
                <label className="block mb-2 text-base text-[#3A3B3F]">
                  Thumbnail <span className="text-orange-600">*</span>
                </label>
                <div className="mb-6 flex">
                  <label
                    htmlFor="thumbnail"
                    className="w-full max-w-38 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-8 rounded-lg cursor-pointer hover:border-[#866BE7] transition-all text-center"
                  >
                    <div className="flex flex-col items-center">
                      <img src={imageProvider.upload} alt="Image" />
                      <p className="text-gray-600 font-semibold my-2">Upload</p>
                    </div>
                    <input
                      id="thumbnail"
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Service Name */}
                <div className="mb-6">
                  <label className="block mb-2 text-base text-[##3A3B3F]">
                    Service Name <span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="block w-full text-sm border border-gray-300 p-2 rounded-md"
                    placeholder="e.g Hair cut"
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block mb-2 text-base text-[##3A3B3F]">
                    Description<span className="text-orange-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="block w-full text-sm border border-gray-300 p-2 rounded-md"
                    placeholder="e.g. A haircut is a process of trimming, shaping, or styling hair to achieve a specific look."
                    required
                  />
                </div>

                {/* Available for  */}
                <div className="mx-2">
                  <label className="block mb-2 text-[#888888]">
                    Available for <span className="text-orange-600">*</span>
                  </label>
                  <select
                    className="block text-sm w-full border border-gray-300 rounded-md p-2"
                    required
                  >
                    <option value="">For all</option>
                    <option value="customer">Customer</option>
                    <option value="product">Product</option>
                  </select>
                </div>
              </form>
            </div>
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="end" className="custom-collapse">
          <Panel
            key="2"
            header={
              <div className="flex items-center gap-x-2">
                <div className="w-10 h-10 flex justify-center items-center border p-4 rounded-full bg-[#f7f6f9] text-[#262626] font-bold">
                  2
                </div>
                <span className="text-[#242528] text-xl font-medium">
                  Price Settings
                </span>
              </div>
            }
            className="rounded-lg p-0 mb-1 overflow-hidden"
          >
            <div>
              <p>{text}</p>
            </div>
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="end" className="custom-collapse">
          <Panel
            key="3"
            header={
              <div className="flex items-center gap-x-2">
                <div className="w-10 h-10 flex justify-center items-center border p-4 rounded-full bg-[#f7f6f9] text-[#262626] font-bold">
                  3
                </div>
                <span className="text-[#242528] text-xl font-medium">
                  Upload Image of Your Work
                </span>
              </div>
            }
            className="rounded-lg p-0 mb-1 overflow-hidden"
          >
            <div>
              <p>{text}</p>
            </div>
          </Panel>
        </Collapse>
      </Space>
    </div>
  );
};

export default SetUpService;
