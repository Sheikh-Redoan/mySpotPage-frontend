import React, { useState, useEffect } from "react";
import Header from "../../components/seller/Header";
import SearchBarAndFilter from "../../components/seller//SearchBarAndFilter";
import StaffCard from "../../components/seller//StaffCard";
import QuickViewPanel from "../../components/seller//QuickViewPanel";
import { staffData } from "../../lib/staffData"; // Import your mock data


const StaffManagement = () => {
const [activeTab, setActiveTab] = useState("Active Staff");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null); // State for quick view

  useEffect(() => {
    // For this example, we'll filter all staff data.
    // In a real application, you might filter based on 'active' status as well.
    const results = staffData.filter((staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStaff(results);
  }, [searchTerm, activeTab]); // Re-run filter if tab changes or search term changes

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm(""); // Clear search when changing tabs
    setSelectedStaff(null); // Clear selected staff when changing tabs
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleSelectStaff = (staff) => {
    setSelectedStaff(staff);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 font-['Golos_Text']">
      <div className="self-stretch bg-white p-5 rounded-lg shadow-md flex flex-col justify-start items-start gap-4">
        <Header activeTab={activeTab} onTabChange={handleTabChange} />
        <SearchBarAndFilter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        <div className="self-stretch flex-1 flex justify-start items-start gap-8">
          <div className="flex-1 self-stretch flex justify-start items-start gap-3 flex-wrap content-start overflow-auto pr-2">
            {filteredStaff.length > 0 ? (
              filteredStaff.map((staff) => (
                <StaffCard
                  key={staff.id}
                  staff={staff}
                  onSelectStaff={handleSelectStaff}
                />
              ))
            ) : (
              <p className="text-gray-500 w-full text-center py-10">
                No staff members found.
              </p>
            )}
          </div>

          <div className="w-80 h-full">
            {selectedStaff ? (
              <div className="p-4 bg-white rounded-xl border border-gray-200 flex flex-col justify-start items-center gap-4 h-full">
                {/* This section would display detailed info of selectedStaff */}
                <h3 className="text-lg font-semibold">{selectedStaff.name}</h3>
                <img
                  src={selectedStaff.image}
                  alt={selectedStaff.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <p>
                  <strong>Roles:</strong> {selectedStaff.roles.join(", ")}
                </p>
                <p>
                  <strong>Position:</strong> {selectedStaff.position}
                </p>
                <p>
                  <strong>Status:</strong> {selectedStaff.status}
                </p>
                {/* Add more details here based on your data structure */}
                <button
                  className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
                  onClick={() => setSelectedStaff(null)}
                >
                  Clear Selection
                </button>
              </div>
            ) : (
              <QuickViewPanel />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffManagement