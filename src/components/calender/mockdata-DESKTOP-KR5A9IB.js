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
  // Events for January 2025 (as in previous month view)
  {
    id: "m1",
    resourceId: "pixel-nomad",
    start: "2025-01-02T14:00:00",
    title: "Emily",
    status: "Confirmed",
  },
  // ...existing January events...

  // Events for Week View (June 2025, as in original resource timeline)
  {
    id: "w1",
    resourceId: "pixel-nomad",
    start: "2025-06-02T14:00:00",
    title: "Alexander",
    status: "Confirmed",
    vip: true,
  },
  // ...existing June events...

  // Additional events for current month (June 2025)
  {
    id: "c1",
    resourceId: "pixel-nomad",
    start: "2025-06-15T09:00:00",
    title: "Jessica",
    status: "Confirmed",
    vip: true,
  },
  {
    id: "c2",
    resourceId: "code-voyager",
    start: "2025-06-15T10:30:00",
    title: "Robert",
    status: "Completed",
  },
  {
    id: "c3",
    resourceId: "echo-sage",
    start: "2025-06-15T14:00:00",
    title: "Olivia",
    status: "Confirmed",
  },
  {
    id: "c4",
    resourceId: "nebula-drift",
    start: "2025-06-16T09:00:00",
    title: "William",
    status: "Confirmed",
    vip: true,
  },
  {
    id: "c5",
    resourceId: "shadow-quill",
    start: "2025-06-16T11:00:00",
    title: "Sophia",
    status: "Completed",
  },
  {
    id: "c6",
    resourceId: "anna-hilton",
    start: "2025-06-16T15:30:00",
    title: "Noah",
    status: "Confirmed",
  },
  {
    id: "c7",
    resourceId: "pixel-nomad",
    start: "2025-06-17T10:00:00",
    title: "Emma",
    status: "Completed",
    vip: true,
  },
  {
    id: "c8",
    resourceId: "code-voyager",
    start: "2025-06-17T13:00:00",
    title: "Liam",
    status: "Confirmed",
  },
  {
    id: "c9",
    resourceId: "echo-sage",
    start: "2025-06-17T16:00:00",
    title: "Ava",
    status: "Completed",
  },
  {
    id: "c10",
    resourceId: "nebula-drift",
    start: "2025-06-18T09:30:00", // Today
    title: "Isabella",
    status: "Confirmed",
    vip: true,
  },
  {
    id: "c11",
    resourceId: "shadow-quill",
    start: "2025-06-18T11:30:00", // Today
    title: "James",
    status: "Completed",
  },
  {
    id: "c12",
    resourceId: "anna-hilton",
    start: "2025-06-18T14:00:00", // Today
    title: "Charlotte",
    status: "Confirmed",
    vip: true,
  },
  {
    id: "c13",
    resourceId: "pixel-nomad",
    start: "2025-06-18T09:00:00",
    title: "Benjamin",
    status: "Confirmed",
    vip: true,
  },
  {
    id: "c14",
    resourceId: "code-voyager",
    start: "2025-06-19T13:30:00",
    title: "Mia",
    status: "Completed",
    vip: true,
  },
  {
    id: "c15",
    resourceId: "echo-sage",
    start: "2025-06-19T16:30:00",
    title: "Elijah",
    status: "Confirmed",
  },
  {
    id: "c16",
    resourceId: "nebula-drift",
    start: "2025-06-20T10:00:00",
    title: "Amelia",
    status: "Completed",
  },
  {
    id: "c17",
    resourceId: "shadow-quill",
    start: "2025-06-20T14:30:00",
    title: "Oliver",
    status: "Confirmed",
    vip: true,
  },
  {
    id: "c18",
    resourceId: "anna-hilton",
    start: "2025-06-20T16:00:00",
    title: "Harper",
    status: "Completed",
  },
  {
    id: "c19",
    resourceId: "pixel-nomad",
    start: "2025-06-21T11:00:00",
    title: "Lucas",
    status: "Confirmed",
  },
  {
    id: "c20",
    resourceId: "code-voyager",
    start: "2025-06-21T15:00:00",
    title: "Evelyn",
    status: "Completed",
    vip: true,
  },
  {
    id: "c21",
    resourceId: "echo-sage",
    start: "2025-06-22T09:30:00",
    title: "Mason",
    status: "Confirmed",
  },
  {
    id: "c22",
    resourceId: "nebula-drift",
    start: "2025-06-22T13:00:00",
    title: "Abigail",
    status: "Confirmed",
    vip: true,
  },
  {
    id: "c23",
    resourceId: "shadow-quill",
    start: "2025-06-25T10:30:00",
    title: "Ethan",
    status: "Completed",
  },
  {
    id: "c24",
    resourceId: "anna-hilton",
    start: "2025-06-25T15:30:00",
    title: "Elizabeth",
    status: "Confirmed",
    vip: true,
  },
  {
    id: "c25",
    resourceId: "pixel-nomad",
    start: "2025-06-28T11:00:00",
    title: "Matthew",
    status: "Completed",
  },
  {
    id: "c26",
    resourceId: "code-voyager",
    start: "2025-06-28T14:30:00",
    title: "Sofia",
    status: "Confirmed",
  },
  {
    id: "c27",
    resourceId: "echo-sage",
    start: "2025-06-30T09:00:00",
    title: "Daniel",
    status: "Confirmed",
    vip: true,
  },
  {
    id: "c28",
    resourceId: "nebula-drift",
    start: "2025-06-30T13:30:00",
    title: "Victoria",
    status: "Completed",
  },

  // Events for Day View (January 6, 2025, as in last day view)
  {
    id: "d1",
    resourceId: "code-voyager",
    start: "2025-01-06T08:00:00",
    title: "Sophia",
    status: "Completed",
  },
  // ...existing day view events...
];

export const specialDatesData = [
  {
    date: "2025-06-01",
    isBusy: true,
    timeSlots: [
      { time: "09:00", isBusy: true },
      { time: "10:00", isBusy: true },
      { time: "11:00", isBusy: false },
      { time: "14:00", isBusy: true },
      { time: "15:00", isBusy: true },
    ],
  },
  {
    date: "2025-06-02",
    isBusy: true,
    timeSlots: [
      { time: "09:00", isBusy: true },
      { time: "10:00", isBusy: false, sale: "🔥 15% OFF" },
      { time: "14:00", isBusy: true },
      { time: "15:00", isBusy: true },
    ],
  },
  {
    date: "2025-06-06",
    sale: "🔥 25% OFF",
    timeSlots: [
      { time: "09:00", isBusy: false, sale: "🔥 25% OFF" },
      { time: "10:00", isBusy: false, sale: "🔥 25% OFF" },
      { time: "14:00", isBusy: false, sale: "🔥 25% OFF" },
      { time: "15:00", isBusy: false, sale: "🔥 25% OFF" },
    ],
  },
  {
    date: "2025-06-08",
    isBusy: true,
    timeSlots: [
      { time: "09:00", isBusy: true },
      { time: "10:00", isBusy: true },
      { time: "14:00", isBusy: true },
      { time: "15:00", isBusy: false },
    ],
  },
  {
    date: "2025-06-11",
    isBusy: true,
    timeSlots: [
      { time: "09:00", isBusy: true },
      { time: "10:00", isBusy: false, sale: "🔥 25% OFF" },
      { time: "14:00", isBusy: true },
      { time: "15:00", isBusy: true },
    ],
  },
  {
    date: "2025-06-14",

    timeSlots: [
      { time: "09:00", isBusy: false, sale: "🔥 25% OFF" },
      { time: "10:00", isBusy: false, sale: "🔥 25% OFF" },
      { time: "14:00", isBusy: false, sale: "🔥 25% OFF" },
      { time: "15:00", isBusy: false, sale: "🔥 25% OFF" },
    ],
  },
  {
    date: "2025-06-15",

    isBusy: true,
    timeSlots: [
      { time: "09:00", isBusy: true, sale: "🔥 10% OFF" },
      { time: "10:00", isBusy: false, sale: "🔥 10% OFF" },
      { time: "14:00", isBusy: true },
      { time: "15:00", isBusy: true },
    ],
  },
  {
    date: "2025-06-16",
    isBusy: true,
    timeSlots: [
      { time: "09:00", isBusy: true },
      { time: "10:00", isBusy: true },
      { time: "14:00", isBusy: true },
      { time: "15:00", isBusy: true },
    ],
  },
  {
    date: "2025-06-17",
    isBusy: true,
    timeSlots: [
      { time: "09:00", isBusy: true },
      { time: "10:00", isBusy: true },
      { time: "14:00", isBusy: true },
      { time: "15:00", isBusy: true },
    ],
  },
  {
    date: "2025-06-22",
    isBusy: true,
    timeSlots: [
      { time: "09:00", isBusy: true },
      { time: "10:00", isBusy: true },
      { time: "14:00", isBusy: true },
      { time: "15:00", isBusy: true },
    ],
  },
  {
    date: "2025-06-23",
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
