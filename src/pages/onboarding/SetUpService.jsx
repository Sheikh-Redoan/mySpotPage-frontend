import { Collapse, Space } from "antd";
import { useRef, useState } from "react";
import { imageProvider } from "../../lib/imageProvider";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setServiceData } from "../../redux/features/serviceSlice";
const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const SetUpService = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailName, setThumbnailName] = useState("");
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = {
      ...data,
      thumbnail,
    };
    console.log("Final Form Data:", formData);
    dispatch(setServiceData(formData));
    navigate("/onboard/service-table");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailName(file.name);
    }
  };

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };
  return (
    <div className="p-[40px]">
      <p className="text-[#866BE7] mb-2 font-medium">Step 3 of 3</p>
      <h1 className="text-[28px] font-semibold my-1">Set Up Service</h1>
      <p className="text-[#888888] pb-2.5">
        Choose where your business operates. This helps us show relevant
        settings.
      </p>

      <Space direction="vertical" className="w-full my-4 space-y-6">
        <Collapse
          expandIconPosition="end center"
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
              <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
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
                      <p className="text-gray-600 font-semibold my-2">
                        {thumbnailName || "Upload"}
                      </p>
                    </div>
                    <input
                      id="thumbnail"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                {/* Service Name */}
                <div className="mb-6">
                  <label className="block mb-2 text-base text-[##3A3B3F]">
                    Service Name <span className="text-orange-600">*</span>
                  </label>
                  <input
                    {...register("serviceName")}
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
                    {...register("description")}
                    type="text"
                    className="block w-full text-sm border border-gray-300 p-2 rounded-md"
                    placeholder="e.g. A haircut is a process of trimming, shaping, or styling hair to achieve a specific look."
                    required
                  />
                </div>

                {/* Available for  */}
                <div className="relative">
                  <label className="block mb-2 text-[#888888]">
                    Available for <span className="text-orange-600">*</span>
                  </label>
                  <select
                    {...register("availableFor")}
                    className="block text-sm w-full border border-gray-300 rounded-md p-2.5 appearance-none"
                    required
                  >
                    <option value="For Al">For all</option>
                    <option value="Female Only">Female Only</option>
                    <option value="Male Only">Male Only</option>
                  </select>
                  {/* Custom arrow */}
                  <div className="pointer-events-none absolute inset-y-0 top-8 right-3 flex items-center text-gray-600">
                    <ChevronDown />
                  </div>
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

      <div className="flex items-center justify-end gap-4 my-6 mx-5">
        <Link to={"/onboard/setup-services2"}>
          <button className="px-[18px] py-[8px] border font-medium border-[#242528] rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out hover:bg-[#f3f3f3] hover:shadow-md">
            Previous
          </button>
        </Link>

        <button
          type="button"
          onClick={handleExternalSubmit}
          className="px-[18px] py-[8px] font-medium rounded-lg hover:scale-95 transform transition-all duration-300 ease-in-out hover:shadow-md text-[#82868E] bg-[#E5E7E8] hover:bg-[#cccfd1]"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SetUpService;
