// src/components/calendarManagement/StaffCalendarWeekView.jsx
import React from 'react';
import dayjs from 'dayjs';
import { MoreVertical } from 'lucide-react'; // Using lucide-react for icons

// Mock Appointments Data (adjust dates to match your current week for testing)
// This data will be filtered and displayed.
const mockAppointments = [
  { id: 'app1', staffId: 5, date: '2025-01-05', time: '14:00', client: 'Alexander', status: 'completed' },
  { id: 'app2', staffId: 5, date: '2025-01-05', time: '15:00', client: 'Emily', status: 'completed' },
  { id: 'app3', staffId: 5, date: '2025-01-08', time: '14:00', client: 'Scarlett', status: 'completed' },
  { id: 'app4', staffId: 5, date: '2025-01-08', time: '15:00', client: 'Emily', status: 'completed' },
  { id: 'app5', staffId: 5, date: '2025-01-08', time: '16:00', client: 'Thomas', status: 'completed' },
  { id: 'app6', staffId: 5, date: '2025-01-08', time: '17:00', client: 'Alexander', status: 'seller-confirmed' },
  { id: 'app7', staffId: 5, date: '2025-01-09', time: '14:00', client: 'Alexander', status: 'seller-confirmed' },
  { id: 'app8', staffId: 5, date: '2025-01-09', time: '15:00', client: 'Michael', status: 'seller-confirmed' },
  { id: 'app9', staffId: 5, date: '2025-01-09', time: '16:00', client: 'Emily', status: 'seller-confirmed' },
  { id: 'app10', staffId: 5, date: '2025-01-09', time: '17:00', client: 'Thomas', status: 'seller-confirmed' },
  { id: 'app11', staffId: 5, date: '2025-01-10', time: '14:00', client: 'Michael', status: 'seller-confirmed' },
  { id: 'app12', staffId: 5, date: '2025-01-10', time: '15:00', client: 'Alexander', status: 'seller-confirmed' },
  { id: 'app13', staffId: 3, date: '2025-01-06', time: '09:30', client: 'Client A', status: 'booked' },
  { id: 'app14', staffId: 3, date: '2025-01-06', time: '10:00', client: 'Client B', status: 'pending' },
  { id: 'app15', staffId: 3, date: '2025-01-06', time: '11:00', client: 'Client C', status: 'completed' },
  { id: 'app16', staffId: 3, date: '2025-01-07', time: '08:00', client: 'Client D', status: 'booked' },
  { id: 'app17', staffId: 8, date: '2025-01-07', time: '10:00', client: 'Client E', status: 'booked' },
  { id: 'app18', staffId: 8, date: '2025-01-07', time: '11:00', client: 'Client F', status: 'pending' },
  { id: 'app19', staffId: 10, date: '2025-01-07', time: '13:00', client: 'Client G', status: 'completed' },
  { id: 'app20', staffId: 10, date: '2025-01-07', time: '14:00', client: 'Client H', status: 'booked' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return 'bg-green-500';
    case 'booked': return 'bg-blue-500';
    case 'pending': return 'bg-yellow-500';
    case 'seller-confirmed': return 'bg-purple-500';
    default: return 'bg-gray-400';
  }
};

const StaffCalendarWeekView = ({ weekDays, displayedStaff }) => {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {/* Calendar Header Row - Days of the Week */}
      <div className="grid grid-cols-8 bg-violet-50 ">
        <div className="col-span-1 pl-28"></div> {/* Empty corner for staff column */}
        {weekDays.map((day, index) => (
          <div
            key={day.format("YYYY-MM-DD")}
            className={`flex flex-col items-center justify-center py-2 px-2.5 border-l border-violet-100 ${day.isSame(dayjs(), 'day') ? 'bg-violet-100' : ''}`}
          >
            <div className="text-violet-500 text-sm font-semibold uppercase">
              {day.format("ddd")}
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-normal leading-tight ${
                day.isSame(dayjs(), 'day') ? 'bg-violet-600 text-white' : 'text-gray-900'
              }`}
            >
              {day.format("DD")}
            </div>
          </div>
        ))}
      </div>

      {/* Calendar Body: Staff Rows and Appointments */}
      <div className="min-h-[400px] overflow-auto">
        {displayedStaff.length > 0 ? (
          displayedStaff.map((staff) => (
            <div key={staff.id} className="grid grid-cols-8 border-t border-gray-200">
              {/* Staff Info Column */}
              <div className="col-span-1 bg-violet-50 p-3 border-r border-violet-100 flex flex-col items-center justify-center gap-1">
                <div className="p-1 rounded-full  outline-1 outline-violet-300">
                  <img src={staff.image} alt={staff.name} className="w-12 h-12 rounded-full object-cover" />
                </div>
                <div className="text-center text-gray-950 text-sm font-normal leading-tight">
                  {staff.name.split(' ')[0]} {staff.name.split(' ')[1]}
                </div>
              </div>

              {/* Daily Appointment Cells */}
              {weekDays.map((day) => {
                const dateStr = day.format("YYYY-MM-DD");
                const dailyAppointments = mockAppointments.filter(
                  (app) => app.staffId === staff.id && app.date === dateStr
                );
                const visibleAppointments = dailyAppointments.slice(0, 3); // Show up to 3 appointments
                const hiddenAppointmentsCount = dailyAppointments.length - visibleAppointments.length;

                return (
                  <div
                    key={`${staff.id}-${dateStr}`}
                    className="flex-1 p-1 bg-white border-l border-gray-200 flex flex-col items-start gap-2 overflow-hidden"
                  >
                    {visibleAppointments.map((app) => (
                      <div key={app.id} className="self-stretch h-6 p-1 rounded inline-flex justify-center items-center hover:bg-gray-100 cursor-pointer">
                        <div className="flex-1 flex justify-start items-center gap-2">
                          <div className={`w-1.5 h-1.5 ${getStatusColor(app.status)} rounded-full`} />
                          <div className="flex-1 flex justify-start items-center gap-1">
                            <div className="w-9 justify-start text-zinc-700 text-xs font-normal leading-none">{app.time}</div>
                            <div className="text-zinc-700 text-xs font-normal leading-none">-</div>
                            <div className="flex-1 justify-start text-zinc-700 text-xs font-normal leading-none truncate">
                              {app.client}
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
                          {hiddenAppointmentsCount} others
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">No staff selected or found.</div>
        )}
      </div>
    </div>
  );
};

export default StaffCalendarWeekView;