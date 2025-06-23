import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Form, Input, Select, Button, Modal, Drawer, message } from "antd";
import { IoClose } from "react-icons/io5";

// A simple hook to detect mobile screen sizes
const useBreakpoint = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

// Form content is now a separate component to be shared by Modal and Drawer
const AddStaffFormContent = ({ form, onFinish, onClose, allStaffData }) => {
  const navigate = useNavigate();

  // The onFinish handler now receives validated values directly from the form
  const handleFormFinish = (values) => {
    const tempStaffName = `Staff ${allStaffData.length + 1}`;

    console.log("Simulating SMS send for new staff:", values);
    message.success(`SMS with onboarding link sent to ${values.phoneNumber}!`);

    onClose(); // Close the modal/drawer

    // Navigate to the OTP verification page with the form data
    navigate("/onboard/verify-staff-otp", {
      state: { ...values, staffName: tempStaffName },
    });
  };

  const availableRoles = ["Owner / Manager", "Employee", "Receptionist"];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFormFinish}
      className="flex flex-col h-full font-['Golos_Text']"
    >
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-neutral-800 text-lg font-semibold">Add staff</h2>
        <button type="button" onClick={onClose} className="text-zinc-600 hover:text-zinc-800">
          <IoClose size={24} />
        </button>
      </div>

      {/* Form Fields */}
      <div className="px-6 py-4 flex-grow overflow-y-auto">
        <div className="space-y-4">
          <Form.Item
            label={<FormLabel label="Phone number" required />}
            name="phoneNumber"
            rules={[{ required: true, message: "Phone number is required." }]}
          >
            <Input placeholder="Phone" className="custom-input" />
          </Form.Item>

          <Form.Item
            label={<FormLabel label="Role" required/>}
            name="roles"
            rules={[{ required: true, message: "Please select at least one role." }]}
          >
            <Select
              mode="multiple"
              placeholder="Select"
              className="custom-input !text-primary01 !bg-[#F5F4FE]"
              options={availableRoles.map(role => ({ label: role, value: role }))}
            />
          </Form.Item>

          <Form.Item
            label={<FormLabel label="Job title" required />}
            name="jobTitle"
            rules={[{ required: true, message: "Job title is required."}]}
          >
            <Input placeholder="Title" className="custom-input" />
          </Form.Item>
        </div>
      </div>

      {/* Footer with Action Buttons */}
      <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 flex justify-end items-center gap-3">
        <Button onClick={onClose} className="btn-secondary">Cancel</Button>
        <Button type="primary" htmlType="submit" className="btn-primary !bg-black">Send SMS</Button>
      </div>
    </Form>
  );
};

const AddStaffModal = ({ onClose, onAddStaff, allStaffData }) => {
  const [form] = Form.useForm();
  const isMobile = useBreakpoint();

  // Render Drawer on mobile, Modal on desktop
  if (isMobile) {
    return (
      <Drawer
        open={true}
        onClose={onClose}
        placement="bottom"
        height="50%"
        closable={false}
        styles={{ body: { padding: 0 }, header: { display: 'none' } }}
        className="rounded-t-2xl"
      >
        <AddStaffFormContent form={form} onClose={onClose} allStaffData={allStaffData} />
      </Drawer>
    );
  }

  return (
    <Modal
      open={true}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      closable={false}
      styles={{ body: { padding: 0, maxHeight: '80vh' } }}
    >
      <AddStaffFormContent form={form} onClose={onClose} allStaffData={allStaffData} />
    </Modal>
  );
};

// Helper component for consistent form labels
const FormLabel = ({ label, required }) => (
  <span className="text-neutral-700 text-sm">
    {label}{required && <span className="text-red-500 ml-1">*</span>}
  </span>
);

export default AddStaffModal;