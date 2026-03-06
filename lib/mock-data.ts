import {
  type AuthUser,
  type ContestListItem,
  type ContestSubmissionState,
  type DashboardUser,
  type LeaderboardFilter,
  type LeaderboardRow,
  type ProblemAttemptStatus,
  type AdminDashboardData,
  type RecentSubmission,
  type SystemActivity,
  type CourseDetail,
  type LabDetail,
} from "@/lib/types";

const authUsers: AuthUser[] = [
  // ── Platform Admins ──
  {
    id: "user_superadmin_1",
    username: "sourav-super",
    email: "sourav@superadmin",
    password: "password123",
    createdAt: "2024-01-01T00:00:00.000Z",
    rating: 2100,
  },
  {
    id: "user_admin_1",
    username: "sourav-admin",
    email: "sourav@admin",
    password: "password123",
    createdAt: "2024-01-15T00:00:00.000Z",
    rating: 1900,
  },
  // ── Tech University ──
  {
    id: "user_inst1_admin",
    username: "ravi",
    email: "ravi@techuniversity",
    password: "password123",
    createdAt: "2024-03-01T00:00:00.000Z",
    rating: 1750,
  },
  {
    id: "user_inst1_instructor_1",
    username: "ananya",
    email: "ananya@techuniversity",
    password: "password123",
    createdAt: "2024-03-05T00:00:00.000Z",
    rating: 1680,
  },
  {
    id: "user_inst1_instructor_2",
    username: "vikram",
    email: "vikram@techuniversity",
    password: "password123",
    createdAt: "2024-03-05T00:00:00.000Z",
    rating: 1620,
  },
  {
    id: "user_inst1_student_1",
    username: "alice",
    email: "alice@student",
    password: "password123",
    createdAt: "2024-04-03T00:00:00.000Z",
    rating: 1785,
  },
  {
    id: "user_inst1_student_2",
    username: "bob",
    email: "bob@student",
    password: "password123",
    createdAt: "2024-05-10T00:00:00.000Z",
    rating: 1520,
  },
  {
    id: "user_inst1_student_3",
    username: "charlie",
    email: "charlie@student",
    password: "password123",
    createdAt: "2024-06-01T00:00:00.000Z",
    rating: 1450,
  },
  // ── Engineering College ──
  {
    id: "user_inst2_admin",
    username: "meena",
    email: "meena@engineeringcollege",
    password: "password123",
    createdAt: "2024-03-10T00:00:00.000Z",
    rating: 1700,
  },
  {
    id: "user_inst2_instructor_1",
    username: "arjun",
    email: "arjun@engineeringcollege",
    password: "password123",
    createdAt: "2024-03-12T00:00:00.000Z",
    rating: 1650,
  },
  {
    id: "user_inst2_instructor_2",
    username: "priya",
    email: "priya@engineeringcollege",
    password: "password123",
    createdAt: "2024-03-12T00:00:00.000Z",
    rating: 1600,
  },
  {
    id: "user_inst2_student_1",
    username: "diana",
    email: "diana@student",
    password: "password123",
    createdAt: "2024-04-20T00:00:00.000Z",
    rating: 1550,
  },
  {
    id: "user_inst2_student_2",
    username: "ethan",
    email: "ethan@student",
    password: "password123",
    createdAt: "2024-05-15T00:00:00.000Z",
    rating: 1480,
  },
  // ── IIIT Delhi ──
  {
    id: "user_inst3_admin",
    username: "sanjay",
    email: "sanjay@iiitdelhi",
    password: "password123",
    createdAt: "2024-02-20T00:00:00.000Z",
    rating: 1800,
  },
  {
    id: "user_inst3_instructor_1",
    username: "kavita",
    email: "kavita@iiitdelhi",
    password: "password123",
    createdAt: "2024-02-25T00:00:00.000Z",
    rating: 1720,
  },
  {
    id: "user_inst3_student_1",
    username: "fiona",
    email: "fiona@student",
    password: "password123",
    createdAt: "2024-04-10T00:00:00.000Z",
    rating: 1560,
  },
  {
    id: "user_inst3_student_2",
    username: "george",
    email: "george@student",
    password: "password123",
    createdAt: "2024-05-01T00:00:00.000Z",
    rating: 1490,
  },
  // ── NIT Surat ──
  {
    id: "user_inst4_admin",
    username: "lakshmi",
    email: "lakshmi@nitsurat",
    password: "password123",
    createdAt: "2024-04-01T00:00:00.000Z",
    rating: 1760,
  },
  {
    id: "user_inst4_instructor_1",
    username: "rahul",
    email: "rahul@nitsurat",
    password: "password123",
    createdAt: "2024-04-05T00:00:00.000Z",
    rating: 1640,
  },
  {
    id: "user_inst4_student_1",
    username: "hannah",
    email: "hannah@student",
    password: "password123",
    createdAt: "2024-05-20T00:00:00.000Z",
    rating: 1510,
  },
  {
    id: "user_inst4_student_2",
    username: "ian",
    email: "ian@student",
    password: "password123",
    createdAt: "2024-06-10T00:00:00.000Z",
    rating: 1430,
  },
];

const dashboardUsers: DashboardUser[] = [
  {
    id: "user_superadmin_1",
    username: "sourav-super",
    rank: 1,
    joinDate: "2024-01-01T00:00:00.000Z",
    stats: {
      totalSolved: 350,
      totalSubmissions: 480,
      accuracy: 72.9,
      currentStreak: 30,
      contestsParticipated: 25,
    },
    recentActivity: [
      {
        id: "a1",
        title: "Trapping Rain Water",
        difficulty: "Hard",
        solvedAt: "2026-03-02T10:00:00.000Z",
      },
      {
        id: "a2",
        title: "Minimum Window Substring",
        difficulty: "Hard",
        solvedAt: "2026-03-01T14:00:00.000Z",
      },
    ],
  },
  {
    id: "user_admin_1",
    username: "sourav-admin",
    rank: 5,
    joinDate: "2024-01-15T00:00:00.000Z",
    stats: {
      totalSolved: 220,
      totalSubmissions: 310,
      accuracy: 71.0,
      currentStreak: 12,
      contestsParticipated: 18,
    },
    recentActivity: [
      {
        id: "a3",
        title: "Job Scheduling Maximum Profit",
        difficulty: "Hard",
        solvedAt: "2026-02-28T16:00:00.000Z",
      },
    ],
  },
  {
    id: "user_inst1_student_1",
    username: "alice",
    rank: 12,
    joinDate: "2024-04-03T00:00:00.000Z",
    stats: {
      totalSolved: 210,
      totalSubmissions: 299,
      accuracy: 70.2,
      currentStreak: 14,
      contestsParticipated: 16,
    },
    recentActivity: [
      {
        id: "a4",
        title: "Longest Increasing Subsequence",
        difficulty: "Medium",
        solvedAt: "2026-02-11T19:40:00.000Z",
      },
      {
        id: "a5",
        title: "Merge Intervals",
        difficulty: "Medium",
        solvedAt: "2026-02-08T13:55:00.000Z",
      },
    ],
  },
  {
    id: "user_inst1_student_2",
    username: "bob",
    rank: 45,
    joinDate: "2024-05-10T00:00:00.000Z",
    stats: {
      totalSolved: 89,
      totalSubmissions: 153,
      accuracy: 58.2,
      currentStreak: 6,
      contestsParticipated: 9,
    },
    recentActivity: [
      {
        id: "a6",
        title: "Two Sum",
        difficulty: "Easy",
        solvedAt: "2026-02-10T16:20:00.000Z",
      },
      {
        id: "a7",
        title: "Binary Search",
        difficulty: "Easy",
        solvedAt: "2026-02-09T11:10:00.000Z",
      },
    ],
  },
  {
    id: "user_inst1_student_3",
    username: "charlie",
    rank: 78,
    joinDate: "2024-06-01T00:00:00.000Z",
    stats: {
      totalSolved: 45,
      totalSubmissions: 92,
      accuracy: 48.9,
      currentStreak: 3,
      contestsParticipated: 5,
    },
    recentActivity: [
      {
        id: "a8",
        title: "Valid Parentheses",
        difficulty: "Easy",
        solvedAt: "2026-02-07T08:35:00.000Z",
      },
    ],
  },
  {
    id: "user_inst2_student_1",
    username: "diana",
    rank: 30,
    joinDate: "2024-04-20T00:00:00.000Z",
    stats: {
      totalSolved: 134,
      totalSubmissions: 198,
      accuracy: 67.7,
      currentStreak: 8,
      contestsParticipated: 11,
    },
    recentActivity: [
      {
        id: "a9",
        title: "Coin Change",
        difficulty: "Medium",
        solvedAt: "2026-02-10T12:00:00.000Z",
      },
    ],
  },
  {
    id: "user_inst3_student_1",
    username: "fiona",
    rank: 55,
    joinDate: "2024-04-10T00:00:00.000Z",
    stats: {
      totalSolved: 76,
      totalSubmissions: 120,
      accuracy: 63.3,
      currentStreak: 5,
      contestsParticipated: 7,
    },
    recentActivity: [
      {
        id: "a10",
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        solvedAt: "2026-02-09T15:00:00.000Z",
      },
    ],
  },
  {
    id: "user_inst4_student_1",
    username: "hannah",
    rank: 67,
    joinDate: "2024-05-20T00:00:00.000Z",
    stats: {
      totalSolved: 62,
      totalSubmissions: 105,
      accuracy: 59.0,
      currentStreak: 4,
      contestsParticipated: 6,
    },
    recentActivity: [
      {
        id: "a11",
        title: "Maximum Subarray",
        difficulty: "Medium",
        solvedAt: "2026-02-08T10:00:00.000Z",
      },
    ],
  },
];

