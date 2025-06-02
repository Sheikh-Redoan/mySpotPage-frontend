// src/components/staff-settings/ManagerPermissions.jsx
import React, { useState } from "react";
import { GoChevronRight } from "react-icons/go";
import ToggleSwitch from "../common/ToggleSwitch";


function ManagerPermissions() {
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs */}
      <div className="inline-flex items-center gap-2 text-sm">
        <span className="text-gray-400">Staff Management</span>
        <GoChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-400">Settings</span>
        <GoChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-950 font-normal">Manager Permissions</span>
      </div>

      {/* Permissions Section */}
      <div className="bg-white rounded-xl p-4 flex flex-col gap-6">
        <div className="flex justify-between items-start gap-16">
          <div className="flex-1 flex flex-col gap-1">
            <h3 className="text-gray-950 text-base font-medium leading-normal">
              Schedule & Activity Oversight
            </h3>
            <p className="text-gray-400 text-sm font-normal leading-tight">
              Modify staff shifts and break periods while tracking reports and
              logs for better scheduling management.
            </p>
          </div>
          <div className="w-[500px] flex flex-col gap-8">
            <ToggleSwitch
              label="Working schedules & breaking period"
              description="Can modify working shifts, and breaks for all staff."
              initialState={true}
            />
            <ToggleSwitch
              label="Dashboard"
              description="Can view reports and logs related to scheduling but cannot modify core system settings."
              initialState={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerPermissions;