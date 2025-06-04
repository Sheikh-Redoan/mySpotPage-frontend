// src/components/staff-settings/ManagerPermissions.jsx
import { getBreadcrumbs } from "../../lib/staticData";
import Breadcrumb from "../client/Breadcrumb";
import ToggleSwitch from "../common/ToggleSwitch";

function ManagerPermissions() {
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs */}
      <Breadcrumb
        breadcrumbs={getBreadcrumbs(0, 3, [
          {
            name: "Staff Management",
            link: "/dashboard/staff-management",
          },
          {
            name: "Settings",
            link: "",
          },
          {
            name: "Manager Permissions",
            link: "/dashboard/staff-management/settings/manager-permissions",
          },
        ])}
      />

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