export const contests: ContestListItem[] = [
  {
    id: "weekly-401",
    title: "CodeArena Weekly 401",
    startTime: "2026-02-16T14:00:00.000Z",
    durationMinutes: 120,
    problems: [
      { id: "p1", title: "Array Partition Check", difficulty: "Easy" },
      { id: "p2", title: "Shortest Path with Boosters", difficulty: "Medium" },
      { id: "p3", title: "Tree Compression Queries", difficulty: "Hard" },
    ],
  },
  {
    id: "biweekly-88",
    title: "CodeArena Biweekly 88",
    startTime: "2026-02-12T15:00:00.000Z",
    durationMinutes: 90,
    problems: [
      { id: "p4", title: "Peak Segment", difficulty: "Easy" },
      { id: "p5", title: "Bitmask Pathing", difficulty: "Medium" },
      { id: "p6", title: "Matrix Re-rooting", difficulty: "Hard" },
    ],
  },
  {
    id: "monthly-12",
    title: "CodeArena Monthly Challenge 12",
    startTime: "2026-01-18T13:00:00.000Z",
    durationMinutes: 180,
    problems: [
      { id: "p7", title: "Palindrome Blocks", difficulty: "Easy" },
      { id: "p8", title: "Interval Booster", difficulty: "Medium" },
      { id: "p9", title: "Dynamic MST Edges", difficulty: "Hard" },
    ],
  },
];

const contestStates: ContestSubmissionState[] = [
  {
    userId: "user_inst1_student_1",
    contestId: "weekly-401",
    problemId: "p1",
    status: "SOLVED",
  },
  {
    userId: "user_inst1_student_1",
    contestId: "weekly-401",
    problemId: "p2",
    status: "UNSOLVED",
  },
  {
    userId: "user_inst1_student_2",
    contestId: "weekly-401",
    problemId: "p1",
    status: "SOLVED",
  },
  {
    userId: "user_inst1_student_2",
    contestId: "weekly-401",
    problemId: "p2",
    status: "NOT_ATTEMPTED",
  },
  {
    userId: "user_inst2_student_1",
    contestId: "biweekly-88",
    problemId: "p4",
    status: "SOLVED",
  },
  {
    userId: "user_inst2_student_1",
    contestId: "biweekly-88",
    problemId: "p5",
    status: "SOLVED",
  },
  {
    userId: "user_inst3_student_1",
    contestId: "monthly-12",
    problemId: "p7",
    status: "SOLVED",
  },
  {
    userId: "user_inst3_student_1",
    contestId: "monthly-12",
    problemId: "p8",
    status: "UNSOLVED",
  },
  {
    userId: "user_inst4_student_1",
    contestId: "monthly-12",
    problemId: "p7",
    status: "SOLVED",
  },
  {
    userId: "user_inst4_student_1",
    contestId: "monthly-12",
    problemId: "p9",
    status: "NOT_ATTEMPTED",
  },
];

const leaderboardData: Record<LeaderboardFilter, LeaderboardRow[]> = {
  weekly: [
    {
      username: "alice",
      rating: 1798,
      problemsSolved: 18,
      contestsParticipated: 1,
    },
    {
      username: "fiona",
      rating: 1572,
      problemsSolved: 11,
      contestsParticipated: 1,
    },
    {
      username: "bob",
      rating: 1540,
      problemsSolved: 9,
      contestsParticipated: 1,
    },
    {
      username: "diana",
      rating: 1530,
      problemsSolved: 9,
      contestsParticipated: 1,
    },
    {
      username: "hannah",
      rating: 1510,
      problemsSolved: 7,
      contestsParticipated: 1,
    },
  ],
  monthly: [
    {
      username: "alice",
      rating: 1785,
      problemsSolved: 57,
      contestsParticipated: 3,
    },
    {
      username: "diana",
      rating: 1550,
      problemsSolved: 38,
      contestsParticipated: 2,
    },
    {
      username: "fiona",
      rating: 1560,
      problemsSolved: 29,
      contestsParticipated: 2,
    },
    {
      username: "bob",
      rating: 1520,
      problemsSolved: 26,
      contestsParticipated: 2,
    },
    {
      username: "hannah",
      rating: 1510,
      problemsSolved: 22,
      contestsParticipated: 2,
    },
  ],
  all_time: [
    {
      username: "sourav-super",
      rating: 2100,
      problemsSolved: 350,
      contestsParticipated: 25,
    },
    {
      username: "sourav-admin",
      rating: 1900,
      problemsSolved: 220,
      contestsParticipated: 18,
    },
    {
      username: "alice",
      rating: 1785,
      problemsSolved: 210,
      contestsParticipated: 16,
    },
    {
      username: "diana",
      rating: 1550,
      problemsSolved: 134,
      contestsParticipated: 11,
    },
    {
      username: "bob",
      rating: 1520,
      problemsSolved: 89,
      contestsParticipated: 9,
    },
    {
      username: "fiona",
      rating: 1560,
      problemsSolved: 76,
      contestsParticipated: 7,
    },
    {
      username: "hannah",
      rating: 1510,
      problemsSolved: 62,
      contestsParticipated: 6,
    },
    {
      username: "charlie",
      rating: 1450,
      problemsSolved: 45,
      contestsParticipated: 5,
    },
  ],
};

export function getAuthUser(identifier: string) {
  const normalized = identifier.trim().toLowerCase();
  return authUsers.find(
    (user) =>
      user.username.toLowerCase() === normalized ||
      user.email.toLowerCase() === normalized,
  );
}

export function getDashboardUser(username: string) {
  return dashboardUsers.find(
    (user) => user.username.toLowerCase() === username.toLowerCase(),
  );
}

export function createMockUser(payload: {
  username: string;
  email: string;
  password: string;
}): { ok: true } | { ok: false; reason: string } {
  const username = payload.username.trim().toLowerCase();
  const email = payload.email.trim().toLowerCase();

  if (authUsers.some((user) => user.username.toLowerCase() === username)) {
    return { ok: false, reason: "Username already exists." };
  }

  if (authUsers.some((user) => user.email.toLowerCase() === email)) {
    return { ok: false, reason: "Email already exists." };
  }

  const id = `u${authUsers.length + 1}`;
  authUsers.push({
    id,
    username,
    email,
    password: payload.password,
    createdAt: new Date().toISOString(),
    rating: 1200,
  });

  dashboardUsers.push({
    id,
    username,
    rank: undefined,
    joinDate: new Date().toISOString(),
    stats: {
      totalSolved: 0,
      totalSubmissions: 0,
      accuracy: 0,
      currentStreak: 0,
      contestsParticipated: 0,
    },
    recentActivity: [],
  });

  return { ok: true };
}

export function getContestById(contestId: string) {
  return contests.find((contest) => contest.id === contestId);
}

export function getProblemStatusForContest(
  contestId: string,
  userId: string,
): Record<string, ProblemAttemptStatus> {
  const output: Record<string, ProblemAttemptStatus> = {};
  for (const state of contestStates) {
    if (state.contestId === contestId && state.userId === userId) {
      output[state.problemId] = state.status;
    }
  }
  return output;
}

export function getLeaderboardRows(filter: LeaderboardFilter) {
  return leaderboardData[filter];
}

// ── Admin Dashboard Mock Data ─────────────────────────────────────

const adminStats = {
  totalUsers: 12543,
  totalProblems: 892,
  totalContests: 156,
  totalSubmissions: 458920,
  activeUsers: 2341,
  systemHealth: "Healthy",
};

const recentSubmissions: RecentSubmission[] = [
  {
    id: "s1",
    userId: "user_inst1_student_1",
    username: "alice",
    problemTitle: "Two Sum",
    status: "Accepted",
    language: "Python",
    submittedAt: "2026-03-03T03:30:00.000Z",
  },
  {
    id: "s2",
    userId: "user_inst1_student_2",
    username: "bob",
    problemTitle: "Binary Search",
    status: "Wrong Answer",
    language: "JavaScript",
    submittedAt: "2026-03-03T03:25:00.000Z",
  },
  {
    id: "s3",
    userId: "user_inst2_student_1",
    username: "diana",
    problemTitle: "Longest Increasing Subsequence",
    status: "Accepted",
    language: "C++",
    submittedAt: "2026-03-03T03:20:00.000Z",
  },
  {
    id: "s4",
    userId: "user_inst1_student_3",
    username: "charlie",
    problemTitle: "Trapping Rain Water",
    status: "Time Limit Exceeded",
    language: "Python",
    submittedAt: "2026-03-03T03:15:00.000Z",
  },
  {
    id: "s5",
    userId: "user_inst3_student_1",
    username: "fiona",
    problemTitle: "Merge Intervals",
    status: "Accepted",
    language: "Java",
    submittedAt: "2026-03-03T03:10:00.000Z",
  },
];

const systemActivity: SystemActivity[] = [
  {
    id: "a1",
    type: "user",
    action: "New User Registration",
    description: "User 'newdev' registered successfully",
    timestamp: "2026-03-03T03:45:00.000Z",
  },
  {
    id: "a2",
    type: "contest",
    action: "Contest Created",
    description: "CodeArena Weekly 402 created by admin",
    timestamp: "2026-03-03T03:30:00.000Z",
  },
  {
    id: "a3",
    type: "problem",
    action: "Problem Added",
    description: "New problem 'Graph BFS Traversal' added to practice",
    timestamp: "2026-03-03T03:15:00.000Z",
  },
  {
    id: "a4",
    type: "system",
    action: "System Backup",
    description: "Daily backup completed successfully",
    timestamp: "2026-03-03T02:00:00.000Z",
  },
  {
    id: "a5",
    type: "contest",
    action: "Contest Ended",
    description: "CodeArena Weekly 401 completed",
    timestamp: "2026-03-02T16:00:00.000Z",
  },
];

