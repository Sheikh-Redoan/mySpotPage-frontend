// src/components/staff-settings/ReceptionistPermissions.jsx
import React from 'react'; // No need for useState directly here as it's handled by ToggleSwitch
import { GoChevronRight } from 'react-icons/go';
import ToggleSwitch from '../common/ToggleSwitch'; // Import the reusable ToggleSwitch component

function ReceptionistPermissions() {
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs */}
      <div className="inline-flex items-center gap-2 text-sm">
        <span className="text-gray-400">Staff Management</span>
        <GoChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-400">Settings</span>
        <GoChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-950 font-normal">Receptionist Permissions</span>
      </div>

      {/* Permissions Section */}
      <div className="bg-white rounded-xl p-4 flex flex-col gap-6">
        <div className="flex flex-col gap-4"> {/* Added this div for consistent spacing */}
          {/* Section Header (Optional, if you want a title for receptionist settings) */}
          {/* <h3 className="text-gray-950 text-base font-medium leading-normal">
            Receptionist Specific Settings
          </h3>
          <p className="text-gray-400 text-sm font-normal leading-tight">
            Configure permissions specific to receptionists here.
          </p> */}
        </div>

        {/* Use the reusable ToggleSwitch component */}
        <div className=" p-4 rounded-lg"> {/* Added wrapper for styling from image */}
          <ToggleSwitch
            label="Full Booking Management"
            description="Receptionists can manage appointments, assign staff, and handle walk-ins or reschedules."
            initialState={true} // As per your image, it's initially on
          />
        </div>
      </div>
    </div>
  );
}

export default ReceptionistPermissions;