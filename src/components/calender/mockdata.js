import dayjs from "dayjs";

// Helper function to create event dates within a week
const createEventDate = (timeString, dayOffset = 0) => {
  // Start with today and add any offset days (0-6 for a week)
  const baseDate = dayjs().add(dayOffset, "day");
  // Format as YYYY-MM-DD
  const dateStr = baseDate.format("YYYY-MM-DD");
  // Combine with the time string
  return `${dateStr}T${timeString}`;
};
export const MOCK_RESOURCES = [
  {
    id: "pixel-nomad",
    name: "Pixel Nomad",
    avatar: "https://placehold.co/40x40/FF5733/ffffff?text=PN",
  },
  {
    id: "code-voyager",
    name: "Code Voyager",
    avatar: "https://placehold.co/40x40/33A0FF/ffffff?text=CV",
  },
  {
    id: "echo-sage",
    name: "Echo Sage",
    avatar: "https://placehold.co/40x40/33FF57/ffffff?text=ES",
  },
  {
    id: "nebula-drift",
    name: "Nebula Drift",
    avatar: "https://placehold.co/40x40/FF33E0/ffffff?text=ND",
  },
  {
    id: "shadow-quill",
    name: "Shadow Quill",
    avatar: "https://placehold.co/40x40/8D33FF/ffffff?text=SQ",
  },
  {
    id: "anna-hilton",
    name: "Anna Hilton",
    avatar: "https://placehold.co/40x40/FF8C00/ffffff?text=AH",
  },
];

export const MOCK_EVENTS = [
  // Day 0 (Today)
  {
    id: "c1",
    resourceId: "pixel-nomad",
    start: createEventDate("09:00:00", 0),
    title: "Jessica",
    status: "Confirmed",
    vip: true,
  },
  {
    id: "c2",
    resourceId: "code-voyager",
    start: createEventDate("10:30:00", 0),
    title: "Robert",
    status: "Completed",
  },
  {
    id: "c3",
    resourceId: "echo-sage",
    start: createEventDate("14:00:00", 0),
    title: "Olivia",
    status: "Confirmed",
  },

  // Day 1
  {
    id: "c4",
    resourceId: "nebula-drift",
    start: createEventDate("09:00:00", 1),
    title: "William",
    status: "Confirmed",
    vip: true,
  },
  {
    id: "c5",
    resourceId: "shadow-quill",
    start: createEventDate("11:00:00", 1),
    title: "Sophia",
    status: "Completed",
  },
  {
    id: "c6",
    resourceId: "anna-hilton",
    start: createEventDate("15:30:00", 1),
    title: "Noah",
    status: "Confirmed",
  },

  // Day 2
  {
    id: "c7",
    resourceId: "pixel-nomad",
    start: createEventDate("10:00:00", 2),
    title: "Emma",
    status: "Completed",
    vip: true,
  },
  {
    id: "c8",
    resourceId: "code-voyager",
    start: createEventDate("13:00:00", 2),
    title: "Liam",
    status: "Confirmed",
  },
  {
    id: "c9",
    resourceId: "echo-sage",
    start: createEventDate("16:00:00", 2),
    title: "Ava",
    status: "Completed",
  },

  // Day 3
  {
    id: "c10",
    resourceId: "nebula-drift",
    start: createEventDate("09:30:00", 3),
    title: "Isabella",
    status: "Confirmed",
    vip: true,
  },
  {
    id: "c11",
    resourceId: "shadow-quill",
    start: createEventDate("11:30:00", 3),
    title: "James",
    status: "Completed",
  },
  {
    id: "c12",
    resourceId: "anna-hilton",
    start: createEventDate("14:00:00", 3),
    title: "Charlotte",
    status: "Confirmed",
    vip: true,
  },

  // Day 4
  {
    id: "c13",
    resourceId: "pixel-nomad",
    start: createEventDate("09:00:00", 4),
    title: "Benjamin",
    status: "Confirmed",
    vip: true,
  },
  {
    id: "c14",
    resourceId: "code-voyager",
    start: createEventDate("13:30:00", 4),
    title: "Mia",
    status: "Completed",
    vip: true,
  },
  {
    id: "c15",
    resourceId: "echo-sage",
    start: createEventDate("16:30:00", 4),
    title: "Elijah",
    status: "Confirmed",
  },

  // Day 5
  {
    id: "c16",
    resourceId: "nebula-drift",
    start: createEventDate("10:00:00", 5),
    title: "Amelia",
    status: "Completed",
  },
  {
    id: "c17",
    resourceId: "shadow-quill",
    start: createEventDate("14:30:00", 5),
    title: "Oliver",
    status: "Confirmed",
    vip: true,
  },
  {
    id: "c18",
    resourceId: "anna-hilton",
    start: createEventDate("16:00:00", 5),
    title: "Harper",
    status: "Completed",
  },

  // Day 6
  {
    id: "c19",
    resourceId: "pixel-nomad",
    start: createEventDate("11:00:00", 6),
    title: "Lucas",
    status: "Confirmed",
  },
  {
    id: "c20",
    resourceId: "code-voyager",
    start: createEventDate("15:00:00", 6),
    title: "Evelyn",
    status: "Completed",
    vip: true,
  },
  {
    id: "c21",
    resourceId: "echo-sage",
    start: createEventDate("09:30:00", 6),
    title: "Mason",
    status: "Confirmed",
  },
];

export const specialDatesData = [
  {
    date: "2025-07-07",
    isBusy: false,
    timeSlots: [
      { time: "09:00", isBusy: false },
      { time: "10:00", isBusy: true },
      { time: "11:00", isBusy: false },
      { time: "14:00", isBusy: true },
      { time: "15:00", isBusy: true },
    ],
  },
  {
    date: "2025-07-06",
    isBusy: false,
    timeSlots: [
      { time: "09:00", isBusy: false },
      { time: "10:00", isBusy: false, sale: "🔥 15% OFF" },
      { time: "14:00", isBusy: true },
      { time: "15:00", isBusy: true },
    ],
  },
  {
    date: "2025-07-01",
    isBusy: true,
    timeSlots: [
      { time: "09:00", isBusy: true },
      { time: "10:00", isBusy: true },
      { time: "14:00", isBusy: true },
      { time: "15:00", isBusy: false },
    ],
  },
  {
    date: "2025-07-02",
    isBusy: true,
    timeSlots: [
      { time: "09:00", isBusy: true },
      { time: "10:00", isBusy: false, sale: "🔥 25% OFF" },
      { time: "14:00", isBusy: true },
      { time: "15:00", isBusy: true },
    ],
  },
  {
    date: "2025-07-03",

    timeSlots: [
      { time: "09:00", isBusy: false },
      { time: "10:00", isBusy: false, sale: "🔥 25% OFF" },
      { time: "14:00", isBusy: false },
      { time: "15:00", isBusy: false, sale: "🔥 25% OFF" },
    ],
  },
  {
    date: "2025-07-04",
    isBusy: false,
    timeSlots: [
      { time: "09:00", isBusy: false, sale: "🔥 10% OFF" },
      { time: "10:00", isBusy: false, sale: "🔥 10% OFF" },
      { time: "14:00", isBusy: true },
      { time: "15:00", isBusy: true },
    ],
  },
  {
    date: "2025-07-05",
    isBusy: false,
    timeSlots: [
      { time: "09:00", isBusy: false },
      { time: "10:00", isBusy: true },
      { time: "14:00", isBusy: true },
      { time: "15:00", isBusy: true },
    ],
  },
  {
    date: "2025-06-28",
    isBusy: true,
    timeSlots: [
      { time: "09:00", isBusy: true },
      { time: "10:00", isBusy: true },
      { time: "14:00", isBusy: true },
      { time: "15:00", isBusy: true },
    ],
  },
  {
    date: "2025-06-27",
    isBusy: true,
    timeSlots: [
      { time: "09:00", isBusy: true },
      { time: "10:00", isBusy: true },
      { time: "14:00", isBusy: true },
      { time: "15:00", isBusy: true },
    ],
  },
  {
    date: "2025-06-30",
    sale: "🔥 50% OFF",
    timeSlots: [
      { time: "09:00", isBusy: false, sale: "🔥 50% OFF" },
      { time: "10:00", isBusy: false, sale: "🔥 50% OFF" },
      { time: "14:00", isBusy: false, sale: "🔥 50% OFF" },
      { time: "15:00", isBusy: false, sale: "🔥 50% OFF" },
    ],
  },
];
