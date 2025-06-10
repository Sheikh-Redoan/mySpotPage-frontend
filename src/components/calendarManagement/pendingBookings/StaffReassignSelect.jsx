import React, { useState } from "react";
import { Select } from "antd";
import { Radio } from "antd";

const { Option } = Select;

const StaffReassignSelect = ({ booking, onReassign }) => {
  const [selectedStaff, setSelectedStaff] = useState(
    booking?.staffName || "Select Staff"
  );
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Dummy data for all available staff (matching the image)
  const availableStaff = [
    { name: "Fill Hug", avatar: "F" },
    { name: "Code Voyager", avatar: "C" },
    { name: "Echo Sage", avatar: "E" },
    { name: "Nebula Drift", avatar: "N" },
    { name: "Shadow Quill", avatar: "S" },
  ];

  // Find the avatar for the selected staff
  const getAvatar = (staffName) => {
    if (staffName === booking?.staffName) {
      return booking?.staffName?.charAt(0) || "P";
    }
    const staff = availableStaff.find((s) => s.name === staffName);
    return staff ? staff.avatar : "P";
  };

  const handleChange = (value) => {
    setSelectedStaff(value);
    if (onReassign) onReassign(value);
  };

  return (
    <Select
      value={selectedStaff}
      size="large"
      open={isDropdownOpen}
      onOpenChange={(open) => setDropdownOpen(open)}
      className="custom-select !rounded-full"
      onChange={handleChange}
      popupMatchSelectWidth={false}
      popupRender={(menu) => (
        <div className="p-2 w-fit rounded-full">
          {/* Assigned Staff Section */}
          <div className="mb-2">
            <div className="text-primary01 text-[14px] font-semibold mb-1">
              Assigned Staff
            </div>
            <div className="flex items-center p-1 hover:bg-gray-100 rounded cursor-pointer">
              <div className="w-6 h-6 bg-primary01 text-white flex items-center justify-center rounded-full text-sm font-bold mr-2">
                {booking?.staffName?.charAt(0) || "P"}
              </div>
              <span className="text-gray-800 text-sm">
                {booking?.staffName || "Pixel Nomad"}
              </span>
            </div>
          </div>

          {/* All Available Staffs Section */}
          <div className="mb-2">
            <div className="text-primary01 text-[14px] font-semibold mb-1">
              All Available Staffs
            </div>

            <Radio.Group
              value={selectedStaff}
              onChange={(e) => handleChange(e.target.value)}
              className="flex flex-col"
            >
              {availableStaff.map((staff) => (
                <div
                  key={staff.name}
                  className="flex items-center p-1 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <Radio value={staff.name}>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-primary01 text-white flex items-center justify-center rounded-full text-sm font-bold">
                        {staff.avatar}
                      </div>
                      <span className="text-gray-800 text-sm">
                        {staff.name}
                      </span>
                    </div>
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-2 gap-2">
            <button
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm text-white bg-black rounded-lg hover:bg-gray-800"
              onClick={(e) => {
                e.stopPropagation(); 
                if (onReassign) onReassign(selectedStaff);
              }}
            >
              Re-assign
            </button>
          </div>
        </div>
      )}
    >
      {/* Options */}
      <Option value={booking?.staffName || "Select Staff"} disabled>
        <div className="flex items-center">
          <div className="w-5 h-5 bg-primary01 text-white flex items-center justify-center rounded-full text-xs font-bold mr-2">
            {getAvatar(booking?.staffName)}
          </div>
          <span>{booking?.staffName || "Select Staff"}</span>
        </div>
      </Option>
      {availableStaff.map((staff) => (
        <Option key={staff.name} value={staff.name}>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-primary01 text-white flex items-center justify-center rounded-full text-xs font-bold mr-2">
              {staff.avatar}
            </div>
            <span className="text-sm">{staff.name}</span>
          </div>
        </Option>
      ))}
    </Select>
  );
};

export default StaffReassignSelect;