const topUsers = [
  { username: "alice", submissions: 1245, solved: 210 },
  { username: "diana", submissions: 987, solved: 134 },
  { username: "bob", submissions: 856, solved: 89 },
  { username: "fiona", submissions: 742, solved: 76 },
  { username: "hannah", submissions: 698, solved: 62 },
];

export const adminDashboardData: AdminDashboardData = {
  stats: adminStats,
  recentSubmissions,
  systemActivity,
  topUsers,
};

export function getAdminDashboardData() {
  return adminDashboardData;
}

// ── Course Mock Data ──────────────────────────────────────────────

// const courses: CourseDetail[] = [
//   {
//     id: "dsa-fundamentals",
//     title: "Data Structures & Algorithms",
//     instructor: "Dr. Alice Chen",
//     description:
//       "A comprehensive course covering core DSA concepts with hands-on labs and assignments.",
//     topics: [
//       {
//         id: "topic-1",
//         title: "Arrays & Strings",
//         lectures: [
//           { id: "l1", title: "Introduction to Arrays", duration: "18 min" },
//           { id: "l2", title: "Two Pointer Technique", duration: "24 min" },
//           { id: "l3", title: "Sliding Window", duration: "22 min" },
//         ],
//         labs: [
//           { id: "lab1", title: "Array Rotation Lab" },
//           { id: "lab2", title: "String Reversal Lab" },
//         ],
//         assignments: [
//           { id: "asgn1", title: "Maximum Subarray", dueDate: "2026-03-10" },
//           { id: "asgn2", title: "Valid Parentheses", dueDate: "2026-03-12" },
//         ],
//         resources: [
//           { id: "r1", title: "Arrays Cheat Sheet", type: "pdf" },
//           { id: "r2", title: "Visual Guide to Two Pointers", type: "link" },
//         ],
//       },
//       {
//         id: "topic-2",
//         title: "Linked Lists",
//         lectures: [
//           { id: "l4", title: "Singly Linked Lists", duration: "20 min" },
//           { id: "l5", title: "Doubly Linked Lists", duration: "18 min" },
//           { id: "l6", title: "Floyd's Cycle Detection", duration: "26 min" },
//         ],
//         labs: [
//           { id: "lab3", title: "Reverse Linked List Lab" },
//         ],
//         assignments: [
//           { id: "asgn3", title: "Merge Two Sorted Lists", dueDate: "2026-03-17" },
//         ],
//         resources: [
//           { id: "r3", title: "Linked List Patterns", type: "video" },
//         ],
//       },
//       {
//         id: "topic-3",
//         title: "Trees & Binary Search Trees",
//         lectures: [
//           { id: "l7", title: "Binary Trees Basics", duration: "22 min" },
//           { id: "l8", title: "Tree Traversals (BFS/DFS)", duration: "30 min" },
//           { id: "l9", title: "Binary Search Trees", duration: "28 min" },
//           { id: "l10", title: "Balanced BST & AVL Trees", duration: "32 min" },
//         ],
//         labs: [
//           { id: "lab4", title: "Tree Traversal Lab" },
//           { id: "lab5", title: "BST Operations Lab" },
//         ],
//         assignments: [
//           { id: "asgn4", title: "Level Order Traversal", dueDate: "2026-03-24" },
//           { id: "asgn5", title: "Lowest Common Ancestor", dueDate: "2026-03-26" },
//         ],
//       },
//       {
//         id: "topic-4",
//         title: "Dynamic Programming",
//         lectures: [
//           { id: "l11", title: "Introduction to DP", duration: "25 min" },
//           { id: "l12", title: "Memoization vs Tabulation", duration: "28 min" },
//           { id: "l13", title: "Knapsack Problem", duration: "35 min" },
//         ],
//         labs: [
//           { id: "lab6", title: "Fibonacci DP Lab" },
//           { id: "lab7", title: "Coin Change Lab" },
//         ],
//         assignments: [
//           { id: "asgn6", title: "Longest Common Subsequence", dueDate: "2026-03-31" },
//         ],
//         resources: [
//           { id: "r4", title: "DP Patterns Reference", type: "pdf" },
//         ],
//       },
//     ],
//   },
// ];

