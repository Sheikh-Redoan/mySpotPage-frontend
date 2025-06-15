import CustomStaffCalendar from "../../components/reusable/CustomStaffCalendar"; // Ensure this import path is correct for CustomStaffCalendar
import {
  mockAppointments, // Use mockAppointments for calendar data
} from "../../lib/mockAppointments"; // Adjust path if needed
import { staffData } from "../../lib/staffData"; // Import staff data

export default function StaffManagementCalemdarView() {
  return (
    <CustomStaffCalendar
      appointmentsData={mockAppointments} 
      staffData={staffData} 
      initialView="week" 
      showHeaderToolbar={true}
      showStaffFilter={true} 
      showViewToggle={false} 
    />
  );
}