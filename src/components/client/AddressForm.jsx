import { Form, Input } from "antd";
import { useState } from "react";

export default function AddressForm() {
  const [form] = Form.useForm();
  const [address, setAddress] = useState("");
  const onChange = ({ address }) => {
    setFormLayout(address);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ address }}
      onValuesChange={onChange}>
      <Form.Item label="Address">
        <Input placeholder="Enter your address" />
      </Form.Item>
    </Form>
  );
}