// export function getCourseById(courseId: string): CourseDetail | undefined {
//   return courses.find((c) => c.id === courseId);
// }

// export function getAllCourses(): CourseDetail[] {
//   return courses;
// }

// ── Lab Mock Data ─────────────────────────────────────────────────

const labs: LabDetail[] = [
  {
    id: "web-dev-lab",
    title: "Web Development Lab",
    instructor: "Prof. James Carter",
    description:
      "Hands-on lab covering modern web development with HTML, CSS, JavaScript, and React. Includes practical assignments and real-world projects.",
    memberCount: 34,
    assignmentCount: 8,
    lectures: [
      {
        id: "lec-1",
        title: "HTML & CSS Fundamentals",
        videos: [
          { id: "v1", title: "HTML Document Structure", duration: "15 min" },
          { id: "v2", title: "CSS Box Model & Layout", duration: "20 min" },
          { id: "v3", title: "Flexbox Deep Dive", duration: "18 min" },
        ],
        assignments: [
          {
            id: "a1",
            title: "Build a Responsive Landing Page",
            dueDate: "2026-03-15",
          },
          {
            id: "a2",
            title: "CSS Grid Layout Exercise",
            dueDate: "2026-03-17",
          },
        ],
        problems: [
          { id: "pr1", title: "CSS Selector Matching", difficulty: "Easy" },
          {
            id: "pr2",
            title: "Flexbox Alignment Challenge",
            difficulty: "Medium",
          },
        ],
        resources: [
          { id: "r1", title: "MDN HTML Reference", type: "link" },
          { id: "r2", title: "CSS Tricks Flexbox Guide", type: "link" },
        ],
        announcements: [
          {
            id: "ann1",
            title: "Assignment 1 deadline extended",
            date: "2026-03-10",
          },
        ],
      },
      {
        id: "lec-2",
        title: "JavaScript Essentials",
        videos: [
          {
            id: "v4",
            title: "Variables, Scope & Closures",
            duration: "22 min",
          },
          { id: "v5", title: "Asynchronous JS & Promises", duration: "26 min" },
          { id: "v6", title: "DOM Manipulation", duration: "19 min" },
        ],
        assignments: [
          {
            id: "a3",
            title: "Todo App with Vanilla JS",
            dueDate: "2026-03-22",
          },
        ],
        problems: [
          { id: "pr3", title: "Debounce Implementation", difficulty: "Medium" },
          { id: "pr4", title: "Deep Clone an Object", difficulty: "Hard" },
        ],
        resources: [
          { id: "r3", title: "JavaScript.info", type: "link" },
          { id: "r4", title: "Async/Await Cheat Sheet", type: "pdf" },
        ],
      },
      {
        id: "lec-3",
        title: "React & Component Architecture",
        videos: [
          { id: "v7", title: "Thinking in React", duration: "20 min" },
          { id: "v8", title: "useState & useEffect Hooks", duration: "28 min" },
          {
            id: "v9",
            title: "React Context & State Management",
            duration: "30 min",
          },
        ],
        assignments: [
          {
            id: "a4",
            title: "Build a Weather Dashboard",
            dueDate: "2026-03-29",
          },
          {
            id: "a5",
            title: "Shopping Cart with Context API",
            dueDate: "2026-04-01",
          },
        ],
        problems: [
          { id: "pr5", title: "Custom useFetch Hook", difficulty: "Medium" },
          { id: "pr6", title: "Infinite Scroll Component", difficulty: "Hard" },
        ],
        resources: [
          { id: "r5", title: "React Official Docs", type: "link" },
          { id: "r6", title: "Component Design Patterns", type: "video" },
        ],
        announcements: [
          {
            id: "ann2",
            title: "Guest lecture on React performance this Friday",
            date: "2026-03-25",
          },
        ],
      },
      {
        id: "lec-4",
        title: "APIs & Backend Integration",
        videos: [
          { id: "v10", title: "REST API Fundamentals", duration: "16 min" },
          { id: "v11", title: "Fetching Data with Axios", duration: "14 min" },
          { id: "v12", title: "Authentication with JWT", duration: "24 min" },
        ],
        assignments: [
          {
            id: "a6",
            title: "Connect App to Public API",
            dueDate: "2026-04-07",
          },
        ],
        problems: [
          { id: "pr7", title: "Rate Limiter Simulation", difficulty: "Medium" },
          {
            id: "pr8",
            title: "JWT Decode Without Library",
            difficulty: "Hard",
          },
        ],
        resources: [{ id: "r7", title: "REST API Design Guide", type: "pdf" }],
      },
    ],
  },
  {
    id: "algo-lab",
    title: "Algorithms & Problem Solving Lab",
    instructor: "Dr. Priya Nair",
    description:
      "Intensive lab focused on competitive programming, algorithm design, and problem-solving techniques used in technical interviews.",
    memberCount: 52,
    assignmentCount: 10,
    lectures: [
      {
        id: "lec-5",
        title: "Sorting & Searching",
        videos: [
          { id: "v13", title: "Merge Sort & Quick Sort", duration: "25 min" },
          { id: "v14", title: "Binary Search Variants", duration: "20 min" },
        ],
        assignments: [
          { id: "a7", title: "Implement Merge Sort", dueDate: "2026-03-14" },
        ],
        problems: [
          { id: "pr9", title: "Search in Rotated Array", difficulty: "Medium" },
          { id: "pr10", title: "Kth Largest Element", difficulty: "Medium" },
        ],
        resources: [
          { id: "r8", title: "Sorting Algorithms Visualizer", type: "link" },
        ],
      },
      {
        id: "lec-6",
        title: "Graph Algorithms",
        videos: [
          { id: "v15", title: "BFS & DFS Deep Dive", duration: "28 min" },
          { id: "v16", title: "Dijkstra's Algorithm", duration: "32 min" },
          { id: "v17", title: "Topological Sort", duration: "22 min" },
        ],
        assignments: [
          {
            id: "a8",
            title: "Shortest Path in Weighted Graph",
            dueDate: "2026-03-21",
          },
          {
            id: "a9",
            title: "Detect Cycle in Directed Graph",
            dueDate: "2026-03-23",
          },
        ],
        problems: [
          { id: "pr11", title: "Number of Islands", difficulty: "Medium" },
          { id: "pr12", title: "Word Ladder", difficulty: "Hard" },
          { id: "pr13", title: "Course Schedule", difficulty: "Medium" },
        ],
        resources: [
          { id: "r9", title: "Graph Theory Notes", type: "pdf" },
          { id: "r10", title: "Pathfinding Algorithms Video", type: "video" },
        ],
        announcements: [
          {
            id: "ann3",
            title: "Extra office hours for graph assignment",
            date: "2026-03-18",
          },
        ],
      },
    ],
  },
];

export function getLabById(labId: string): LabDetail | undefined {
  return labs.find((l) => l.id === labId);
}

export function getAllLabDetails(): LabDetail[] {
  return labs;
}
