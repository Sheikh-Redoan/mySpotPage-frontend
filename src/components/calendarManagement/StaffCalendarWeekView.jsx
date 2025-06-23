// src/components/calendarManagement/StaffCalendarWeekView.jsx
import dayjs from "dayjs";
import { MoreVertical } from "lucide-react";

const StaffCalendarWeekView = ({
  weekDays = [],
  displayedStaff = [],
  allAppointments = [],
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "booked":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      case "seller-confirmed":
        return "bg-purple-500";
      default:
        return "bg-gray-400";
    }
  };

  const getDailyAppointments = (staffId, dateStr) => {
    try {
      return allAppointments.filter(
        (app) => app?.staffId === staffId && app?.date === dateStr
      );
    } catch (error) {
      console.error("Error filtering appointments:", error);
      return [];
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {/* Outer container for horizontal scrolling */}
      <div className="overflow-x-auto">
        {/* Fixed width container to enable scrolling */}
        <div className="min-w-[700px]">
          {/* Calendar Header Row - Days of the Week */}
          <div className="grid grid-cols-[120px_repeat(7,1fr)] bg-violet-50">
            <div className="col-span-1 sticky left-0 z-10 bg-violet-50"></div>
            {weekDays.map((day) => (
              <div
                key={day.format("YYYY-MM-DD")}
                className={`flex flex-col items-center justify-center py-2 px-2.5 border-l border-violet-100 ${
                  day.isSame(dayjs(), "day") ? "bg-violet-100" : ""
                }`}
              >
                <div className="text-violet-500 text-sm font-semibold uppercase">
                  {day.format("ddd")}
                </div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-normal leading-tight ${
                    day.isSame(dayjs(), "day")
                      ? "bg-violet-600 text-white"
                      : "text-gray-900"
                  }`}
                >
                  {day.format("DD")}
                </div>
              </div>
            ))}
          </div>

          {/* Calendar Body: Staff Rows and Appointments */}
          <div className="min-h-[400px]">
            {displayedStaff.length > 0 ? (
              displayedStaff.map((staff) => (
                <div
                  key={staff.id}
                  className="grid grid-cols-[120px_repeat(7,1fr)] border-t border-gray-200 relative"
                >
                  {/* Staff Info Column - Fixed */}
                  <div className="col-span-1 sticky left-0 z-10 bg-violet-50 p-3 border-r border-violet-100 flex flex-col items-center justify-center gap-1">
                    <div className="p-1 rounded-full outline-1 outline-violet-300">
                      <img
                        src={staff.image || "/default-avatar.png"}
                        alt={staff.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-avatar.png";
                        }}
                      />
                    </div>
                    <div className="text-center text-gray-950 text-sm font-normal leading-tight">
                      {staff.name?.split(" ").slice(0, 2).join(" ")}
                    </div>
                  </div>

                  {/* Daily Appointment Cells - Scrollable with the header */}
                  {weekDays.map((day) => {
                    const dateStr = day.format("YYYY-MM-DD");
                    const dailyAppointments = getDailyAppointments(
                      staff.id,
                      dateStr
                    );
                    const visibleAppointments = dailyAppointments.slice(0, 3);
                    const hiddenAppointmentsCount = Math.max(
                      0,
                      dailyAppointments.length - 3
                    );

                    return (
                      <div
                        key={`${staff.id}-${dateStr}`}
                        className="flex-1 p-1 bg-white border-l border-gray-200 flex flex-col items-start gap-2 overflow-hidden"
                      >
                        {visibleAppointments.map((app) => (
                          <div
                            key={app.id}
                            className="self-stretch h-6 p-1 rounded inline-flex justify-center items-center hover:bg-gray-100 cursor-pointer"
                          >
                            <div className="flex-1 flex justify-start items-center gap-2">
                              <div
                                className={`w-1.5 h-1.5 ${getStatusColor(
                                  app?.status
                                )} rounded-full`}
                              />
                              <div className="flex-1 flex justify-start items-center gap-1">
                                <div className="w-9 justify-start text-zinc-700 text-xs font-normal leading-none">
                                  {app?.time || ""}
                                </div>
                                <div className="text-zinc-700 text-xs font-normal leading-none">
                                  -
                                </div>
                                <div className="flex-1 justify-start text-zinc-700 text-xs font-normal leading-none truncate">
                                  {app?.client || ""}
                                </div>
                              </div>
                            </div>
                            <div className="w-4 h-4 relative overflow-hidden">
                              <MoreVertical size={14} color="#6B7280" />
                            </div>
                          </div>
                        ))}
                        {hiddenAppointmentsCount > 0 && (
                          <div className="self-stretch h-6 p-1 rounded inline-flex justify-center items-center gap-2">
                            <div className="flex-1 justify-start text-zinc-700 text-xs font-normal leading-none">
                              +{hiddenAppointmentsCount} more
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                No staff selected or found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffCalendarWeekView;