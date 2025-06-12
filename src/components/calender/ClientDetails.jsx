import { Button, Checkbox, Descriptions, Dropdown, List, Space } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/en"; // Ensure locale is loaded for dayjs formatting
import { ArrowUpRight, Download, X } from "lucide-react";
import { Link } from "react-router";

export default function ClientDetails({ event, hide }) {
  // Dropdown menu for the Status button in the Action section
  const statusMenu = (
    <div className="bg-white rounded-md shadow-lg py-1 border border-gray-200">
      <ul className="list-none p-0 m-0">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700">
          Confirmed
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700">
          Pending
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700">
          Cancelled
        </li>
      </ul>
    </div>
  );

  return (
    <div
      className="max-w-md" // Added custom class for
    >
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
        <h3 className="font-medium flex items-center gap-2">
          Booking detail
          <Link to={`/bookings/${event.id}`}>
            <ArrowUpRight size={20} className="text-gray-400" />
          </Link>
        </h3>
        <Button type="text" onClick={hide}>
          <X size={18} className="text-gray-500" />
        </Button>
      </div>

      {/* Descriptions for Client Details */}
      <Descriptions
        column={1}
        className="ant-descriptions-custom pb-4" // Custom class for styling Descriptions component
        colon={false} // Remove colons after labels
        labelStyle={{
          color: "#8A8A8A", // Custom lighter grey from image
          fontWeight: "normal",
          width: "120px", // Fixed width for labels for alignment
          paddingRight: "0", // No padding here, use gap property for spacing
          fontSize: "0.875rem", // text-sm
        }}
        contentStyle={{
          fontWeight: "500", // font-medium
          color: "#333333", // Darker text for content
          fontSize: "0.875rem", // text-sm
          paddingLeft: "0", // Ensure no extra padding pushing content
        }}>
        {/* Client Name Row */}
        <Descriptions.Item
          label="Client name"
          className="custom-dotted-border-b">
          <div className="flex justify-between items-center w-full">
            <span>{appointmentData.clientName}</span>
            {/* Button type link for Alexander */}
            <Button
              type="link"
              className="text-[#0066FF] text-sm p-0 h-auto font-medium focus:outline-none focus:ring-0">
              Alexander
            </Button>
          </div>
        </Descriptions.Item>

        {/* Time Row */}
        <Descriptions.Item label="Time" className="custom-dotted-border-b">
          <div className="flex justify-between items-center w-full">
            <span>{appointmentData.time.format("DD MMMYYYY, HH:mm")}</span>{" "}
            {/* Corrected date format */}
          </div>
        </Descriptions.Item>

        {/* Staff Row */}
        <Descriptions.Item label="Staff" className="custom-dotted-border-b">
          <div className="flex justify-between items-center w-full">
            <span>{appointmentData.staff}</span>
          </div>
        </Descriptions.Item>

        {/* Status Row */}
        <Descriptions.Item
          label="Status"
          className="custom-dotted-border-b !mb-0">
          {" "}
          {/* Adjusted margin-bottom for last item */}
          <div className="flex justify-between items-center w-full">
            <span className="text-[#0066FF] font-medium">
              {appointmentData.status}
            </span>{" "}
            {/* Blue color for 'Confirmed' status */}
          </div>
        </Descriptions.Item>
      </Descriptions>

      {/* Service Lists Section */}
      <div className="pt-4 border-b border-dotted border-gray-300 pb-4 mt-4">
        {" "}
        {/* Adjusted top margin and added dotted border */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-normal text-gray-700">Service lists</h3>
          <Button
            type="link"
            className="text-[#0066FF] text-sm p-0 h-auto font-medium focus:outline-none focus:ring-0">
            View detail
          </Button>
        </div>
        <List
          dataSource={appointmentData.serviceLists}
          renderItem={(item) => (
            <List.Item className="!py-1 !px-0 !border-b-0">
              {/* Remove Ant Design's default padding/border */}
              <div className="flex items-start text-sm w-full custom-list-item-content">
                {/* Custom Checkbox for rounded appearance and correct alignment */}
                <Checkbox
                  checked={item.completed}
                  className="ant-checkbox-rounded mr-2 mt-0.5"
                />
                <div className="flex flex-col flex-grow">
                  {/* Use flex-grow to take available space */}
                  <span className="font-medium text-gray-800">{item.name}</span>
                  {item.description && (
                    <span className="text-xs text-gray-500">
                      {item.description}
                    </span>
                  )}
                </div>
              </div>
            </List.Item>
          )}
          className="custom-list-no-padding" // Custom class to remove padding
        />
      </div>

      {/* Note Section */}
      <div className="mt-4 pb-4 border-b border-dotted border-gray-300">
        <h3 className="text-sm font-normal text-gray-700 mb-2">Note:</h3>
        <p className="text-sm text-gray-800 leading-relaxed">
          {appointmentData.note}
        </p>
      </div>

      {/* Specific Note Section */}
      <div className="mt-4 pb-4">
        {" "}
        {/* No bottom border for the last section */}
        <h3 className="text-sm font-normal text-gray-700 mb-2">
          Specific note:
        </h3>
        <p className="text-sm text-gray-800 leading-relaxed">
          {appointmentData.specificNote}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
        <h3 className="text-sm font-normal text-gray-700">Action</h3>
        <Space size={8}>
          {" "}
          {/* Reduced space between buttons for closer match */}
          <Button
            className="rounded-md border border-[#F24458] text-[#F24458] hover:text-[#D1394C] hover:border-[#D1394C] px-4 py-2 flex items-center justify-center h-auto text-sm"
            style={{
              backgroundColor: "rgba(255, 235, 238, 0.7)", // Light red background from image
              padding: "8px 16px", // Explicit padding for consistent size
            }}>
            Add to blacklist
          </Button>
          <Dropdown overlay={statusMenu} trigger={["click"]}>
            <Button
              className="rounded-md border border-gray-300 text-gray-800 hover:border-gray-400 hover:text-gray-900 px-4 py-2 flex items-center justify-center h-auto text-sm"
              style={{
                backgroundColor: "#F7F7F7", // Light grey background from image
                padding: "8px 16px", // Explicit padding for consistent size
              }}>
              <Space size={4}>
                {" "}
                {/* Adjusted space within the button */}
                Status
                <Download className="text-xs" />{" "}
                {/* DownOutlined from Ant Design is fine here */}
              </Space>
            </Button>
          </Dropdown>
        </Space>
      </div>
    </div>
  );
}

// Mock data for the appointment details
const appointmentData = {
  clientName: "Alexander",
  time: dayjs("2025-01-06T17:00:00"),
  staff: "Pixe | Nomad",
  status: "Confirmed", // This will be rendered as blue text, not a dropdown initially
  serviceLists: [
    {
      id: "s1",
      name: "Classic Ombre",
      description: "Smooth / Scalp treatment",
      completed: true,
    },
    {
      id: "s3",
      name: "Reverse Ombre",
      description: "Shadow Root",
      completed: true,
    },
    { id: "s5", name: "Balayage with Toner", completed: true },
  ],
  note: "Hair is thick and slightly wavy, prefers a shoulder-length layered cut with light texture.",
  specificNote: "shop recommend booking a trim every 6-8 weeks",
};
