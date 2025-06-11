import { Button, Input, Form } from "antd"; 
import { Popover } from "antd";
import { Radio } from "antd";
import { Modal } from "antd";
import { Switch } from "antd";
import { CircleAlert } from "lucide-react";
import { useState } from "react";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const SettingsBookingsRulesModal = ({
  settingsModalOpen,
  setSettingsModalOpen,
}) => {
  const [form] = Form.useForm(); 
  const [isAutoConfirm, setIsAutoConfirm] = useState(false);
  const [manualLimit, setManualLimit] = useState("");

  const handleManualLimit = (e) => {
    console.log("manual limit", e.target.value);
    setManualLimit(e.target.value);
  };

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values);
      console.log("isAutoConfirm", isAutoConfirm);
      console.log("manualLimit", manualLimit);
      setSettingsModalOpen(false);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  return (
    <Modal
      open={settingsModalOpen}
      onCancel={() => setSettingsModalOpen(false)}
      footer={() => (
        <div className="flex justify-end gap-2">
          <Button
            color="default"
            variant="text"
            onClick={() => setSettingsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button color="default" variant="solid" onClick={handleModalSubmit}>
            Save
          </Button>
        </div>
      )}
      closable={true}
      className="!rounded-2xl !max-w-xl z-50"
      centered
    >
      <div className="mb-8">
        <h3 className="text-[#242528] text-[18px] font-semibold">Settings</h3>
        <div className="h-[1px] bg-[#E5E7E8] my-4" />

        <Form form={form} layout="vertical" requiredMark={false}>
          <div className="space-y-4">
            <h6 className="text-primary01 text-[14px] font-semibold">
              Advance Booking Limits
            </h6>

            <div className="flex items-cente gap-4 w-full">
              <div className="flex flex-col gap-1 w-1/2">
                <Form.Item
                  label={
                    <span className="text-[#3A3B3F] text-[14px] font-normal flex items-center gap-1">
                      Minimum period{" "}
                      <Popover
                        placement="top"
                        content={
                          <p>Define how far in advance clients can book.</p>
                        }
                      >
                        <CircleAlert size={16} className="text-primary01" />
                      </Popover>
                      <sup className="text-red-600 text-sm">*</sup>{" "}
                    </span>
                  }
                  name="minPeriodHours"
                  rules={[
                    {
                      required: true,
                      message: "Please enter minimum hours!",
                    },
                    {
                      type: "number",
                      min: 0,
                      message: "Hours must be a positive number!",
                      transform: (value) => Number(value),
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Enter Hours"
                    className="w-full"
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <Form.Item
                  label={
                    <span className="text-[#3A3B3F] text-[14px] font-normal flex items-center gap-1">
                      Maximum period{" "}
                      <Popover
                        placement="top"
                        content={
                          <p>
                            Specify how soon a client can book before the
                            appointment.
                          </p>
                        }
                      >
                        <CircleAlert size={16} className="text-primary01" />
                      </Popover>
                      <sup className="text-red-600 text-sm">*</sup>{" "}
                    </span>
                  }
                  name="maxPeriodDays"
                  rules={[
                    {
                      required: true,
                      message: "Please enter maximum days!",
                    },
                    {
                      type: "number",
                      min: 0,
                      message: "Days must be a positive number!",
                      transform: (value) => Number(value),
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Enter Days"
                    className="w-full"
                  />
                </Form.Item>
              </div>
            </div>

            <h6 className="text-primary01 text-[14px] font-semibold">
              Booking Confirmation Mode
            </h6>

            <div className="space-x-2">
              <label className="text-[#242528] text-[14px] font-normal">
                {!isAutoConfirm ? "Manual confirmation" : "Auto confirmation"}
              </label>
              <Switch
                onChange={(checked) => setIsAutoConfirm(checked)}
                checked={isAutoConfirm}
              />
            </div>

            {!isAutoConfirm && (
              <div>
                <Radio.Group
                  style={style}
                  onChange={handleManualLimit}
                  value={manualLimit}
                  options={[
                    {
                      value: "first-time-client",
                      label: (
                        <div>
                          <p className="text-[#242528] text-sm font-medium">
                            For first-time client only
                          </p>
                          <small className="text-[#82868E] text-xs font-normal">
                            Only first-time clients need manual approval.
                          </small>
                        </div>
                      ),
                    },
                    {
                      value: "all-clients",
                      label: (
                        <div>
                          <p className="text-[#242528] text-sm font-medium">
                            For all clients
                          </p>
                          <small className="text-[#82868E] text-xs font-normal">
                            Every booking request requires manual approval.
                          </small>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            )}
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default SettingsBookingsRulesModal;