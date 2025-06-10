import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/seller/Header";
import SearchBarAndFilter from "../../components/seller/SearchBarAndFilter";
import StaffCard from "../../components/seller/StaffCard";
import QuickViewPanel from "../../components/seller/QuickViewPanel";
import ResolveBookingsModal from "../../components/seller/ResolveBookingsModal";
import ConfirmInactivationModal from "../../components/seller/ConfirmInactivationModal";
import StaffDetailModal from "../../components/seller/StaffDetailModal"; // Import the new modal
import { staffData as initialStaffData } from "../../lib/staffData";

const StaffManagement = () => {
  const [activeTab, setActiveTab] = useState("Active Staff");
  const [allStaffData, setAllStaffData] = useState(initialStaffData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [filters, setFilters] = useState(() => {
    const allUniqueRoles = [
      ...new Set(initialStaffData.flatMap((staff) => staff.roles)),
    ];
    return { roles: allUniqueRoles, serviceSearchTerm: "" };
  });
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [showResolveBookingsModal, setShowResolveBookingsModal] = useState(false);
  const [showConfirmInactivationModal, setShowConfirmInactivationModal] = useState(false);
  const [staffToInactivate, setStaffToInactivate] = useState(null);
  const [showStaffDetailModal, setShowStaffDetailModal] = useState(false); // State for StaffDetailModal

  const applyFilters = useCallback(() => {
    let currentFilteredStaff = allStaffData;

    if (activeTab === "Active Staff") {
      currentFilteredStaff = currentFilteredStaff.filter(
        (staff) => staff.status === "Online" || staff.status === "Break"
      );
    } else if (activeTab === "Inactive Staff") {
      currentFilteredStaff = currentFilteredStaff.filter(
        (staff) => staff.status === "Offline"
      );
    }

    if (filters.roles.length > 0) {
      currentFilteredStaff = currentFilteredStaff.filter((staff) =>
        staff.roles.some((role) => filters.roles.includes(role))
      );
    } else if (filters.roles.length === 0 && activeTab !== "Calendar View") {
      currentFilteredStaff = [];
    }

    if (filters.serviceSearchTerm) {
      const lowerCaseSearchTerm = filters.serviceSearchTerm.toLowerCase();
      currentFilteredStaff = currentFilteredStaff.filter((staff) =>
        staff.services.some((service) =>
          service.toLowerCase().includes(lowerCaseSearchTerm)
        )
      );
    }

    const results = currentFilteredStaff.filter((staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredStaff(results);

    if (
      selectedStaff &&
      !results.some((staff) => staff.id === selectedStaff.id)
    ) {
      setSelectedStaff(null);
    } else if (!selectedStaff && results.length > 0) {
      setSelectedStaff(results[0]);
    }
  }, [searchTerm, activeTab, allStaffData, filters, selectedStaff]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    if (filteredStaff.length > 0 && !selectedStaff) {
      const ava = filteredStaff.find((staff) => staff.name === "Ava Thompson");
      if (ava) {
        setSelectedStaff(ava);
      } else {
        setSelectedStaff(filteredStaff[0]);
      }
    }
  }, [filteredStaff, selectedStaff]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm("");
    const allUniqueRoles = [
      ...new Set(initialStaffData.flatMap((s) => s.roles)),
    ];
    setFilters({ roles: allUniqueRoles, serviceSearchTerm: "" });
    setSelectedStaff(null);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleApplyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSelectStaff = useCallback((staff) => {
    setSelectedStaff(staff);
  }, []);

  const handleToggleStatus = useCallback((staffId) => {
    const staff = allStaffData.find((s) => s.id === staffId);
    if (!staff) return;

    if (staff.status === "Offline") {
      setAllStaffData((prevStaffData) =>
        prevStaffData.map((s) =>
          s.id === staffId ? { ...s, status: "Online" } : s
        )
      );
      setSelectedStaff((prevSelected) =>
        prevSelected && prevSelected.id === staffId
          ? { ...prevSelected, status: "Online" }
          : prevSelected
      );
    } else {
      setStaffToInactivate(staff);
      if (staff.hasUpcomingBookings) {
        setShowResolveBookingsModal(true);
      } else {
        setShowConfirmInactivationModal(true);
      }
    }
  }, [allStaffData]);


  const confirmInactivation = useCallback(() => {
    if (staffToInactivate) {
      setAllStaffData((prevStaffData) =>
        prevStaffData.map((s) =>
          s.id === staffToInactivate.id ? { ...s, status: "Offline" } : s
        )
      );
      setSelectedStaff((prevSelected) =>
        prevSelected && prevSelected.id === staffToInactivate.id
          ? { ...prevSelected, status: "Offline" }
          : prevSelected
      );
    }
    setShowConfirmInactivationModal(false);
    setStaffToInactivate(null);
  }, [staffToInactivate]);

  const handleReassignOrCancelClick = useCallback(() => {
    console.log("Navigating to booking reassignment/cancellation for:", staffToInactivate.name);
    setShowResolveBookingsModal(false);
  }, [staffToInactivate]);

  const handleRemoveStaff = useCallback((staffId) => {
    if (window.confirm("Are you sure you want to remove this staff member?")) {
      setAllStaffData((prevStaffData) =>
        prevStaffData.filter((staff) => staff.id !== staffId)
      );
      setSelectedStaff((prevSelected) =>
        prevSelected && prevSelected.id === staffId ? null : prevSelected
      );
      // Close the detail modal if the removed staff was being edited
      if (selectedStaff && selectedStaff.id === staffId) {
        setShowStaffDetailModal(false);
      }
    }
  }, [selectedStaff]);

  const handleEditStaff = useCallback((staffId) => {
    const staffToEdit = allStaffData.find(s => s.id === staffId);
    if (staffToEdit) {
      setSelectedStaff(staffToEdit); // Ensure the selected staff is the one being edited
      setShowStaffDetailModal(true); // Show the staff detail modal
    }
  }, [allStaffData]);

  const handleSaveStaffDetail = useCallback((updatedStaff) => {
    setAllStaffData((prevStaffData) =>
      prevStaffData.map((s) =>
        s.id === updatedStaff.id ? updatedStaff : s
      )
    );
    setSelectedStaff(updatedStaff); // Update selected staff in QuickViewPanel
    setShowStaffDetailModal(false); // Close the modal
  }, []);

  // New handler for adding staff
  const handleAddStaff = useCallback((newStaff) => {
    setAllStaffData((prevStaffData) => [...prevStaffData, newStaff]);
    console.log("Added new staff:", newStaff);
    // Optionally, select the newly added staff member
    setSelectedStaff(newStaff);
  }, []);


  return (
    <div className="min-h-screen  p-5 font-['Golos_Text']">
      <div className="self-stretch bg-white p-5 rounded-lg flex flex-col justify-start items-start gap-4 max-[475px]:text-[12px] max-[475px]:p-1">
        <Header activeTab={activeTab} onTabChange={handleTabChange} />
        <SearchBarAndFilter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          allStaffData={allStaffData}
          onApplyFilters={handleApplyFilters}
          currentFilters={filters}
          onAddStaff={handleAddStaff} // Pass the new handler
        />

        <div className="self-stretch flex-1 flex justify-start items-start gap-8 ">
          <div className="flex-1 self-stretch flex justify-start items-start gap-3 flex-wrap content-start pr-2">
            {filteredStaff.length > 0 ? (
              filteredStaff.map((staff) => (
                <StaffCard
                  key={staff.id}
                  staff={staff}
                  onSelectStaff={handleSelectStaff}
                  isActive={selectedStaff && selectedStaff.id === staff.id}
                  onEdit={handleEditStaff}
                  onToggleStatus={handleToggleStatus}
                  onRemove={handleRemoveStaff}
                />
              ))
            ) : (
              <p className="text-gray-500 w-full text-center py-10">
                No staff members found matching your criteria.
              </p>
            )}
          </div>

          <div className="w-80 h-full sticky top-5 max-[475px]:hidden">
            <QuickViewPanel selectedStaff={selectedStaff} />
          </div>
        </div>
      </div>

      {/* Modals */}
      {showResolveBookingsModal && staffToInactivate && (
        <div className="fixed inset-0 bg-[#00000081] flex justify-center items-center z-40">
          <ResolveBookingsModal
            onClose={() => {
              setShowResolveBookingsModal(false);
              setStaffToInactivate(null);
            }}
            staffName={staffToInactivate.name}
            onReassignOrCancelClick={handleReassignOrCancelClick}
          />
        </div>
      )}

      {showConfirmInactivationModal && staffToInactivate && (
        <div className="fixed inset-0 bg-[#00000081] flex justify-center items-center z-40">
          <ConfirmInactivationModal
            onClose={() => {
              setShowConfirmInactivationModal(false);
              setStaffToInactivate(null);
            }}
            staffName={staffToInactivate.name}
            onConfirmInactivate={confirmInactivation}
          />
        </div>
      )}

      {/* Staff Detail Modal */}
      {showStaffDetailModal && selectedStaff && (
        <StaffDetailModal
          staff={selectedStaff}
          onClose={() => setShowStaffDetailModal(false)}
          onSave={handleSaveStaffDetail}
          onRemove={handleRemoveStaff} // Pass onRemove to the modal for direct removal
        />
      )}
    </div>
  );
};
export default StaffManagement;