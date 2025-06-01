import { Form, Input } from "antd";
import { useState } from "react";

export default function AddressForm() {
  const [form] = Form.useForm();
  const [address, setAddress] = useState("");
  const onChange = ({ address }) => {
    setAddress(address);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const CustomLabel = ({ label, required }) => (
    <span>
      {label} {required && <span style={{ color: "red" }}>*</span>}
    </span>
  );

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ address }}
      onValuesChange={onChange}
      onFinish={onFinish}>
      <Form.Item
        label={<CustomLabel label="Address" required />}
        rules={[
          {
            required: true,
            message:
              "This provider does not serve your location. Please choose another provider or check service availability.",
          },
        ]}>
        <Input placeholder="Your address" className="!py-2" />
      </Form.Item>
    </Form>
  );
}
