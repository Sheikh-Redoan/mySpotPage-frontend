import { Button, Form, Input, Modal, Select } from "antd";
import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function AddAccount() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = (values) => {
    setConfirmLoading(true);
    setTimeout(() => {
      const phoneNumber = parsePhoneNumber(values.phone, "IL");
      values.phone = phoneNumber.format("E.164");
      console.log("Success:", { values });

      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const showModal = () => {
    setOpen(true);
  };

  const CustomLabel = ({ label, required }) => (
    <span>
      {label} {required && <span style={{ color: "red" }}>*</span>}
    </span>
  );

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <Plus size={16} /> Add account
      </Button>
      <Modal
        centered
        open={open}
        maskClosable={false}
        width={360}
        onCancel={() => setOpen(false)}
        footer={null}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          autoComplete="off">
          <Form.Item
            name="phone"
            required={false}
            label={<CustomLabel label="Phone number" required />}
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                message: "Please enter a valid phone number!",
                validator: (_, value) => {
                  if (value && !isValidPhoneNumber(value, "IL")) {
                    return Promise.reject("Phone number must be valid");
                  }
                  return Promise.resolve(value);
                },
              },
            ]}>
            <Input type="tel" placeholder="Your address" className="!py-2" />
          </Form.Item>

          <Form.Item
            name="role"
            required={false}
            label={<CustomLabel label="Role" required />}
            rules={[
              {
                required: true,
                message: "Please select role!",
              },
            ]}>
            <Select
              size="large"
              placeholder="Select role"
              options={[
                { value: "admin", label: "Admin" },
                { value: "super_admin", label: "Super Admin" },
              ]}
            />
          </Form.Item>
          <Form.Item label={null}>
            <Button
              loading={confirmLoading}
              type="primary"
              htmlType="submit"
              block // Makes the button full width
              className="text-xs"
              size="large">
              Send SMS
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
