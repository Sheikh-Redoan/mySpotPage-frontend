import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import {
  Form,
  Select,
  Upload,
  Radio,
  Row,
  Col,
  Drawer,
  message,
  DatePicker,
  Checkbox,
  Switch,
  Button,
} from "antd";

// --- START: Enhanced Inline SVG Icons to match first code's design ---
const CalendarDaysIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CloseOutlineIcon = ({ className, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    onClick={onClick}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);
// --- END: Enhanced Inline SVG Icons ---

const StaffDetailModal = ({ staff, open, onClose, onSave, onRemove }) => {
  const [form] = Form.useForm();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Basic Information");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (open && staff) {
      setActiveTab("Basic Information");
      setProfileImage(
        staff.image || "https://placehold.co/80x80/aabbcc/ffffff?text=Staff"
      );

      form.setFieldsValue({
        ...staff,
        firstName: staff.name.split(" ")[0] || "",
        lastName: staff.name.split(" ").slice(1).join(" ") || "",
        status: staff.status === "Online" || staff.status === "Break",
        dateOfBirth: staff.dateOfBirth
          ? dayjs(staff.dateOfBirth, "DD/MM/YYYY")
          : null,
        workingShifts: staff.workingShifts?.map((shift) => ({
          ...shift,
          isOn: shift.isOn || false,
          breakOn: shift.breakOn || false,
        })),
      });
    } else {
      form.resetFields();
      setProfileImage("https://placehold.co/80x80/aabbcc/ffffff?text=Staff");
    }
  }, [staff, open, form]);

  const handleProfileImageChange = (info) => {
    const reader = new FileReader();
    reader.onload = () => setProfileImage(reader.result);
    reader.readAsDataURL(info.file.originFileObj);
  };

  const handleFinish = (values) => {
    const updatedStaff = {
      ...staff,
      ...values,
      name: `${values.firstName} ${values.lastName}`,
      image: profileImage,
      status: values.status ? "Online" : "Offline",
      dateOfBirth: values.dateOfBirth
        ? values.dateOfBirth.format("DD/MM/YYYY")
        : "",
    };
    onSave(updatedStaff);
    message.success("Staff details saved successfully!");
  };

  const availableRoles = [
    "Owner / Manager",
    "Employee",
    "Receptionist",
    "Massage Therapist",
    "Hair Stylist",
    "Coach",
    "Esthetician",
    "Physical Therapist",
  ];
  const allAvailableServices = [
    "Precision Cutting",
    "Texturizing & Thinning",
    "Blowout Styling",
    "Updo Styling",
    "Hair Perm",
    "Swedish",
    "Deep Tissue",
    "Hot Stone",
    "Facials",
    "Chemical Peels",
    "Waxing",
    "Eyelash Extensions",
    "Consultation",
  ].sort();
  const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
    const hours = Math.floor(i / 4);
    const minutes = (i % 4) * 15;
    const timeValue = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    return {
      value: timeValue,
      label: dayjs(timeValue, "HH:mm").format("hh:mm A"),
    };
  });

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      width={768}
      closable={false}
      destroyOnClose
      styles={{
        body: { padding: 0 },
        header: { display: "none" },
        mask: { backgroundColor: "rgba(38, 38, 38, 0.5)" },
      }}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        className="flex flex-col h-full bg-white font-['Golos_Text']"
      >
        {/* Header */}
        <div className="self-stretch h-14 px-5 border-b border-gray-200 flex justify-between items-center">
          <div className="flex-1 text-gray-950 text-base font-semibold leading-normal">
            Staff detail
          </div>
          <CloseOutlineIcon
            onClick={onClose}
            className="w-6 h-6 flex justify-center items-center text-gray-600 hover:text-gray-900"
          />
        </div>

        {/* Tabs */}
        <div className="self-stretch flex justify-start items-end border-b border-gray-200">
          <TabButton
            title="Basic Information"
            activeTab={activeTab}
            onClick={() => setActiveTab("Basic Information")}
          />
          <TabButton
            title="Working Shift"
            activeTab={activeTab}
            onClick={() => setActiveTab("Working Shift")}
          />
        </div>

        {/* Content */}
        <div className="self-stretch flex-1 p-5 bg-white flex flex-col gap-5 overflow-auto">
          {activeTab === "Basic Information" && (
            <div className="self-stretch flex-1 flex flex-col justify-start items-start gap-4">
              {/* Profile Image and Status */}
              <div className="self-stretch flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex flex-col justify-start items-start gap-3">
                  <div className="inline-flex justify-start items-start gap-1">
                    <div className="text-neutral-700 text-sm font-normal leading-tight">
                      Profile image
                    </div>
                    <div className="text-red-500 text-sm font-normal leading-tight">
                      *
                    </div>
                  </div>
                  <div className="w-20 h-20 relative rounded-full flex flex-col justify-center items-center overflow-hidden border border-gray-200">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/80x80/aabbcc/ffffff?text=Staff";
                      }}
                    />
                    <Upload
                      showUploadList={false}
                      customRequest={({ onSuccess }) => onSuccess("ok")}
                      onChange={handleProfileImageChange}
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 px-2 py-1 left-0 top-0 absolute bg-white/30 rounded-[100px] outline outline-1 outline-offset-[-1px] outline-white/10 backdrop-blur-[6px] inline-flex justify-center items-center"
                    >
                      <div className="w-full h-full bg-black/50 flex flex-col justify-center items-center px-2 py-1 text-white text-xs font-semibold leading-none">
                        Change
                      </div>
                    </Upload>
                  </div>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <span className="text-gray-400 text-sm font-normal leading-tight">
                    Inactivate
                  </span>
                  <Form.Item name="status" valuePropName="checked" noStyle>
                    <Switch
                      onChange={() => {}}
                      className={`w-9 h-5 p-0.5 rounded-xl flex items-center transition-colors duration-200 ${
                        form.getFieldValue("status")
                          ? "bg-violet-500 justify-end"
                          : "bg-gray-300 justify-start"
                      }`}
                      checkedChildren=""
                      unCheckedChildren=""
                      checked={form.getFieldValue("status")}
                    />
                  </Form.Item>
                  <span className="text-gray-400 text-sm font-normal leading-tight">
                    Activate
                  </span>
                </div>
              </div>

              {/* Name Fields */}
              <Row gutter={16} className="w-full">
                <Col span={12}>
                  <Form.Item
                    label={<FormLabel label="First name" required />}
                    name="firstName"
                    rules={[{ required: true }]}
                  >
                    <input className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 text-zinc-700 text-sm font-normal leading-tight focus:outline-none focus:border-violet-500 w-full" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={<FormLabel label="Last name" required />}
                    name="lastName"
                    rules={[{ required: true }]}
                  >
                    <input className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 text-zinc-700 text-sm font-normal leading-tight focus:outline-none focus:border-violet-500 w-full" />
                  </Form.Item>
                </Col>
              </Row>

              {/* Phone and Date of Birth */}
              <Row gutter={16} className="w-full">
                <Col span={12}>
                  <Form.Item
                    label={<FormLabel label="Phone number" required />}
                    name="phoneNumber"
                    rules={[{ required: true }]}
                  >
                    <input className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 text-zinc-700 text-sm font-normal leading-tight focus:outline-none focus:border-violet-500 w-full" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={<FormLabel label="Date of birth" required />}
                    name="dateOfBirth"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      format="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      suffixIcon={
                        <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
                      }
                      className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 text-zinc-700 text-sm font-normal leading-tight focus:outline-none focus:border-violet-500 w-full"
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Gender */}
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <FormLabel label="Gender" required />
                <Form.Item name="gender" rules={[{ required: true }]}>
                  <Radio.Group className="flex flex-wrap gap-4">
                    {["Male", "Female", "Other"].map((label) => (
                      <Radio
                        key={label}
                        value={label}
                        className="flex items-center gap-2.5"
                      >
                        <span className="text-neutral-700 text-sm font-normal leading-tight">
                          {label}
                        </span>
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </div>

              {/* Role & Job Title */}
              <Row gutter={16} className="w-full">
                <Col span={12} >
                    <Form.Item
                    label={<FormLabel label="Role" required />}
                    name="roles"
                    rules={[{ required: true }]}
                  >
                  <div className="overflow-y-scroll">
                    <Select
                      mode="multiple"
                      placeholder="Select roles"
                      options={availableRoles.map((r) => ({
                        label: r,
                        value: r,
                      }))}
                      className="custom-input h-10"
                      dropdownStyle={{ zIndex: 2000 }}
                      tagRender={({ label, closable, onClose }) => (
                        <span className="px-2 py-1 bg-violet-50 rounded  text-violet-500 text-xs font-medium leading-none flex items-center gap-1">
                          {label}
                          {closable && (
                            <button
                              onClick={onClose}
                              className="text-violet-500 hover:text-violet-700"
                            >
                              &times;
                            </button>
                          )}
                        </span>
                      )}
                    />
                  </div>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={<FormLabel label="Job title" required />}
                    name="jobTitle"
                    rules={[{ required: true }]}
                  >
                    <input className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 text-zinc-700 text-sm font-normal leading-tight focus:outline-none focus:border-violet-500 w-full" />
                  </Form.Item>
                </Col>
              </Row>

              {/* Services */}
              <div className="self-stretch flex flex-col justify-start items-start gap-2 ">
                <FormLabel label="Services" required />
                <div className="w-full">
                  <Form.Item name="services" rules={[{ required: true }]}>
                    <Select
                      mode="multiple"
                      showSearch
                      placeholder="Search and add services..."
                      optionFilterProp="label"
                      options={allAvailableServices.map((s) => ({
                        label: s,
                        value: s,
                      }))}
                      className="custom-input !w-full"
                      dropdownStyle={{ zIndex: 2000 }}
                      tagRender={({ label, closable, onClose }) => (
                        <span className="px-2 py-1 bg-violet-50 rounded text-violet-500 text-xs font-medium leading-none flex items-center gap-1">
                          {label}
                          {closable && (
                            <button
                              onClick={onClose}
                              className="text-violet-500 hover:text-violet-700"
                            >
                              &times;
                            </button>
                          )}
                        </span>
                      )}
                    />
                  </Form.Item>
                </div>
                <div className="text-gray-400 text-xs font-normal leading-none">
                  The services this staff member will be responsible for:
                </div>
              </div>
            </div>
          )}

          {activeTab === "Working Shift" && (
            <div className="self-stretch flex-1 flex flex-col justify-start items-start gap-4">
              {/* Working Hours Section */}
              <div className="self-stretch p-4 rounded-xl border border-gray-200 flex flex-col justify-start items-start gap-5 overflow-hidden">
                <div className="self-stretch flex flex-col justify-start items-start gap-6">
                  <div className="self-stretch rounded-xl flex flex-col sm:flex-row justify-start items-start sm:items-center gap-3 sm:gap-6">
                    <div className="w-full sm:w-44 text-neutral-800 text-base font-semibold leading-normal">
                      Working hours
                    </div>
                    <div className="flex-1 w-full flex justify-start items-center gap-3">
                      <div className="flex-1 text-center text-gray-500 text-sm font-normal leading-tight">
                        Start Shift
                      </div>
                      <div className="w-4 text-center text-neutral-600 text-sm font-normal leading-tight">
                        -
                      </div>
                      <div className="flex-1 text-center text-gray-500 text-sm font-normal leading-tight">
                        End Shift
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <Form.List name="workingShifts">
                    {(fields) => (
                      <>
                        {fields.map(({ key, name }) => (
                          <Form.Item key={key} shouldUpdate>
                            {({ getFieldValue }) => {
                              const shift = getFieldValue([
                                "workingShifts",
                                name,
                              ]);
                              return (
                                <div className="self-stretch rounded-xl flex flex-col sm:flex-row justify-start items-start sm:items-center gap-3 sm:gap-6">
                                  <label className="w-full sm:w-44 rounded flex justify-start items-center gap-2 cursor-pointer">
                                    <Form.Item
                                      name={[name, "isOn"]}
                                      valuePropName="checked"
                                      noStyle
                                    >
                                      <Checkbox className="custom-square-check" />
                                    </Form.Item>
                                    <span className="text-neutral-800 text-sm font-semibold leading-tight">
                                      {shift?.day}
                                    </span>
                                  </label>
                                  <div className="flex-1 w-full flex justify-start items-center gap-3">
                                    <div
                                      className={`flex-1 self-stretch px-3 py-2 rounded-lg border border-gray-200 flex justify-center items-center gap-2 ${
                                        !shift?.isOn
                                          ? "bg-gray-100 text-gray-500"
                                          : "bg-white text-neutral-800"
                                      }`}
                                    >
                                      {shift?.isOn ? (
                                        <>
                                          <Form.Item
                                            name={[name, "startTime"]}
                                            noStyle
                                          >
                                            <Select
                                              options={timeOptions}
                                              suffixIcon={
                                                <ClockIcon className="w-5 h-5 text-gray-400" />
                                              }
                                              className="w-full border-none"
                                              dropdownStyle={{ zIndex: 2000 }}
                                            />
                                          </Form.Item>
                                        </>
                                      ) : (
                                        <span className="text-gray-500 text-sm font-normal leading-tight">
                                          Unavailable
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-center text-neutral-600 text-sm font-normal leading-tight">
                                      -
                                    </div>
                                    <div
                                      className={`flex-1 self-stretch px-3 py-2 rounded-lg border border-gray-200 flex justify-center items-center gap-2 ${
                                        !shift?.isOn
                                          ? "bg-gray-100 text-gray-500"
                                          : "bg-white text-neutral-800"
                                      }`}
                                    >
                                      {shift?.isOn ? (
                                        <>
                                          <Form.Item
                                            name={[name, "endTime"]}
                                            noStyle
                                          >
                                            <Select
                                              options={timeOptions}
                                              suffixIcon={
                                                <ClockIcon className="w-5 h-5 text-gray-400" />
                                              }
                                              className="w-full border-none"
                                              dropdownStyle={{ zIndex: 2000 }}
                                            />
                                          </Form.Item>
                                        </>
                                      ) : (
                                        <span className="text-gray-500 text-sm font-normal leading-tight">
                                          Unavailable
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                          </Form.Item>
                        ))}
                      </>
                    )}
                  </Form.List>
                  </div>
                </div>
              </div>

              {/* Breaking Time Section */}
              <div className="self-stretch p-4 rounded-xl border border-gray-200 flex flex-col justify-start items-start gap-5 overflow-hidden">
                <div className="self-stretch flex flex-col justify-start items-start gap-6">
                  <div className="self-stretch rounded-xl flex flex-col sm:flex-row justify-start items-start sm:items-center gap-3 sm:gap-6">
                    <div className="w-full sm:w-44 text-neutral-800 text-base font-semibold leading-normal">
                      Breaking time
                    </div>
                    <div className="flex-1 w-full flex justify-start items-center gap-3">
                      <div className="flex-1 text-center text-gray-500 text-sm font-normal leading-tight">
                        Break Start
                      </div>
                      <div className="w-4 text-center text-neutral-600 text-sm font-normal leading-tight">
                        -
                      </div>
                      <div className="flex-1 text-center text-gray-500 text-sm font-normal leading-tight">
                        Break End
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <Form.List name="workingShifts">
                    {(fields) => (
                      <>
                        {fields.map(({ key, name }) => (
                          <Form.Item key={key} shouldUpdate>
                            {({ getFieldValue }) => {
                              const shift = getFieldValue([
                                "workingShifts",
                                name,
                              ]);
                              return (
                                <div className="self-stretch rounded-xl flex flex-col sm:flex-row justify-start items-start sm:items-center gap-3 sm:gap-6">
                                  <label className="w-full sm:w-44 rounded flex justify-start items-center gap-2 cursor-pointer">
                                    <Form.Item
                                      name={[name, "breakOn"]}
                                      valuePropName="checked"
                                      noStyle
                                    >
                                      <Checkbox
                                        className="custom-square-check"
                                        disabled={!shift?.isOn}
                                      />
                                    </Form.Item>
                                    <span
                                      className={`text-sm font-semibold leading-tight ${
                                        !shift?.isOn
                                          ? "text-gray-400"
                                          : "text-neutral-800"
                                      }`}
                                    >
                                      {shift?.day}
                                    </span>
                                  </label>
                                  <div className="flex-1 w-full flex justify-start items-center gap-3">
                                    <div
                                      className={`flex-1 self-stretch px-3 py-2 rounded-lg border border-gray-200 flex justify-center items-center gap-2 ${
                                        !shift?.breakOn || !shift?.isOn
                                          ? "bg-gray-100 text-gray-500"
                                          : "bg-white text-neutral-800"
                                      }`}
                                    >
                                      {shift?.breakOn && shift?.isOn ? (
                                        <>
                                          <Form.Item
                                            name={[name, "breakStartTime"]}
                                            noStyle
                                          >
                                            <Select
                                              options={timeOptions}
                                              suffixIcon={
                                                <ClockIcon className="w-5 h-5 text-gray-400" />
                                              }
                                              className="w-full border-none"
                                              dropdownStyle={{ zIndex: 2000 }}
                                            />
                                          </Form.Item>
                                        </>
                                      ) : (
                                        <span className="text-gray-500 text-sm font-normal leading-tight">
                                          No Break
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-center text-neutral-600 text-sm font-normal leading-tight">
                                      -
                                    </div>
                                    <div
                                      className={`flex-1 self-stretch px-3 py-2 rounded-lg border border-gray-200 flex justify-center items-center gap-2 ${
                                        !shift?.breakOn || !shift?.isOn
                                          ? "bg-gray-100 text-gray-500"
                                          : "bg-white text-neutral-800"
                                      }`}
                                    >
                                      {shift?.breakOn && shift?.isOn ? (
                                        <>
                                          <Form.Item
                                            name={[name, "breakEndTime"]}
                                            noStyle
                                          >
                                            <Select
                                              options={timeOptions}
                                              suffixIcon={
                                                <ClockIcon className="w-5 h-5 text-gray-400" />
                                              }
                                              className="w-full border-none"
                                              dropdownStyle={{ zIndex: 2000 }}
                                            />
                                          </Form.Item>
                                        </>
                                      ) : (
                                        <span className="text-gray-500 text-sm font-normal leading-tight">
                                          No Break
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                          </Form.Item>
                        ))}
                      </>
                    )}
                  </Form.List>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="self-stretch h-14 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <button
            type="button"
            onClick={() => onRemove(staff.id)}
            className="py-0.5 flex justify-center items-center gap-2 text-red-500 text-sm font-semibold leading-tight hover:bg-red-50 rounded px-2"
          >
            <TrashIcon className="w-5 h-5" />
            <span>Remove this staff</span>
          </button>
          <div className="flex justify-end items-center gap-3">
            <button
              type="submit"
              onClick={() => form.submit()}
              className="h-10 px-3 py-2 bg-neutral-800 rounded-lg flex justify-center items-center gap-2 text-white text-sm font-semibold leading-tight hover:bg-neutral-700 transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </div>
      </Form>
    </Drawer>
  );
};

// --- Reusable Helper Components ---
const TabButton = ({ title, activeTab, onClick }) => (
  <button
    type="button"
    className={`flex-1 px-4 lg:px-8 py-3 border-b-2 max-[700px]:text-[14px] text-nowrap ${
      activeTab === title
        ? "border-violet-500 text-violet-500 font-semibold"
        : "border-gray-200 text-gray-700 font-normal"
    } flex justify-center items-center text-base leading-normal transition-colors duration-200`}
    onClick={onClick}
  >
    {title}
  </button>
);

const FormLabel = ({ label, required }) => (
  <div className="inline-flex justify-start items-start gap-1">
    <span className="text-neutral-700 text-sm font-normal leading-tight">
      {label}
    </span>
    {required && (
      <span className="text-red-500 text-sm font-normal leading-tight">*</span>
    )}
  </div>
);

export default StaffDetailModal;
