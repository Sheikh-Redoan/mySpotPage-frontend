import React, { useState, useEffect } from "react";
import { LuCalendarDays, LuClock } from "react-icons/lu"; // Calendar and Clock icon
import { IoCloseOutline } from "react-icons/io5"; // Close icon
import { LuTrash } from "react-icons/lu"; // Trash icon for Remove staff
import ServiceMultiSelect from "./ServiceMultiSelect";

const StaffDetailModal = ({ staff, onClose, onSave, onRemove }) => {
  const [formData, setFormData] = useState({
    profileImage: staff?.image || "",
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
        profileImage: staff.image || "",
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
      <div className="w-[840px] bg-white flex flex-col justify-start items-start overflow-hidden">
        <div className="self-stretch h-14 px-5 border-b border-gray-200 flex justify-between items-center">
          <div className="flex-1 text-gray-950 text-base font-semibold font-['Golos_Text'] leading-normal">
            Staff detail
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 flex justify-center items-center text-gray-600 hover:text-gray-900"
            aria-label="Close modal"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="self-stretch flex-1 p-5 bg-white flex flex-col gap-5 overflow-auto scrollbar-hidden">
          <div className="self-stretch flex justify-start items-end">
            <button
              type="button"
              className={`flex-1 px-8 py-3 border-b-2 ${
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
              className={`flex-1 px-8 py-3 border-b-2 ${
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
              {/* Profile Image and Activate/Inactivate/Remove */}
              <div className="self-stretch inline-flex justify-between items-start">
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
                    />
                    <button
                      type="button"
                      className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center px-2 py-1 text-white text-xs font-semibold font-['Golos_Text'] leading-none opacity-0 hover:opacity-100 transition-opacity duration-200"
                    >
                      Change
                    </button>
                  </div>
                </div>
                <div className="flex justify-start items-center gap-4">
                  <div className="flex justify-start items-center gap-2">
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
                  <div className="w-3.5 h-0 origin-top-left rotate-90 border border-gray-200"></div>
                  <button
                    type="button"
                    onClick={() => onRemove(staff.id)}
                    className="py-0.5 flex justify-center items-center gap-2 text-red-500 text-sm font-semibold font-['Golos_Text'] leading-tight hover:bg-red-50 rounded px-2"
                  >
                    <LuTrash className="w-5 h-5" />
                    <span>Remove this staff</span>
                  </button>
                </div>
              </div>

              {/* First Name & Last Name */}
              <div className="self-stretch inline-flex justify-start items-start gap-4">
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
              <div className="self-stretch inline-flex justify-start items-center gap-4">
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
                    <LuCalendarDays className="w-5 h-5 text-gray-400" />
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
                <div className="inline-flex justify-start items-center gap-4">
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
              <div className="self-stretch inline-flex justify-start items-center gap-4">
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
                    <select
                      id="roles"
                      name="roles"
                      onChange={(e) => {
                        if (e.target.value) handleRoleChange(e.target.value);
                      }}
                      value=""
                      className="appearance-none bg-transparent outline-none cursor-pointer w-6 h-6 text-gray-400"
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
                  <div className="self-stretch rounded-xl inline-flex justify-start items-center gap-6">
                    <div className="w-44 text-neutral-800 text-base font-semibold font-['Golos_Text'] leading-normal">
                      Working hours
                    </div>
                    <div className="flex-1 flex justify-start items-center gap-3">
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
                    <div key={shift.day} className="self-stretch rounded-xl inline-flex justify-start items-center gap-6">
                      <label className="w-44 rounded flex justify-start items-center gap-2 cursor-pointer">
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
                      <div className="flex-1 flex justify-start items-center gap-3">
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
                              <LuClock className="w-5 h-5 text-gray-400" />
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
                              <LuClock className="w-5 h-5 text-gray-400" />
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
                  <div className="self-stretch rounded-xl inline-flex justify-start items-center gap-6">
                    <div className="w-44 text-neutral-800 text-base font-semibold font-['Golos_Text'] leading-normal">
                      Breaking time
                    </div>
                    <div className="flex-1 flex justify-start items-center gap-3">
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
                    <div key={shift.day} className="self-stretch rounded-xl inline-flex justify-start items-center gap-6">
                      <label className="w-44 rounded flex justify-start items-center gap-2 cursor-pointer">
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
                      <div className="flex-1 flex justify-start items-center gap-3">
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
                              <LuClock className="w-5 h-5 text-gray-400" />
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
                              <LuClock className="w-5 h-5 text-gray-400" />
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

        <div className="self-stretch h-14 px-6 py-4 border-t border-gray-200 flex justify-end items-center">
          <div className="flex justify-start items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-20 py-0.5 flex justify-center items-center gap-1 text-neutral-800 text-sm font-semibold font-['Golos_Text'] leading-tight hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
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