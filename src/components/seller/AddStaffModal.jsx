import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Input, Select, Button, Modal, Drawer, message, Checkbox, Radio } from "antd";
import { IoClose, IoChevronDown } from "react-icons/io5";
import { PlusIcon } from "lucide-react";
import useResponsive from "../../hooks/useResponsive";

const availableRoles = ["Owner / Manager", "Employee", "Receptionist"];

const RoleSelectorInDrawer = ({ value = [], onChange }) => {
  const [isRoleDrawerVisible, setIsRoleDrawerVisible] = useState(false);

  const openDrawer = (e) => {
    e.stopPropagation();
    setIsRoleDrawerVisible(true);
  };
  const closeDrawer = () => setIsRoleDrawerVisible(false);

  return (
    <>
      <div
        onClick={openDrawer}
        className="ant-input custom-input !text-primary01 cursor-pointer border p-1 rounded-[5px] border-[#7c787871] flex items-center justify-between"
        style={{ height: 'auto', minHeight: '38px' }}
      >
        {value.length > 0 ? value.join(', ') : <span className="text-gray-400/80 ">Select roles</span>}
        <IoChevronDown className="text-description" />
      </div>
      
      <Drawer
        placement="bottom"
        closable={false}
        title="Select Roles"
        extra={
          <Button type="text" onClick={closeDrawer} className="!px-0">
            <IoClose size={24} className="text-description" />
          </Button>
        }
        height="50%"
        onClose={closeDrawer}
        open={isRoleDrawerVisible}
        className="rounded-t-xl"
        bodyStyle={{ padding: '24px' }}
      >
        <Checkbox.Group
          style={{ width: '100%' }}
          value={value}
          onChange={onChange}
        >
          <div className="flex flex-col gap-4">
            {availableRoles.map(role => (
              <Checkbox key={role} value={role} className="text-base">
                {role}
              </Checkbox>
            ))}
          </div>
        </Checkbox.Group>
        <Button
          type="primary"
          onClick={closeDrawer}
          className="btn-primary !bg-black w-full mt-6"
        >
          Confirm Selection
        </Button>
      </Drawer>
    </>
  );
};

const AddStaffFormContent = ({ form, onClose, allStaffData }) => {
  const navigate = useNavigate();
  const { md } = useResponsive();

  const handleFormFinish = (values) => {
    const tempStaffName = `Staff ${allStaffData.length + 1}`;
    message.success(`SMS with onboarding link sent to ${values.phoneNumber}!`);
    onClose();
    navigate("/onboard/verify-staff-otp", {
      state: { ...values, staffName: tempStaffName },
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFormFinish} className="flex flex-col h-full">
      <div className="flex-shrink-0 px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-neutral-800 text-lg font-semibold">Add staff</h2>
        <Button type="text" onClick={onClose} className="!px-0">
          <IoClose size={24} className="text-description" />
        </Button>
      </div>

      <div className="px-6 py-4 flex-grow overflow-y-auto">
        <div className="space-y-4">
          <Form.Item 
            label={<span className="text-neutral-700 text-sm">Phone number <span className="text-red-500">*</span></span>} 
            name="phoneNumber" 
            rules={[{ required: true, message: "Phone number is required." }]}
          >
            <Input placeholder="Phone" className="custom-input" />
          </Form.Item>

          <Form.Item 
            label={<span className="text-neutral-700 text-sm">Role <span className="text-red-500">*</span></span>} 
            name="roles" 
            rules={[{ required: true, message: "Please select at least one role." }]}
          >
            {md ? (
              <Select
                mode="multiple"
                placeholder="Select"
                className="custom-input !text-primary01"
                options={availableRoles.map(role => ({ label: role, value: role }))}
                suffixIcon={<IoChevronDown className="text-description" />}
              />
            ) : (
              <RoleSelectorInDrawer />
            )}
          </Form.Item>

          <Form.Item 
            label={<span className="text-neutral-700 text-sm">Job title <span className="text-red-500">*</span></span>} 
            name="jobTitle" 
            rules={[{ required: true, message: "Job title is required." }]}
          >
            <Input placeholder="Title" className="custom-input" />
          </Form.Item>
        </div>
      </div>

      <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 flex justify-end items-center gap-3 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] fixed bottom-0 right-0 w-full">
        <Button onClick={onClose} className="btn-secondary">Cancel</Button>
        <Button type="primary" htmlType="submit" className="btn-primary !bg-black">Send SMS</Button>
      </div>
    </Form>
  );
};

const AddStaffModal = ({ onClose, allStaffData }) => {
  const [form] = Form.useForm();
  const { md } = useResponsive();

  if (!md) {
    return (
      <Drawer
        placement="bottom"
        closable={false}
        height="75%"
        onClose={onClose}
        open={true}
        className="rounded-t-xl"
        bodyStyle={{ padding: 0, overflow: 'hidden' }}
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

export default AddStaffModal;