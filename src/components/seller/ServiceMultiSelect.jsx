import React, { useState, useEffect, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi"; // Search icon
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io"; // Chevron icons

const ServiceMultiSelect = ({ allAvailableServices, selectedServices, onServiceChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredServices = allAvailableServices.filter((service) =>
    service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (service) => {
    onServiceChange(service);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger for the dropdown */}
      <div
        className={`self-stretch h-10 px-3 py-2 bg-white rounded-lg border inline-flex justify-between items-center gap-2 cursor-pointer w-full ${
          isOpen ? "border-violet-500" : "border-gray-200"
        } focus-within:border-violet-500`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex-1 text-zinc-700 text-sm font-normal font-['Golos_Text'] leading-tight">
          {selectedServices.length > 0 ? "Select" : "Select"} {/* Text always says "Select" */}
        </span>
        {isOpen ? (
          <IoIosArrowUp className="w-6 h-6 text-gray-500" />
        ) : (
          <IoIosArrowDown className="w-6 h-6 text-gray-500" />
        )}
      </div>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full p-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-80 overflow-y-auto scrollbar-hidden ">
          {/* Search Bar */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1 mb-2">
            <div className="self-stretch h-10 px-3 py-2 bg-white rounded-lg border border-gray-200 inline-flex justify-start items-center gap-2">
              <HiOutlineSearch className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 text-zinc-700 text-sm font-normal font-['Golos_Text'] leading-tight focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Service List */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1 pr-2">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <label
                  key={index}
                  className="self-stretch h-8 px-2 py-1 rounded inline-flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                >
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service)}
                    onChange={() => handleCheckboxChange(service)}
                    className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-sm checked:bg-violet-500 checked:border-violet-500 checked:after:content-['\2713'] checked:after:text-white checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-sm checked:after:font-bold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all duration-150"
                  />
                  <span className="flex-1 text-neutral-800 text-sm font-normal font-['Golos_Text'] leading-tight">
                    {service}
                  </span>
                </label>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No services found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceMultiSelect;