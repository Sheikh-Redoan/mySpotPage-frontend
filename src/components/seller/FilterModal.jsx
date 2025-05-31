// src/components/seller/FilterModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { FaSquareCheck, FaRegSquare } from "react-icons/fa6";

const FilterModal = ({
  onClose,
  allStaffData,
  onApplyFilters,
  currentFilters,
}) => {
  const modalRef = useRef(null);

  const [selectedRoles, setSelectedRoles] = useState(currentFilters.roles);
  const [serviceSearchTerm, setServiceSearchTerm] = useState(
    currentFilters.serviceSearchTerm
  );

  const [showRoles, setShowRoles] = useState(true);
  const [showServices, setShowServices] = useState(true);

  const uniqueRoles = Array.from(
    new Set(allStaffData.flatMap((staff) => staff.roles))
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleAllRolesChange = () => {
    if (uniqueRoles.length > 0 && selectedRoles.length === uniqueRoles.length) {
      setSelectedRoles([]);
    } else {
      setSelectedRoles([...uniqueRoles]);
    }
  };

  const handleRoleChange = (role) => {
    setSelectedRoles((prevSelectedRoles) =>
      prevSelectedRoles.includes(role)
        ? prevSelectedRoles.filter((r) => r !== role)
        : [...prevSelectedRoles, role]
    );
  };

  const handleReset = () => {
    const allInitialRoles = Array.from(
      new Set(allStaffData.flatMap((staff) => staff.roles))
    );
    setSelectedRoles(allInitialRoles);
    setServiceSearchTerm("");
    onApplyFilters({ roles: allInitialRoles, serviceSearchTerm: "" });
    onClose();
  };

  const handleApply = () => {
    onApplyFilters({ roles: selectedRoles, serviceSearchTerm });
    onClose();
  };

  return (
    <div
      ref={modalRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 pb-3 bg-white rounded-xl shadow-[0px_6px_12px_0px_rgba(0,0,0,0.10)] border border-gray-200 flex flex-col justify-start items-start gap-3 z-50"
    >
      {/* Modal Header */}
      <div className="w-full px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <h2 className="flex-1 text-gray-950 text-lg font-semibold font-['Golos_Text'] leading-relaxed">
          Filter
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <IoClose size={20} />
        </button>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-3 overflow-hidden">
        {/* Roles Section */}
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <button
            className="self-stretch px-4 py-2 inline-flex justify-between items-center w-full"
            onClick={() => setShowRoles(!showRoles)}
          >
            <span className="flex-1 text-neutral-800 text-sm font-semibold font-['Golos_Text'] leading-tight text-left">
              Role
            </span>
            {showRoles ? (
              <FiChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <FiChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {showRoles && (
            <div className="self-stretch flex flex-col">
              <label className="self-stretch px-4 py-1 rounded inline-flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                <FaSquareCheck
                  className={`w-5 h-5 ${
                    selectedRoles.length === uniqueRoles.length && uniqueRoles.length > 0
                      ? "text-violet-500"
                      : "text-gray-400"
                  }`}
                  onClick={handleAllRolesChange}
                />
                <span className="flex-1 text-neutral-800 text-sm font-normal font-['Golos_Text'] leading-tight">
                  All Roles
                </span>
              </label>
              {uniqueRoles.map((role) => (
                <label
                  key={role} // Key for individual role checkboxes
                  className="self-stretch px-4 py-1 rounded inline-flex items-center gap-2 cursor-pointer hover:bg-gray-50"
                >
                  {selectedRoles.includes(role) ? (
                    <FaSquareCheck className="w-5 h-5 text-violet-500" />
                  ) : (
                    <FaRegSquare className="w-5 h-5 text-gray-400" />
                  )}
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedRoles.includes(role)}
                    onChange={() => handleRoleChange(role)}
                  />
                  <span className="flex-1 text-neutral-800 text-sm font-normal font-['Golos_Text'] leading-tight">
                    {role}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="self-stretch px-4">
          <div className="self-stretch h-px bg-gray-100"></div>
        </div>

        {/* Services Section */}
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <button
            className="self-stretch px-4 py-2 inline-flex justify-between items-center w-full"
            onClick={() => setShowServices(!showServices)}
          >
            <span className="flex-1 text-neutral-800 text-sm font-semibold font-['Golos_Text'] leading-tight text-left">
              Services
            </span>
            {showServices ? (
              <FiChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <FiChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {showServices && (
            <div className="self-stretch px-4 flex flex-col justify-start items-start gap-1">
              <div className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 inline-flex justify-start items-center gap-2">
                <CiSearch className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 text-gray-500 text-sm font-normal font-['Golos_Text'] leading-tight focus:outline-none"
                  value={serviceSearchTerm}
                  onChange={(e) => setServiceSearchTerm(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="self-stretch px-4 inline-flex justify-start items-center gap-2">
        <button
          onClick={handleReset}
          className="flex-1 h-10 px-3 py-2 bg-white rounded-lg border border-neutral-800 flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors duration-200 text-neutral-800 text-sm font-semibold font-['Golos_Text'] leading-tight"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="flex-1 h-10 px-3 py-2 bg-neutral-800 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-700 transition-colors duration-200 text-white text-sm font-semibold font-['Golos_Text'] leading-tight"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterModal;