import React, { useState, useEffect, useRef } from "react";

// Inline SVG for CalendarDays icon (LuCalendarDays equivalent)
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

// Inline SVG for Clock icon (LuClock equivalent)
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

// Inline SVG for CloseOutline icon (IoCloseOutline equivalent)
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

// Inline SVG for Trash icon (LuTrash equivalent)
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

// ServiceMultiSelect component (copied from the provided file structure)
// Path: src/components/seller/ServiceMultiSelect.jsx
const ServiceMultiSelect = ({ allAvailableServices, selectedServices, onServiceChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredServices = allAvailableServices.filter((service) =>
    service.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedServices.includes(service) // Only show unselected services
  );

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search and add services..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)} // Delay to allow click on options
        className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 text-zinc-700 text-sm font-normal font-['Golos_Text'] leading-tight focus:outline-none focus:border-violet-500"
      />
      {isDropdownOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div
                key={service}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-zinc-700 text-sm font-normal font-['Golos_Text'] leading-tight"
                onMouseDown={() => { // Use onMouseDown to prevent onBlur from closing immediately
                  onServiceChange(service);
                  setSearchTerm(""); // Clear search after selecting
                }}
              >
                {service}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500 text-sm">No services found.</div>
          )}
        </div>
      )}
    </div>
  );
};


