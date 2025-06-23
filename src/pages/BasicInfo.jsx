import { DatePicker, Modal, Select, Switch, Upload } from "antd";
import { useState } from "react";
import { useParams } from "react-router";
import {
  CalenderIcon,
  DownArrowIcon,
  ErrorIcon,
  ErrorIcon2,
  ImageIcon,
  InfoCircleOutlined,
  SearchIcon,
  UpdateIcon,
} from "../assets/icons/icons";
import Breadcrumb from "../components/client/Breadcrumb";
import { getBreadcrumbs } from "../lib/staticData";

const { Option } = Select;
const BasicInfo = () => {
  const { client } = useParams();
  const [fileList, setFileList] = useState([]); // Add this state for file uploads
  const [isBlackListed, setIsBlackListed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleGenderChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleDateChange = (date, dateString) => {
    console.log(dateString);
  };

  const handleCityChange = (value) => {
    console.log("Selected phone number:", value);
  };

  const onSwitchChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  // Handler for image upload
  const onImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // You can also add logic here to upload the file to your backend
    // For now, it just updates the state and logs the file.
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      console.log("Uploaded file:", newFileList[0].originFileObj);
      // If you have an image URL after upload, you can store it in another state
    }
  };

  // Before upload validation (optional)
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      // message.error('You can only upload JPG/PNG file!'); // You might want to use Ant Design's message for feedback
      alert("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      // message.error('Image must smaller than 2MB!');
      alert("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  // Custom upload request (optional, if you want to handle upload manually)
  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok"); // Simulate successful upload
      // In a real application, you would send 'file' to your server here
      // and call onSuccess or onError based on the server response.
    }, 1000);
  };

  return (
    <div>
      <Breadcrumb
        breadcrumbs={getBreadcrumbs(0, 3, [
          {
            name: "Client Management",
            link: "/dashboard/client-management",
          },
          {
            name: client?.split("-").join(" "),
            link: "",
          },
          {
            name: "Basic Information",
            link: `/dashboard/client-management/${client}/basic-info`,
          },
        ])}
      />
      <div className="bg-white p-6 max-w-[540px] rounded-xl mx-auto border border-[#E7E7E7]">
        <div className="text-[#3A3B3F] flex flex-col justify-center h-full  space-y-5 text-sm basic-info">
          {/* Modified Upload component with styling */}
          <div className="flex justify-center relative mx-auto w-[100px] h-[100px]">
            <Upload
              className="avatar-upload"
              listType="picture-circle"
              fileList={fileList}
              onChange={onImageChange}
              beforeUpload={beforeUpload}
              customRequest={customRequest}
              maxCount={1}
              showUploadList={{
                showPreviewIcon: false,
                showRemoveIcon: false,
                showDownloadIcon: false,
              }}
            >
              {fileList.length === 0 ? (
                <div className="relative size-20 rounded-full bg-[#F6F6F6] flex justify-center items-center">
                  <ImageIcon />
                  <div className="absolute -right-1 bottom-0 size-7 rounded-full border border-white bg-[#F5F4FE] flex items-center justify-center">
                    <UpdateIcon />
                  </div>
                </div>
              ) : null}
            </Upload>
          </div>

          {isBlackListed && (
            <div className="flex md:items-center gap-2 bg-[#FFE6E6] py-2 px-3 rounded-lg">
              <ErrorIcon className="size-6" />
              <p className="text-[#ED4245] text-xs md:text-base">
                This client is blacklisted and cannot book appointments.
              </p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <fieldset className="">
              <label htmlFor="firstName" className="block w-fit mb-1">
                First Name <span className="text-[#ED4245]">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                className="border border-[#E0E0E0] rounded-lg px-3 h-10 w-full"
                placeholder="First name"
              />
            </fieldset>
            <fieldset className="">
              <label htmlFor="lastName" className="block w-fit mb-1">
                Last name <span className="text-[#ED4245]">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                className="border border-[#E0E0E0] rounded-lg px-3 w-full h-10"
                placeholder="Last name"
              />
            </fieldset>
          </div>

          <fieldset>
            <label htmlFor="gender" className="block w-fit mb-1">
              Gender <span className="text-[#ED4245]">*</span>
            </label>
            <Select
              id="gender"
              onChange={handleGenderChange}
              placeholder="Select Gender"
              className="border border-[#E0E0E0] rounded-lg w-full !h-10"
              suffixIcon={<DownArrowIcon />}
            >
              {["Male", "Female", "Others"].map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </fieldset>

          <fieldset>
            <label htmlFor="dob" className="block w-fit mb-1">
              DOB <span className="text-[#ED4245]">*</span>
            </label>
            <DatePicker
              id="dob"
              onChange={handleDateChange}
              className="w-full !h-10 border border-[#E0E0E0] rounded-lg"
              placeholder="dd/mm/yyyy"
              suffixIcon={<CalenderIcon />}
              format="YYYY-MM-DD"
            />
          </fieldset>

          <fieldset className="">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="phoneNumber" className="block w-fit">
                Phone number <span className="text-[#ED4245]">*</span>
              </label>
              {isBlackListed && (
                <div
                  className="flex items-center gap-1"
                  onClick={() => setIsBlackListed(false)}
                >
                  <p className="text-[#ED4245] font-medium">Unverified</p>
                  <InfoCircleOutlined className="size-5" />
                </div>
              )}
            </div>
            <input
              type="text"
              id="phoneNumber"
              className="border border-[#E0E0E0] rounded-lg px-3 h-10 w-full"
              placeholder="Phone number"
            />
          </fieldset>

          <fieldset className="">
            <label htmlFor="city" className="block w-fit mb-1">
              City <span className="text-[#ED4245]">*</span>
            </label>
            <Select
              id="city"
              showSearch
              placeholder="Search city"
              optionFilterProp="children"
              className="border border-[#E0E0E0] rounded-lg w-full !h-10"
              onChange={handleCityChange}
              suffixIcon={<SearchIcon />}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {["Jerusalem, Israel", "Tel Aviv, Israel", "Haifa, Israel"].map(
                (phone) => (
                  <Option key={phone} value={phone}>
                    {phone}
                  </Option>
                )
              )}
            </Select>
          </fieldset>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
            <fieldset className="flex items-center gap-2">
              <Switch onChange={onSwitchChange} id="isVip" />
              <label htmlFor="isVip" className="">
                Mark as VIP Client
              </label>
            </fieldset>
            {!isBlackListed && (
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <InfoCircleOutlined className="size-5" />
                <p className="text-[#ED4245] font-semibold">Add to blacklist</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        title="Notification"
        closable={false}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={420}
        centered
      >
        <div className="mt-4 font-golos">
          <hr className="text-border mb-4"/>
          <div className="size-11 bg-[#FBD9DA] rounded-full flex items-center justify-center mx-auto mb-3">
            <ErrorIcon2 className="size-5" />
          </div>
          <div className="text-center">
            <p className="text-[#262626] text-base font-semibold mb-1">
              Add Client to Blacklist?
            </p>
            <p className="text-[#797979]">
              Are you sure you want to add this client to the blacklist? This
              action will prevent them from making future bookings.
            </p>
          </div>
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              className="flex-1 cursor-pointer border border-[#242528] py-2 px-3 text-[#242528] rounded-lg font-semibold"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 cursor-pointer bg-[#ED4245] py-2 px-3 text-white rounded-lg font-semibold"
              onClick={() => {
                setIsBlackListed(true);
                setIsModalOpen(false);
              }}
            >
              Yes, confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BasicInfo;
