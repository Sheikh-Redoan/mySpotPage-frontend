// src/data/mockAppointments.js
import dayjs from 'dayjs';

const today = dayjs();
// Use a fixed start date for consistent mock data across different runs,
// or adjust it to be dynamic based on the current week/month for real applications.
// For demonstration matching the provided images, let's target Jan 2025.
const fixedDemoDate = dayjs('2025-01-01'); // Start of January for Month view
const fixedDemoWeekSunday = dayjs('2025-01-05'); // Sunday for the week view design

// Generate dynamic dates relative to fixedDemoWeekSunday for the Week view
const getWeekDate = (dayOffset) => fixedDemoWeekSunday.add(dayOffset, 'day').format('YYYY-MM-DD');

export const mockAppointments = [
  // --- Week View Appointments (matching 06 Jan 2025 - 12 Jan 2025 in images) ---
  // Note: Staff IDs (5, 3, 8, 10) are used as examples, adjust as needed.
  // Morgan Blake / Sophia - Sunday (01/05), Monday (01/06)
  { id: 'app_w_1', staffId: 5, date: getWeekDate(0), time: '08:00', client: 'Morgan Blake', status: 'completed', location: 'TCL Beauty Studio 01', services: ['Classic Ombre', 'Smooth / Scalp treatment'], notes: 'shop recommend booking a trim every 6-8 weeks' },
  { id: 'app_w_2', staffId: 3, date: getWeekDate(1), time: '08:00', client: 'Sophia', status: 'completed', location: 'TCL Beauty Studio 01', services: ['Manicure', 'Pedicure'] },

  // Emma / Juliet - Tuesday (01/07), Wednesday (01/08)
  { id: 'app_w_3', staffId: 8, date: getWeekDate(2), time: '09:00', client: 'Emma', status: 'completed', location: 'TCL Beauty Studio 02', services: ['Haircut', 'Styling'] },
  { id: 'app_w_4', staffId: 10, date: getWeekDate(3), time: '10:00', client: 'Juliet', status: 'confirmed', location: 'TCL Beauty Studio 01', services: ['Balayage with Toner'] },

  // Michael / Thomas / Emily / Alexander - Wednesday (01/08), Thursday (01/09), Friday (01/10)
  { id: 'app_w_5', staffId: 5, date: getWeekDate(3), time: '08:00', client: 'Michael', status: 'confirmed', location: 'TCL Beauty Studio 01', services: ['Classic Ombre'] },
  { id: 'app_w_6', staffId: 5, date: getWeekDate(4), time: '10:00', client: 'Emily', status: 'confirmed', location: 'TCL Beauty Studio 01', services: ['Reverse Ombre', 'Shadow Root'] },
  { id: 'app_w_7', staffId: 5, date: getWeekDate(5), time: '10:00', client: 'Thomas', status: 'confirmed', location: 'TCL Beauty Studio 02', services: ['Hair Treatment'] },
  { id: 'app_w_8', staffId: 5, date: getWeekDate(5), time: '11:00', client: 'Alexander', status: 'completed', location: 'TCL Beauty Studio 01', services: ['Deep Tissue Massage'] },
  { id: 'app_w_9', staffId: 5, date: getWeekDate(6), time: '10:00', client: 'Benjamin', status: 'confirmed', location: 'TCL Beauty Studio 02', services: ['Haircut'] },


  // --- Month View Appointments (matching January 2025 in images) ---
  // Using fixedDemoDate to ensure these show up in the Month View
  { id: 'app_m_1', staffId: 5, date: '2025-01-02', time: '14:00', client: 'Emily', status: 'completed' },
  { id: 'app_m_2', staffId: 5, date: '2025-01-02', time: '16:00', client: 'Scarlett', status: 'completed' },
  { id: 'app_m_3', staffId: 5, date: '2025-01-03', time: '14:00', client: 'Emily', status: 'completed' },
  { id: 'app_m_4', staffId: 5, date: '2025-01-03', time: '16:00', client: 'Scarlett', status: 'completed' },
  { id: 'app_m_5', staffId: 5, date: '2025-01-06', time: '14:00', client: 'Emily', status: 'completed' },
  { id: 'app_m_6', staffId: 5, date: '2025-01-06', time: '16:00', client: 'Scarlett', status: 'completed' },
  { id: 'app_m_7', staffId: 5, date: '2025-01-08', time: '15:00', client: 'Alexander', status: 'pending' },
  { id: 'app_m_8', staffId: 5, date: '2025-01-17', time: '14:00', client: 'Emily', status: 'pending' },
  { id: 'app_m_9', staffId: 5, date: '2025-01-17', time: '15:00', client: 'Alexander', status: 'pending' },
  { id: 'app_m_10', staffId: 5, date: '2025-01-19', time: '14:00', client: 'Emily', status: 'pending' },
  { id: 'app_m_11', staffId: 5, date: '2025-01-19', time: '15:00', client: 'Alexander', status: 'pending' },
  { id: 'app_m_12', staffId: 5, date: '2025-01-21', time: '14:00', client: 'Emily', status: 'pending' },
  { id: 'app_m_13', staffId: 5, date: '2025-01-21', time: '15:00', client: 'Alexander', status: 'pending' },
  { id: 'app_m_14', staffId: 5, date: '2025-01-30', time: '14:00', client: 'Emily', status: 'pending' },
  { id: 'app_m_15', staffId: 5, date: '2025-01-30', time: '15:00', client: 'Alexander', status: 'pending' },

  // Add more for Month View to test "3 others"
  { id: 'app_m_16', staffId: 5, date: '2025-01-02', time: '15:00', client: 'Client A', status: 'booked' },
  { id: 'app_m_17', staffId: 5, date: '2025-01-02', time: '17:00', client: 'Client B', status: 'booked' },
  { id: 'app_m_18', staffId: 5, date: '2025-01-02', time: '18:00', client: 'Client C', status: 'booked' },
  { id: 'app_m_19', staffId: 5, date: '2025-01-02', time: '19:00', client: 'Client D', status: 'booked' }, // Will be hidden by "3 others"

  { id: 'app_m_20', staffId: 5, date: '2025-01-06', time: '15:00', client: 'Client E', status: 'booked' },
  { id: 'app_m_21', staffId: 5, date: '2025-01-06', time: '17:00', client: 'Client F', status: 'booked' },
  { id: 'app_m_22', staffId: 5, date: '2025-01-06', time: '18:00', client: 'Client G', status: 'booked' },
  { id: 'app_m_23', staffId: 5, date: '2025-01-06', time: '19:00', client: 'Client H', status: 'booked' }, // Will be hidden by "3 others"

  { id: 'app_m_24', staffId: 5, date: '2025-01-17', time: '16:00', client: 'Client I', status: 'booked' },
  { id: 'app_m_25', staffId: 5, date: '2025-01-17', time: '17:00', client: 'Client J', status: 'booked' },
  { id: 'app_m_26', staffId: 5, date: '2025-01-17', time: '18:00', client: 'Client K', status: 'booked' },
  { id: 'app_m_27', staffId: 5, date: '2025-01-17', time: '19:00', client: 'Client L', status: 'booked' }, // Will be hidden by "3 others"

  { id: 'app_m_28', staffId: 5, date: '2025-01-19', time: '16:00', client: 'Client M', status: 'booked' },
  { id: 'app_m_29', staffId: 5, date: '2025-01-19', time: '17:00', client: 'Client N', status: 'booked' },
  { id: 'app_m_30', staffId: 5, date: '2025-01-19', time: '18:00', client: 'Client O', status: 'booked' },
  { id: 'app_m_31', staffId: 5, date: '2025-01-19', time: '19:00', client: 'Client P', status: 'booked' }, // Will be hidden by "3 others"


  // --- Day View Appointments (matching Fri, 06 Jan 2025 in images) ---
  // Using fixedDemoWeekSunday for the Day view example
  { id: 'app_d_1', staffId: 3, date: getWeekDate(1), time: '08:00', client: 'Sophia', status: 'completed' }, // Monday (01/06)
  { id: 'app_d_2', staffId: 2, date: getWeekDate(1), time: '09:00', client: 'Olivia', status: 'completed' }, // Monday (01/06)
  { id: 'app_d_3', staffId: 5, date: getWeekDate(1), time: '11:00', client: 'Thomas', status: 'confirmed' }, // Monday (01/06)
  { id: 'app_d_4', staffId: 1, date: getWeekDate(1), time: '13:00', client: 'Benjamin', status: 'confirmed' }, // Monday (01/06)
];

// Re-export the staffData as well, ensuring it's available.
// Assuming your staffData.js is correctly set up.
// import { staffData } from './staffData'; // if you want to bundle it here

export default mockAppointments;