const StaffDetailModal = ({ staff, onClose, onSave, onRemove }) => {
  const fileInputRef = useRef(null); // Ref for the hidden file input

  const [formData, setFormData] = useState({
    profileImage: staff?.image || "https://placehold.co/80x80/aabbcc/ffffff?text=Staff", // Default placeholder image
    firstName: staff?.name.split(" ")[0] || "",
    lastName: staff?.name.split(" ").slice(1).join(" ") || "",
    phoneNumber: staff?.phone || "",
    dateOfBirth: "01/01/1990", // Placeholder, as not available in staffData
    gender: "Female", // Placeholder, as not available in staffData
    roles: staff?.roles || [],
    jobTitle: staff?.position || "",
    services: staff?.services || [],
    status: staff?.status || "Online",
    workingShifts: staff?.workingShifts || [], // Initialize with provided shifts
  });

  const [activeTab, setActiveTab] = useState("Basic Information");

  useEffect(() => {
    if (staff) {
      setFormData({
        profileImage: staff.image || "https://placehold.co/80x80/aabbcc/ffffff?text=Staff", // Default placeholder
        firstName: staff.name.split(" ")[0] || "",
        lastName: staff.name.split(" ").slice(1).join(" ") || "",
        phoneNumber: staff.phone || "",
        dateOfBirth: "01/01/1990",
        gender: "Female",
        roles: staff.roles || [],
        jobTitle: staff.position || "",
        services: staff.services || [],
        status: staff.status || "Online",
        workingShifts: staff.workingShifts || [], // Ensure shifts are loaded
      });
    }
  }, [staff]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRoleChange = (roleToAdd) => {
    setFormData((prev) => {
      const newRoles = prev.roles.includes(roleToAdd)
        ? prev.roles.filter((role) => role !== roleToAdd)
        : [...prev.roles, roleToAdd];
      return { ...prev, roles: newRoles };
    });
  };

  const handleServiceChange = (service) => {
    setFormData((prev) => {
      const newServices = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: newServices };
    });
  };

  const handleStatusToggle = () => {
    setFormData((prev) => ({
      ...prev,
      status: prev.status === "Offline" ? "Online" : "Offline",
    }));
  };

  const handleShiftToggle = (dayIndex) => {
    setFormData((prev) => {
      const newShifts = [...prev.workingShifts];
      newShifts[dayIndex] = {
        ...newShifts[dayIndex],
        isOn: !newShifts[dayIndex].isOn,
        // Reset times if toggled off
        startTime: newShifts[dayIndex].isOn ? "" : (newShifts[dayIndex].startTime || "09:00"),
        endTime: newShifts[dayIndex].isOn ? "" : (newShifts[dayIndex].endTime || "17:00"),
        breakOn: newShifts[dayIndex].isOn ? false : newShifts[dayIndex].breakOn,
        breakStartTime: newShifts[dayIndex].isOn ? "" : newShifts[dayIndex].breakStartTime,
        breakEndTime: newShifts[dayIndex].isOn ? "" : newShifts[dayIndex].breakEndTime,
      };
      return { ...prev, workingShifts: newShifts };
    });
  };

  const handleShiftTimeChange = (dayIndex, field, value) => {
    setFormData((prev) => {
      const newShifts = [...prev.workingShifts];
      newShifts[dayIndex] = {
        ...newShifts[dayIndex],
        [field]: value,
      };
      return { ...prev, workingShifts: newShifts };
    });
  };

  const handleBreakToggle = (dayIndex) => {
    setFormData((prev) => {
      const newShifts = [...prev.workingShifts];
      newShifts[dayIndex] = {
        ...newShifts[dayIndex],
        breakOn: !newShifts[dayIndex].breakOn,
        // Reset break times if toggled off
        breakStartTime: newShifts[dayIndex].breakOn ? "" : (newShifts[dayIndex].breakStartTime || "12:00"),
        breakEndTime: newShifts[dayIndex].breakOn ? "" : (newShifts[dayIndex].breakEndTime || "13:00"),
      };
      return { ...prev, workingShifts: newShifts };
    });
  };

  const handleBreakTimeChange = (dayIndex, field, value) => {
    setFormData((prev) => {
      const newShifts = [...prev.workingShifts];
      newShifts[dayIndex] = {
        ...newShifts[dayIndex],
        [field]: value,
      };
      return { ...prev, workingShifts: newShifts };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStaff = {
      ...staff,
      name: `${formData.firstName} ${formData.lastName}`,
      image: formData.profileImage,
      phone: formData.phoneNumber,
      roles: formData.roles,
      position: formData.jobTitle,
      services: formData.services,
      workingShifts: formData.workingShifts, // Save updated shifts
      status: formData.status,
    };
    onSave(updatedStaff);
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
    "Precision Cutting", "Texturizing & Thinning", "Blowout Styling", "Updo Styling", "Hair Perm",
    "Cold Perm", "Volume Perm", "Beach Wave Perm", "Keratin Treatment", "Keratin Infusion Therapy",
    "Brazilian Blowout", "Frizz-Free Smoothing", "Management", "Client Relations", "Strategic Planning",
    "HR", "Staff Training", "Scheduling", "Appointments", "Billing", "Customer Service", "Product Sales",
    "Check-ins", "Phone Support", "Cash Handling", "Data Entry", "Swedish", "Deep Tissue", "Hot Stone",
    "Aromatherapy", "Thai", "Reflexology", "Prenatal", "Trigger Point", "Foot Massage", "Advanced Booking",
    "Complaint Resolution", "Event Coordination", "Rehabilitation", "Injury Assessment", "Pain Management",
    "Exercise Therapy", "Consultation", "Diet Plans", "Fitness Training", "Mindfulness", "Facials",
    "Chemical Peels", "Microdermabrasion", "Waxing", "Eyelash Extensions",
  ].sort();

  const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
    const hours = Math.floor(i / 4);
    const minutes = (i % 4) * 15;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  });


  return (
    <div className="fixed inset-0 bg-neutral-800/50 flex justify-end items-stretch z-50 overflow-hidden">
      <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl bg-white flex flex-col justify-start items-start overflow-hidden">
        <div className="self-stretch h-14 px-5 border-b border-gray-200 flex justify-between items-center">
          <div className="flex-1 text-gray-950 text-base font-semibold font-['Golos_Text'] leading-normal">
            Staff detail
          </div>
          <CloseOutlineIcon
            onClick={onClose}
            className="w-6 h-6 flex justify-center items-center text-gray-600 hover:text-gray-900"
          />
        </div>

        <form onSubmit={handleSubmit} className="self-stretch flex-1 p-5 bg-white flex flex-col gap-5 overflow-auto scrollbar-hidden">
          <div className="self-stretch flex justify-start items-end">
            <button
              type="button"
              className={`flex-1 px-8 py-3 border-b-2 max-[700px]:text-[14px] ${
                activeTab === "Basic Information"
                  ? "border-violet-500 text-violet-500 font-semibold"
                  : "border-gray-200 text-gray-700 font-normal"
              } flex justify-center items-center text-base font-['Golos_Text'] leading-normal transition-colors duration-200`}
              onClick={() => setActiveTab("Basic Information")}
            >
              Basic Information
            </button>
            <button
              type="button"
              className={`flex-1 px-8 py-3 border-b-2 max-[700px]:text-[14px] ${
                activeTab === "Working Shift"
                  ? "border-violet-500 text-violet-500 font-semibold"
                  : "border-gray-200 text-gray-700 font-normal"
              } flex justify-center items-center text-base font-['Golos_Text'] leading-normal transition-colors duration-200`}
              onClick={() => setActiveTab("Working Shift")}
            >
              Working Shift
            </button>
          </div>

          {activeTab === "Basic Information" && (
            <div className="self-stretch flex-1 flex flex-col justify-start items-start gap-4">
              {/* Profile Image and Activate/Inactivate */}
              <div className="self-stretch flex flex-col md:flex-row md:items-center md:justify-between gap-4"> {/* Responsive: flex-col on small, flex-row on medium and up */}
                <div className="relative flex flex-col justify-start items-start gap-3">
                  <div className="inline-flex justify-start items-start gap-1">
                    <div className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                      Profile image
                    </div>
                    <div className="text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">
                      *
                    </div>
                  </div>
                  <div className="w-20 h-20 relative rounded-full flex flex-col justify-center items-center overflow-hidden border border-gray-200">
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x80/aabbcc/ffffff?text=Staff"; }}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()} // Trigger hidden file input click
                      className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center px-2 py-1 text-white text-xs font-semibold font-['Golos_Text'] leading-none opacity-0 hover:opacity-100 transition-opacity duration-200"
                    >
                      Change
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                    />
                  </div>
                </div>
                <div className="flex justify-start items-center gap-2"> {/* Adjusted flex for just the toggle */}
                  <span className="text-gray-400 text-sm font-normal font-['Golos_Text'] leading-tight">
                    Inactivate
                  </span>
                  <button
                    type="button"
                    onClick={handleStatusToggle}
                    className={`w-9 h-5 p-0.5 rounded-xl flex items-center transition-colors duration-200 ${
                      formData.status === "Online" || formData.status === "Break"
                        ? "bg-violet-500 justify-end"
                        : "bg-gray-300 justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-[0px_8px_16px_0px_rgba(1,23,113,0.06)]" />
                  </button>
                  <span className="text-gray-400 text-sm font-normal font-['Golos_Text'] leading-tight">
                    Activate
                  </span>
                </div>
                {/* "Remove this staff" button moved to footer */}
              </div>

              {/* First Name & Last Name */}
              <div className="self-stretch flex flex-col md:flex-row gap-4"> {/* Responsive: stacks on small, side-by-side on medium and up */}
                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <label htmlFor="firstName" className="inline-flex justify-start items-start gap-1">
                    <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                      First name
                    </span>
                    <span className="text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 text-zinc-700 text-sm font-normal font-['Golos_Text'] leading-tight focus:outline-none focus:border-violet-500"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <label htmlFor="lastName" className="inline-flex justify-start items-start gap-1">
                    <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                      Last name
                    </span>
                    <span className="text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 text-zinc-700 text-sm font-normal font-['Golos_Text'] leading-tight focus:outline-none focus:border-violet-500"
                    required
                  />
                </div>
              </div>

              {/* Phone Number & Date of Birth */}
              <div className="self-stretch flex flex-col md:flex-row gap-4"> {/* Responsive: stacks on small, side-by-side on medium and up */}
                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <label htmlFor="phoneNumber" className="inline-flex justify-start items-start gap-1">
                    <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                      Phone number
                    </span>
                    <span className="text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 text-zinc-700 text-sm font-normal font-['Golos_Text'] leading-tight focus:outline-none focus:border-violet-500"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <label htmlFor="dateOfBirth" className="inline-flex justify-start items-start gap-1">
                    <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                      Date of birth
                    </span>
                    <span className="text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">
                      *
                    </span>
                  </label>
                  <div className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 inline-flex justify-start items-center gap-2 focus-within:border-violet-500">
                    <input
                      type="text"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="flex-1 text-zinc-700 text-sm font-normal font-['Golos_Text'] leading-tight focus:outline-none"
                      placeholder="DD/MM/YYYY"
                      required
                    />
                    <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="inline-flex justify-start items-start gap-1">
                  <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                    Gender
                  </span>
                  <span className="text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">
                    *
                  </span>
                </div>
                <div className="flex flex-wrap gap-4"> {/* Responsive: wraps on small screens */}
                  <label className="flex justify-start items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                      className="w-5 h-5 appearance-none rounded-full border-2 border-gray-300 checked:border-violet-500 checked:bg-violet-500 checked:ring-2 checked:ring-violet-500 checked:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all duration-150"
                    />
                    <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                      Male
                    </span>
                  </label>
                  <label className="flex justify-start items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                      className="w-5 h-5 appearance-none rounded-full border-2 border-gray-300 checked:border-violet-500 checked:bg-violet-500 checked:ring-2 checked:ring-violet-500 checked:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all duration-150"
                    />
                    <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                      Female
                    </span>
                  </label>
                  <label className="flex justify-start items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={formData.gender === "Other"}
                      onChange={handleChange}
                      className="w-5 h-5 appearance-none rounded-full border-2 border-gray-300 checked:border-violet-500 checked:bg-violet-500 checked:ring-2 checked:ring-violet-500 checked:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all duration-150"
                    />
                    <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                      Other
                    </span>
                  </label>
                </div>
              </div>

              {/* Role & Job Title */}
              <div className="self-stretch flex flex-col md:flex-row gap-4"> {/* Responsive: stacks on small, side-by-side on medium and up */}
                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <label htmlFor="roles" className="inline-flex justify-start items-start gap-1">
                    <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                      Role
                    </span>
                    <span className="text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">
                      *
                    </span>
                  </label>
                  <div className="self-stretch h-10 px-3 py-2 rounded-lg border border-gray-200 flex justify-between items-center gap-2">
                    <div className="flex-1 flex justify-start items-center gap-2 overflow-x-auto custom-scrollbar">
                      {formData.roles.length > 0 ? (
                        formData.roles.map((role, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-violet-50 rounded text-violet-500 text-xs font-medium font-['Golos_Text'] leading-none flex items-center gap-1"
                          >
                            {role}
                            <button
                              type="button"
                              onClick={() => handleRoleChange(role)}
                              className="text-violet-500 hover:text-violet-700"
                            >
                              &times;
                            </button>
                          </span>
                        ))
                      ) : (
                        <span className="text-zinc-400 text-sm font-normal font-['Golos_Text'] leading-tight">
                          Select roles
                        </span>
                      )}
                    </div>
                    {/* The select element now uses default browser arrow */}
                    <select
                      id="roles"
                      name="roles"
                      onChange={(e) => {
                        if (e.target.value) handleRoleChange(e.target.value);
                      }}
                      value=""
                      className="bg-transparent outline-none cursor-pointer w-6 h-6 text-gray-400" // Removed appearance-none
                    >
                      <option value="" disabled>
                        Add
                      </option>
                      {availableRoles.map((role) => (
                        <option
                          key={role}
                          value={role}
                          disabled={formData.roles.includes(role)}
                        >
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <label htmlFor="jobTitle" className="inline-flex justify-start items-start gap-1">
                    <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                      Job title
                    </span>
                    <span className="text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 text-zinc-700 text-sm font-normal font-['Golos_Text'] leading-tight focus:outline-none focus:border-violet-500"
                    required
                  />
                </div>
              </div>

              {/* Services - Using ServiceMultiSelect */}
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <label htmlFor="services" className="inline-flex justify-start items-start gap-1">
                  <span className="text-neutral-700 text-sm font-normal font-['Golos_Text'] leading-tight">
                    Services
                  </span>
                  <span className="text-red-500 text-sm font-normal font-['Golos_Text'] leading-tight">
                    *
                  </span>
                </label>
                <ServiceMultiSelect
                  allAvailableServices={allAvailableServices}
                  selectedServices={formData.services}
                  onServiceChange={handleServiceChange}
                />
                <div className="text-gray-400 text-xs font-normal font-['Golos_Text'] leading-none">
                  The services this staff member will be responsible for:
                </div>
                <div className="self-stretch inline-flex justify-start items-center gap-2 flex-wrap content-center">
                  {formData.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-violet-50 rounded text-violet-500 text-xs font-medium font-['Golos_Text'] leading-none flex items-center gap-1"
                    >
                      {service}
                      <button
                        type="button"
                        onClick={() => handleServiceChange(service)}
                        className="text-violet-500 hover:text-violet-700"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Working Shift" && (
            <div className="self-stretch flex-1 flex flex-col justify-start items-start gap-4">
              {/* Working Hours Section */}
              <div className="self-stretch p-4 rounded-xl border border-gray-200 flex flex-col justify-start items-start gap-5 overflow-hidden">
                <div className="self-stretch flex flex-col justify-start items-start gap-6">
                  <div className="self-stretch rounded-xl flex flex-col sm:flex-row justify-start items-start sm:items-center gap-3 sm:gap-6"> {/* Responsive for header */}
                    <div className="w-full sm:w-44 text-neutral-800 text-base font-semibold font-['Golos_Text'] leading-normal">
                      Working hours
                    </div>
                    <div className="flex-1 w-full flex justify-start items-center gap-3">
                      <div className="flex-1 text-center text-gray-500 text-sm font-normal font-['Golos_Text'] leading-tight">
                        Start Shift
                      </div>
                      <div className="w-4 text-center text-neutral-600 text-sm font-normal font-['Golos_Text'] leading-tight">-</div>
                      <div className="flex-1 text-center text-gray-500 text-sm font-normal font-['Golos_Text'] leading-tight">
                        End Shift
                      </div>
                    </div>
                  </div>
                  {formData.workingShifts.map((shift, index) => (
                    <div key={shift.day} className="self-stretch rounded-xl flex flex-col sm:flex-row justify-start items-start sm:items-center gap-3 sm:gap-6"> {/* Responsive for each shift row */}
                      <label className="w-full sm:w-44 rounded flex justify-start items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={shift.isOn}
                          onChange={() => handleShiftToggle(index)}
                          className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-sm checked:bg-violet-500 checked:border-violet-500 checked:after:content-['\2713'] checked:after:text-white checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-sm checked:after:font-bold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all duration-150"
                        />
                        <span className="text-neutral-800 text-sm font-semibold font-['Golos_Text'] leading-tight">
                          {shift.day}
                        </span>
                      </label>
                      <div className="flex-1 w-full flex justify-start items-center gap-3">
                        <div className={`flex-1 self-stretch px-3 py-2 rounded-lg border border-gray-200 flex justify-center items-center gap-2 ${!shift.isOn ? 'bg-gray-100 text-gray-500' : 'bg-white text-neutral-800'}`}>
                          {shift.isOn ? (
                            <>
                              <select
                                value={shift.startTime}
                                onChange={(e) => handleShiftTimeChange(index, 'startTime', e.target.value)}
                                className="flex-1 text-center bg-transparent outline-none cursor-pointer text-sm font-normal font-['Golos_Text'] leading-tight"
                              >
                                {timeOptions.map(time => (
                                  <option key={time} value={time.substring(0, 5)}>{time}</option>
                                ))}
                              </select>
                              <ClockIcon className="w-5 h-5 text-gray-400" />
                            </>
                          ) : (
                            <span className="text-gray-500 text-sm font-normal font-['Golos_Text'] leading-tight">Unavailable</span>
                          )}
                        </div>
                        <div className="text-center text-neutral-600 text-sm font-normal font-['Golos_Text'] leading-tight">-</div>
                        <div className={`flex-1 self-stretch px-3 py-2 rounded-lg border border-gray-200 flex justify-center items-center gap-2 ${!shift.isOn ? 'bg-gray-100 text-gray-500' : 'bg-white text-neutral-800'}`}>
                          {shift.isOn ? (
                            <>
                              <select
                                value={shift.endTime}
                                onChange={(e) => handleShiftTimeChange(index, 'endTime', e.target.value)}
                                className="flex-1 text-center bg-transparent outline-none cursor-pointer text-sm font-normal font-['Golos_Text'] leading-tight"
                              >
                                {timeOptions.map(time => (
                                  <option key={time} value={time.substring(0, 5)}>{time}</option>
                                ))}
                              </select>
                              <ClockIcon className="w-5 h-5 text-gray-400" />
                            </>
                          ) : (
                            <span className="text-gray-500 text-sm font-normal font-['Golos_Text'] leading-tight">Unavailable</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Breaking Time Section */}
              <div className="self-stretch p-4 rounded-xl border border-gray-200 flex flex-col justify-start items-start gap-5 overflow-hidden">
                <div className="self-stretch flex flex-col justify-start items-start gap-6">
                  <div className="self-stretch rounded-xl flex flex-col sm:flex-row justify-start items-start sm:items-center gap-3 sm:gap-6"> {/* Responsive for header */}
                    <div className="w-full sm:w-44 text-neutral-800 text-base font-semibold font-['Golos_Text'] leading-normal">
                      Breaking time
                    </div>
                    <div className="flex-1 w-full flex justify-start items-center gap-3">
                      <div className="flex-1 text-center text-gray-500 text-sm font-normal font-['Golos_Text'] leading-tight">
                        Break Start
                      </div>
                      <div className="w-4 text-center text-neutral-600 text-sm font-normal font-['Golos_Text'] leading-tight">-</div>
                      <div className="flex-1 text-center text-gray-500 text-sm font-normal font-['Golos_Text'] leading-tight">
                        Break End
                      </div>
                    </div>
                  </div>
                  {formData.workingShifts.map((shift, index) => (
                    <div key={shift.day} className="self-stretch rounded-xl flex flex-col sm:flex-row justify-start items-start sm:items-center gap-3 sm:gap-6"> {/* Responsive for each break row */}
                      <label className="w-full sm:w-44 rounded flex justify-start items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={shift.breakOn}
                          onChange={() => handleBreakToggle(index)}
                          disabled={!shift.isOn} // Disable break toggle if shift is off
                          className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-sm checked:bg-violet-500 checked:border-violet-500 checked:after:content-['\2713'] checked:after:text-white checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-sm checked:after:font-bold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all duration-150 disabled:bg-gray-100 disabled:border-gray-200"
                        />
                        <span className={`text-sm font-semibold font-['Golos_Text'] leading-tight ${!shift.isOn ? 'text-gray-400' : 'text-neutral-800'}`}>
                          {shift.day}
                        </span>
                      </label>
                      <div className="flex-1 w-full flex justify-start items-center gap-3">
                        <div className={`flex-1 self-stretch px-3 py-2 rounded-lg border border-gray-200 flex justify-center items-center gap-2 ${!shift.breakOn || !shift.isOn ? 'bg-gray-100 text-gray-500' : 'bg-white text-neutral-800'}`}>
                          {shift.breakOn && shift.isOn ? (
                            <>
                              <select
                                value={shift.breakStartTime}
                                onChange={(e) => handleBreakTimeChange(index, 'breakStartTime', e.target.value)}
                                className="flex-1 text-center bg-transparent outline-none cursor-pointer text-sm font-normal font-['Golos_Text'] leading-tight"
                              >
                                {timeOptions.map(time => (
                                  <option key={time} value={time.substring(0, 5)}>{time}</option>
                                ))}
                              </select>
                              <ClockIcon className="w-5 h-5 text-gray-400" />
                            </>
                          ) : (
                            <span className="text-gray-500 text-sm font-normal font-['Golos_Text'] leading-tight">No Break</span>
                          )}
                        </div>
                        <div className="text-center text-neutral-600 text-sm font-normal font-['Golos_Text'] leading-tight">-</div>
                        <div className={`flex-1 self-stretch px-3 py-2 rounded-lg border border-gray-200 flex justify-center items-center gap-2 ${!shift.breakOn || !shift.isOn ? 'bg-gray-100 text-gray-500' : 'bg-white text-neutral-800'}`}>
                          {shift.breakOn && shift.isOn ? (
                            <>
                              <select
                                value={shift.breakEndTime}
                                onChange={(e) => handleBreakTimeChange(index, 'breakEndTime', e.target.value)}
                                className="flex-1 text-center bg-transparent outline-none cursor-pointer text-sm font-normal font-['Golos_Text'] leading-tight"
                              >
                                {timeOptions.map(time => (
                                  <option key={time} value={time.substring(0, 5)}>{time}</option>
                                ))}
                              </select>
                              <ClockIcon className="w-5 h-5 text-gray-400" />
                            </>
                          ) : (
                            <span className="text-gray-500 text-sm font-normal font-['Golos_Text'] leading-tight">No Break</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </form>

        <div className="self-stretch h-14 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <button
            type="button"
            onClick={() => onRemove(staff.id)}
            className="py-0.5 flex justify-center items-center gap-2 text-red-500 text-sm font-semibold font-['Golos_Text'] leading-tight hover:bg-red-50 rounded px-2"
          >
            <TrashIcon className="w-5 h-5" />
            <span>Remove this staff</span>
          </button>
          <div className="flex justify-end items-center gap-3"> {/* Use justify-end to keep save button to the right */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="h-10 px-3 py-2 bg-neutral-800 rounded-lg flex justify-center items-center gap-2 text-white text-sm font-semibold font-['Golos_Text'] leading-tight hover:bg-neutral-700 transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailModal;