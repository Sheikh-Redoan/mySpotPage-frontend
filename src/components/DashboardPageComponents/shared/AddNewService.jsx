import { Checkbox, Collapse, Select, Space } from "antd";
const { Panel } = Collapse;
import { ArrowLeft, ChevronDown, Minus, Plus, Upload, X } from "lucide-react";
import { imageProvider } from "../../../lib/imageProvider";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { DownArrowIcon, PlusIcon } from "../../../assets/icons/icons";
import { DeleteIcon } from "../../../assets/icons/icons2";
import AvatarEditor from "react-avatar-editor";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const AddNewService = ({ setAddNewService }) => {
  const { register, handleSubmit } = useForm({ mode: "onChange" });
  const [thumbnailName, setThumbnailName] = useState("");
  const [priceModal1, setPriceModal1] = useState(false);
  const [priceModal2, setPriceModal2] = useState(false);

  const [image, setImage] = useState(null);
  const [editorImage, setEditorImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgSclaeValue, setImgSclaeValue] = useState(1.2);
  const editorRef = useRef(null);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setEditorImage(imageURL);
      setImage(imageURL);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleCropFinish = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImage = canvas.toDataURL();

      setImage(croppedImage);
      setIsModalOpen(false);
    }
  };
  const priceCheckboxChange1 = (e) => {
    setPriceModal1(e.target.checked);
  };
  const priceCheckboxChange2 = (e) => {
    setPriceModal2(e.target.checked);
  };
  return (
    <div className="w-full p-5">
      <div className="flex justify-between items-center">
        <div
          onClick={() => setAddNewService(false)}
          className="flex items-center gap-1.5"
        >
          <ArrowLeft />
          <p className="text-[#242528] text-lg font-semibold">New Service</p>
        </div>
        <button
          type="button"
          className="text-[#82868E] font-semibold bg-[#E5E7E8] py-2.5 w-20 rounded-lg cursor-pointer hover:scale-95 transform transition-all duration-300 ease-in-out"
        >
          Publish
        </button>
      </div>
      <div>
        <Space direction="vertical" className="w-full my-4 space-y-6">
          <Collapse
            expandIconPosition="end center"
            defaultActiveKey={["1"]}
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
                  <div className="w-10 h-10 flex justify-center items-center border p-4 rounded-full  text-[#262626] font-bold">
                    1
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
                          onClick={() => setIsModalOpen(true)}
                          src={image}
                          alt="Uploaded"
                          className="w-full h-[140px] rounded-lg object-cover"
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

                  <div className="flex items-center gap-8 w-full">
                    {/* Service Name */}
                    <div className="mb-6 w-[440px]">
                      <label className="block mb-2 text-base text-[##3A3B3F]">
                        Service Name <span className="text-orange-600">*</span>
                      </label>
                      <input
                        {...register("serviceName", { required: true })}
                        type="text"
                        className="block w-full text-sm border border-gray-300 p-2 rounded-md"
                        placeholder="e.g Hair cut"
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-6 flex-1">
                      <label className="block mb-2 text-base text-[##3A3B3F]">
                        Description<span className="text-orange-600">*</span>
                      </label>
                      <input
                        {...register("description", { required: true })}
                        type="text"
                        className="block w-full text-sm border border-gray-300 p-2 rounded-md"
                        placeholder="e.g. A haircut is a process of trimming, shaping, or styling hair to achieve a specific look."
                      />
                    </div>
                  </div>

                  {/* Available for  */}
                  <div className="relative  w-[440px]">
                    <label className="block mb-2 text-[#888888]">
                      Available for <span className="text-orange-600">*</span>
                    </label>
                    <Select
                      id="gender"
                      placeholder="For All"
                      className="border border-[#E0E0E0] rounded-lg w-full !h-10"
                      suffixIcon={<DownArrowIcon />}
                    >
                      {["For All", "For Women", "For Men"].map((city) => (
                        <Option key={city} value={city}>
                          {city}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </form>
              </div>
            </Panel>
          </Collapse>

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
                    <div className="ml-4 md:ml-12 flex items-center gap-x-6 gap-y-3">
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
                  )}
                </div>
                <div className="flex items-center gap-2 p-2 text-[#744CDB] rounded-lg mt-2">
                  <Plus size={20} className="text-[#744CDB]" />
                  <p className="text-[15px] font-semibold">Add More Option</p>
                </div>
              </div>
            </Panel>
          </Collapse>

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

                <button className="w-[188px] px-3 py-2 rounded-lg flex items-center border border-[#E7E7E7] gap-3">
                  <Upload size={18} />
                  <p className="font-medium text-[#262626]">
                    Upload Your Image
                  </p>
                </button>
              </div>
            </Panel>
          </Collapse>
        </Space>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#111113cc] flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-3xl">
            {/* Header */}
            <div className="flex justify-between items-center py-6 px-6">
              <h3 className="text-xl font-semibold text-[#242528]">
                Crop image
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-6 h-6 text-[#52555B] hover:scale-105 hover:text-[#3c3e42]" />
              </button>
            </div>

            {/* Avatar Editor */}
            <div className="flex justify-center items-center py-2">
              <div
                onWheel={(e) => {
                  e.preventDefault();
                  const delta = e.deltaY;

                  setImgSclaeValue((prev) => {
                    let newScale = prev + (delta > 0 ? -0.05 : 0.05);
                    newScale = Math.min(Math.max(newScale, 0.5), 3);
                    return newScale;
                  });
                }}
              >
                <AvatarEditor
                  ref={editorRef}
                  image={editorImage}
                  width={718}
                  height={450}
                  scale={imgSclaeValue}
                  rotate={0}
                  color={[255, 255, 255, 0.6]}
                  className="object-contain w-full max-h-[70vh]"
                />
              </div>
            </div>

            {/* Finish Button */}
            <div className="flex justify-end my-3 pr-6">
              <button
                onClick={handleCropFinish}
                className="text-[#242528] cursor-pointer hover:text-[#141516] hover:font-semibold font-medium text-lg py-2"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewService;
