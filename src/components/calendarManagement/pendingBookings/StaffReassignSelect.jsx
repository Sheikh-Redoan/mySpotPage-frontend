import React from "react";
import { Select } from "antd";

const { Option } = Select;

const StaffReassignSelect = ({ booking, onReassign }) => {
  const handleChange = (value) => {
    if (onReassign) onReassign(value); // Callback to handle re-assignment
  };

  // Dummy data for all available staff (matching the image)
  const availableStaff = [
    { name: "Fill (230) × 21 Hug", avatar: "F" },
    { name: "Code Voyager", avatar: "C" },
    { name: "Echo Sage", avatar: "E" },
    { name: "Nebula Drift", avatar: "N" },
    { name: "Shadow Quill", avatar: "S" },
  ];

  return (
    <Select
      defaultValue={booking?.staffName || "Select Staff"}
      style={{ width: 200 }}
      onChange={handleChange}
      popupRender={(menu) => (
        <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          {/* Assigned Staff Section */}
          <div className="mb-2">
            <div className="text-primary01 text-[14px] font-semibold mb-1">
              Assigned Staff
            </div>
            <div className="flex items-center p-1 hover:bg-gray-100 rounded cursor-pointer">
              <div className="w-8 h-8 bg-purple-500 text-white flex items-center justify-center rounded-full text-sm font-bold mr-2">
                {booking?.staffName?.charAt(0) || "P"}
              </div>
              <span className="text-gray-800 text-sm">{booking?.staffName || "Pixel Nomad"}</span>
            </div>
          </div>

          {/* All Available Staffs Section */}
          <div className="mb-2">
            <div className="text-primary01 text-[14px] font-semibold mb-1">
              All Available Staffs
            </div>
            {availableStaff.map((staff) => (
              <div
                key={staff.name}
                className="flex items-center p-1 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => handleChange(staff.name)}
              >
                <div className="w-8 h-8 bg-purple-500 text-white flex items-center justify-center rounded-full text-sm font-bold mr-2">
                  {staff.avatar}
                </div>
                <span className="text-gray-800 text-sm">{staff.name}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              className="px-4 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
              onClick={(e) => e.stopPropagation()} // Prevent select from closing
            >
              Cancel
            </button>
            <button
              className="px-4 py-1 text-sm text-white bg-black rounded-lg hover:bg-gray-800"
              onClick={(e) => {
                e.stopPropagation(); // Prevent select from closing
                if (onReassign) onReassign(availableStaff[0].name); // Example re-assign to first staff
              }}
            >
              Re-assign
            </button>
          </div>
        </div>
      )}
    >
      {/* Placeholder option to trigger dropdown */}
      <Option value={booking?.staffName || "Select Staff"} disabled>
        {booking?.staffName || "Select Staff"}
      </Option>
    </Select>
  );
};

export default StaffReassignSelect;