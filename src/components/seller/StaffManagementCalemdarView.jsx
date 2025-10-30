// src/components/seller/StaffManagementCalemdarView.jsx
import CustomStaffCalendar from "../../components/reusable/CustomStaffCalendar";
import { mockAppointments } from "../../lib/mockAppointments";

export default function StaffManagementCalemdarView({
  staff,
  allStaffData,
  onApplyFilters,
  currentFilters,
}) {
  return (
    <CustomStaffCalendar
      appointmentsData={mockAppointments}
      staffData={staff} // This is the filtered staff to display
      allStaffForFilter={allStaffData} // This is the complete staff list for the filter modal
      onApplyFilters={onApplyFilters}
      currentFilters={currentFilters}
      initialView="week"
      showHeaderToolbar={true}
      showStaffFilter={true}
      showViewToggle={true}
    />
  );
}