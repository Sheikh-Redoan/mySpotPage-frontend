// src/components/seller/AddStaffModal.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { IoClose } from "react-icons/io5"; // Close icon
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Chevron icons
import { FaSquareCheck, FaRegSquare } from "react-icons/fa6"; // Checkbox icons
import { useNavigate } from "react-router"; // Import useNavigate

const AddStaffModal = ({ onClose, onAddStaff, allStaffData }) => {
  const modalRef = useRef(null);
  const roleDropdownRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const availableRoles = useMemo(() => {
    return ["Owner / Manager", "Employee", "Receptionist"];
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleRoleDropdownClickOutside = (event) => {
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target) &&
        !event.target.closest(".role-select-input")
      ) {
        setShowRoleDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleRoleDropdownClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleRoleDropdownClickOutside);
    };
  }, [onClose]);

  const handleRoleChange = (role) => {
    setSelectedRoles((prevSelected) => {
      if (prevSelected.includes(role)) {
        return prevSelected.filter((r) => r !== role);
      } else {
        if (prevSelected.length < 2) {
          return [...prevSelected, role];
        } else {
          alert("You can select a maximum of two roles.");
          return prevSelected;
        }
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber || selectedRoles.length === 0 || !jobTitle) {
      alert("Please fill in all required fields.");
      return;
    }

    // --- Simulate SMS sending and redirection for new staff onboarding ---
    // In a real application, you would:
    // 1. Make an API call to your backend to create a pending staff entry
    //    and trigger an SMS sending (with an OTP and a unique link).
    // 2. The backend would store the staff's initial details (phone, roles, job title)
    //    and associate them with a temporary token/OTP.
    // 3. This admin UI would then typically show a success message or redirect to
    //    an "invitation sent" page.

    const tempStaffName = `Staff ${allStaffData.length + 1}`; // For demo purposes

    console.log("Simulating SMS send for new staff:", {
      phoneNumber,
      roles: selectedRoles,
      jobTitle,
    });
    alert(`SMS with onboarding link sent to ${phoneNumber}! New staff can use OTP '123456'.`);

    onClose(); // Close the add staff modal

    // Redirect to the new standalone OTP verification page, passing necessary state
    navigate("/onboard/verify-staff-otp", { // Changed path here
      state: { phoneNumber, roles: selectedRoles, jobTitle, staffName: tempStaffName },
    });
  };

  return (
    <div className="fixed inset-0 bg-[#0000007c] flex justify-center items-center z-40">
      <div
        ref={modalRef}
        className="relative w-[600px] max-h-[700px] bg-white rounded-lg flex flex-col justify-start items-start shadow-xl"
      >
        {/* Header */}
        <div className="self-stretch px-6 py-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-neutral-800 text-lg font-semibold font-['Golos_Text'] leading-relaxed">
            Add staff
          </h2>
          <button onClick={onClose} className="text-zinc-600 hover:text-zinc-800">
            <IoClose size={24} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="self-stretch px-6 py-4 flex flex-col justify-start items-start gap-4 overflow-y-auto">
          {/* Phone Number */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <label className="rounded-xl inline-flex justify-start items-start gap-1">
              <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                Phone number
              </span>
              <span className="text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">*</span>
            </label>
            <input
              type="text"
              placeholder="Phone"
              className="self-stretch h-10 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal font-['Golos_Text'] leading-tight"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          {/* Role Multi-select */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1 relative">
            <label className="rounded-xl inline-flex justify-start items-start gap-1">
              <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                Role
              </span>
              <span className="text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">*</span>
            </label>
            <div
              className="role-select-input self-stretch h-10 px-3 py-2 rounded-lg border border-gray-200 inline-flex justify-between items-center gap-2 cursor-pointer hover:border-gray-300 focus-within:border-violet-500"
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            >
              <div className="flex-1 flex flex-wrap items-center gap-2 overflow-hidden pr-2">
                {selectedRoles.length > 0 ? (
                  selectedRoles.map((role) => (
                    <span
                      key={role}
                      className="px-2 py-1 bg-violet-50 rounded text-violet-500 text-xs font-medium font-['Golos_Text'] leading-none whitespace-nowrap"
                    >
                      {role}
                    </span>
                  ))
                ) : (
                  <span className="text-zinc-400 text-sm font-normal font-['Golos_Text'] leading-tight">
                    Select
                  </span>
                )}
              </div>
              {showRoleDropdown ? (
                <FiChevronUp className="w-5 h-5 text-zinc-400" />
              ) : (
                <FiChevronDown className="w-5 h-5 text-zinc-400" />
              )}
            </div>

            {showRoleDropdown && (
              <div
                ref={roleDropdownRef}
                className="absolute top-[calc(100%+8px)] left-0 w-full p-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20"
              >
                {availableRoles.length > 0 ? (
                  availableRoles.map((role) => (
                    <label
                      key={role}
                      className="self-stretch h-8 px-2 py-1 rounded flex items-center gap-2 cursor-pointer hover:bg-violet-50 transition-colors duration-150"
                    >
                      {selectedRoles.includes(role) ? (
                        <FaSquareCheck className="w-5 h-5 text-violet-500" />
                      ) : (
                        <FaRegSquare className="w-5 h-5 text-neutral-300" />
                      )}
                      <input
                        type="checkbox"
                        className="hidden" // Hide native checkbox
                        checked={selectedRoles.includes(role)}
                        onChange={() => handleRoleChange(role)}
                      />
                      <span className="flex-1 text-neutral-800 text-sm font-normal font-['Golos_Text'] leading-tight">
                        {role}
                      </span>
                    </label>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm px-2 py-1">No roles available.</p>
                )}
              </div>
            )}
          </div>

          {/* Job Title */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <label className="rounded-xl inline-flex justify-start items-start gap-1">
              <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                Job title
              </span>
              <span className="text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">*</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              className="self-stretch h-10 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-violet-500 text-gray-700 text-sm font-normal font-['Golos_Text'] leading-tight"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>

          {/* Spacer to push buttons to bottom in scrollable content */}
          <div className="flex-grow"></div>

          {/* Action Buttons */}
          <div className="self-stretch px-6 py-4 border-t border-gray-200 flex justify-end items-center gap-3 mt-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-20 py-0.5 flex justify-center items-center gap-1 text-neutral-800 text-sm font-semibold font-['Golos_Text'] leading-tight hover:bg-gray-100 rounded transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 px-3 py-2 bg-neutral-800 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-700 transition-colors duration-200 text-white text-sm font-semibold font-['Golos_Text'] leading-tight"
            >
              Send SMS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModal;