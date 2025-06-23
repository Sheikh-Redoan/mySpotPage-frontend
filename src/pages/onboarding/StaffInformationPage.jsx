import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Form, Input, Button, DatePicker, Radio, Upload, message, Row, Col } from "antd";
import dayjs from "dayjs";

// Replaced inline SVGs with imports from the 'react-icons' library
import { GoChevronRight } from "react-icons/go";
import { IoCameraOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
// import { LoadingOutlined } from '@ant-design/icons';


const StaffInformationPage = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    phoneNumber: initialPhoneNumber,
    roles,
    jobTitle,
    staffName: passedStaffName,
  } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");

  // Set initial form values when the component loads with state
  useEffect(() => {
    if (!initialPhoneNumber || !roles || !jobTitle) {
      setError("Missing initial staff data from the previous step. Please go back and try again.");
      return;
    }
    form.setFieldsValue({
      firstName: passedStaffName || "",
      phoneNumber: initialPhoneNumber || "",
    });
  }, [initialPhoneNumber, roles, jobTitle, form, passedStaffName]);


  // Handle form submission with validation
  const onFinish = (values) => {
    if (!imageUrl) {
      message.error("Please upload a profile image.");
      return;
    }

    // Consolidate data and navigate to the next step
    const staffBasicInfo = {
      ...values,
      profileImage: imageUrl,
      dateOfBirth: values.dateOfBirth.format('DD/MM/YYYY'), // Ensure date is a consistent string format
      // Carry over data from the previous step
      roles,
      jobTitle,
    };

    console.log("Staff Basic Information Collected:", staffBasicInfo);
    navigate("/onboard/services-settings", { state: staffBasicInfo });
  };

  // Handle image upload logic
  const handleImageChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        form.setFieldsValue({ profileImage: url }); // Set value to satisfy Form.Item validation
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? "<LoadingOutlined />" : <IoCameraOutline size={24} className="text-gray-400" />}
      <div style={{ marginTop: 8, color: '#8c8c8c' }}>Upload</div>
    </button>
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-['Golos_Text']">
        <div className="w-96 p-6 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <Button type="primary" onClick={() => navigate("/seller-management")} className="mt-6">Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-['Golos_Text']">
      <div className="w-full max-w-[722px] flex flex-col gap-4">
        {/* Breadcrumbs */}
        <div className="self-stretch flex flex-wrap items-center gap-2 px-4 sm:px-0">
          <span className="text-gray-950 text-sm font-semibold">Basic information</span>
          <GoChevronRight className="text-gray-400" />
          <span className="text-gray-400 text-sm">Services settings</span>
          <GoChevronRight className="text-gray-400" />
          <span className="text-gray-400 text-sm">Working shift settings</span>
          <GoChevronRight className="text-gray-400" />
          <span className="text-gray-400 text-sm">Security</span>
        </div>

        {/* Main Form Container */}
        <div className="w-full p-8 bg-white rounded-xl border border-gray-200">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <div className="space-y-6">
              <Form.Item
                label={<FormLabel label="Profile image" required />}
                name="profileImage"
                valuePropName="file" // Required for Upload component in a Form
                rules={[{ required: true, message: 'Profile image is required.' }]}
              >
                 <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    customRequest={({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                    beforeUpload={beforeUpload}
                    onChange={handleImageChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" className="w-full h-full object-cover rounded-full" /> : uploadButton}
                  </Upload>
              </Form.Item>

              <div>
                    <Form.Item label={<FormLabel label="First name" required />} name="firstName" rules={[{ required: true }]}>
                  <div className="w-full">
                    <Input placeholder="First name" className="custom-input !w-full"/>
                  </div>
                  </Form.Item>
                    <Form.Item label={<FormLabel label="Last name" required />} name="lastName" rules={[{ required: true }]}>
                  <div className="w-full">
                    <Input placeholder="Last name" className="custom-input !w-full"/>
                  </div>
                  </Form.Item>
              </div>
              <div>

                  <Form.Item label={<FormLabel label="Phone number" required />} name="phoneNumber" rules={[{ required: true }]}>
                    <Input placeholder="(+1) 234 567 890" className="custom-input"/>
                  </Form.Item>
                  <Form.Item label={<FormLabel label="Date of birth" required />} name="dateOfBirth" rules={[{ required: true }]}>
                    <DatePicker suffixIcon={<LuCalendarDays />} format="DD/MM/YYYY" placeholder="DD/MM/YYYY" className="custom-input w-full" />
                  </Form.Item>
              </div>

              <Form.Item label={<FormLabel label="Gender" required />} name="gender" rules={[{ required: true }]}>
                <Radio.Group className="flex gap-4">
                  <Radio value="Male" className="custom-radio">Male</Radio>
                  <Radio value="Female" className="custom-radio">Female</Radio>
                  <Radio value="Other" className="custom-radio">Other</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            
            <div className="flex justify-end pt-8">
              <Button type="primary" htmlType="submit" className="btn-primary">
                Continue
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components & Functions ---
const FormLabel = ({ label, required }) => (
  <span className="text-neutral-700 text-sm">
    {label}{required && <span className="text-red-500 ml-1">*</span>}
  </span>
);

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must be smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export default StaffInformationPage;