import { Button, Tabs } from "antd";
import { PlusIcon } from "./../assets/icons/icons";
import { useState } from "react";
import ClientTable from "../components/DashboardPageComponents/shared/ClientTable";
import AddClientModal from "../components/DashboardPageComponents/shared/AddClientModal";
import useResponsive from "../hooks/useResponsive";
import AddClientDrowar from "../components/DashboardPageComponents/shared/AddClientDrowar";

const items = [
  {
    key: "1",
    label: "All Clients",
  },
  {
    key: "2",
    label: "VIP Clients",
  },
  {
    key: "3",
    label: "Blacklisted Clients", // Assuming you'll add a 'blacklisted' property to client data
  },
];

function ClientPage() {
  const [tabKey, setTabKey] = useState("1");
  const [step, setStep] = useState(1);
  const [fileList, setFileList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { md, lg } = useResponsive();
  const [openDrowar, setOpenDrowar] = useState(false)

  const onChange = (key) => {
    console.log(typeof key);
    setTabKey(key);
  };



  const handleGenderChange = (value) => {
    console.log(`selected gender: ${value}`);
  }

  const handleDateChange = (date, dateString) => {
    console.log("Selected DOB:", dateString);
  };

  const handleCityChange = (value) => {
    console.log("Selected city:", value);
  };

  const onSwitchChange = checked => {
    console.log(`Mark as VIP Client: ${checked}`);
  };

  // Handler for image upload
  const onImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // You can also add logic here to upload the file to your backend
    // For now, it just updates the state and logs the file.
    if (newFileList.length > 0 && newFileList[0].status === 'done') {
      console.log('Uploaded file:', newFileList[0].originFileObj);
      // If you have an image URL after upload, you can store it in another state
    }
  };

  // Before upload validation (optional)
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      // message.error('You can only upload JPG/PNG file!'); // You might want to use Ant Design's message for feedback
      alert('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      // message.error('Image must smaller than 2MB!');
      alert('Image must smaller than 2MB!');
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

  const handleCancel = () => {
    setIsModalOpen(false);
    setStep(1); // Reset step when modal is closed
    setFileList([]); // Clear uploaded image when modal is closed
  };

  return (
    <div className="w-full p-3 md:p-5">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          className="custom-client-tabs"
        />

        <button
          type="button"
          onClick={() => {
            setIsModalOpen(true)
            setOpenDrowar(true)
          }}
          className="w-full md:w-[150px] inline-flex items-center justify-center px-3 py-2 gap-2 text-sm font-semibold text-white bg-primary01 border border-primary01 rounded-lg hover:bg-primary01 focus:outline-none focus:ring-2 focus:ring-primary01 focus:ring-offset-2"
        >
          <PlusIcon />
          Add Client
        </button>
      </div>



      {/* Pass tabKey as a prop */}
      <ClientTable activeTabKey={tabKey} />

      {(md || lg) ?
        <>
          <AddClientModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setStep={setStep}
            step={step}
            fileList={fileList}
            setFileList={setFileList}
            handleGenderChange={handleGenderChange}
            handleDateChange={handleDateChange}
            handleCityChange={handleCityChange}
            onSwitchChange={onSwitchChange}
            onImageChange={onImageChange}
            beforeUpload={beforeUpload}
            customRequest={customRequest}
            handleCancel={handleCancel}
          />
        </>
        :
        <>
          <AddClientDrowar
            openDrowar={openDrowar}
            setOpenDrowar={setOpenDrowar}
            setStep={setStep}
            step={step}
            fileList={fileList}
            setFileList={setFileList}
            handleGenderChange={handleGenderChange}
            handleDateChange={handleDateChange}
            handleCityChange={handleCityChange}
            onSwitchChange={onSwitchChange}
            onImageChange={onImageChange}
            beforeUpload={beforeUpload}
            customRequest={customRequest}
          />
        </>}

    </div>
  );
}

export default ClientPage;
