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
  {
    id: "u1",
    username: "sourav",
    email: "sourav@codearena.dev",
    password: "password123",
    createdAt: "2024-07-12T10:00:00.000Z",
    rating: 1560,
  },
  {
    id: "u2",
    username: "alice",
    email: "alice@codearena.dev",
    password: "password123",
    createdAt: "2024-04-03T10:00:00.000Z",
    rating: 1785,
  },
];

const dashboardUsers: DashboardUser[] = [
  {
    id: "u1",
    username: "sourav",
    rank: 342,
    joinDate: "2024-07-12T10:00:00.000Z",
    stats: {
      totalSolved: 89,
      totalSubmissions: 153,
      accuracy: 58.2,
      currentStreak: 6,
      contestsParticipated: 9,
    },
    recentActivity: [
      {
        id: "a1",
        title: "Two Sum",
        difficulty: "Easy",
        solvedAt: "2026-02-10T16:20:00.000Z",
      },
      {
        id: "a2",
        title: "Binary Tree Zigzag Level Order Traversal",
        difficulty: "Medium",
        solvedAt: "2026-02-09T11:10:00.000Z",
      },
      {
        id: "a3",
        title: "Trapping Rain Water",
        difficulty: "Hard",
        solvedAt: "2026-02-07T08:35:00.000Z",
      },
    ],
  },
  {
    id: "u2",
    username: "alice",
    rank: 120,
    joinDate: "2024-04-03T10:00:00.000Z",
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
        title: "Merge k Sorted Lists",
        difficulty: "Hard",
        solvedAt: "2026-02-08T13:55:00.000Z",
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
  { userId: "u1", contestId: "monthly-12", problemId: "p7", status: "SOLVED" },
  {
    userId: "u1",
    contestId: "monthly-12",
    problemId: "p8",
    status: "UNSOLVED",
  },
  { userId: "u1", contestId: "biweekly-88", problemId: "p4", status: "SOLVED" },
  {
    userId: "u1",
    contestId: "biweekly-88",
    problemId: "p5",
    status: "NOT_ATTEMPTED",
  },
  { userId: "u2", contestId: "monthly-12", problemId: "p7", status: "SOLVED" },
  { userId: "u2", contestId: "monthly-12", problemId: "p8", status: "SOLVED" },
  {
    userId: "u2",
    contestId: "monthly-12",
    problemId: "p9",
    status: "UNSOLVED",
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
      username: "sourav",
      rating: 1572,
      problemsSolved: 11,
      contestsParticipated: 1,
    },
    {
      username: "nina",
      rating: 1499,
      problemsSolved: 9,
      contestsParticipated: 1,
    },
    {
      username: "omar",
      rating: 1499,
      problemsSolved: 9,
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
      username: "sourav",
      rating: 1560,
      problemsSolved: 31,
      contestsParticipated: 2,
    },
    {
      username: "nina",
      rating: 1511,
      problemsSolved: 29,
      contestsParticipated: 2,
    },
    {
      username: "omar",
      rating: 1488,
      problemsSolved: 26,
      contestsParticipated: 2,
    },
  ],
  all_time: [
    {
      username: "alice",
      rating: 1785,
      problemsSolved: 210,
      contestsParticipated: 16,
    },
    {
      username: "sourav",
      rating: 1560,
      problemsSolved: 89,
      contestsParticipated: 9,
    },
    {
      username: "nina",
      rating: 1511,
      problemsSolved: 76,
      contestsParticipated: 7,
    },
    {
      username: "omar",
      rating: 1488,
      problemsSolved: 72,
      contestsParticipated: 8,
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
    userId: "u1",
    username: "sourav",
    problemTitle: "Two Sum",
    status: "Accepted",
    language: "Python",
    submittedAt: "2026-03-03T03:30:00.000Z",
  },
  {
    id: "s2",
    userId: "u2",
    username: "alice",
    problemTitle: "Binary Tree Zigzag Level Order Traversal",
    status: "Wrong Answer",
    language: "JavaScript",
    submittedAt: "2026-03-03T03:25:00.000Z",
  },
  {
    id: "s3",
    userId: "u3",
    username: "bob",
    problemTitle: "Longest Increasing Subsequence",
    status: "Accepted",
    language: "C++",
    submittedAt: "2026-03-03T03:20:00.000Z",
  },
  {
    id: "s4",
    userId: "u4",
    username: "charlie",
    problemTitle: "Trapping Rain Water",
    status: "Time Limit Exceeded",
    language: "Python",
    submittedAt: "2026-03-03T03:15:00.000Z",
  },
  {
    id: "s5",
    userId: "u5",
    username: "diana",
    problemTitle: "Merge k Sorted Lists",
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
  { username: "bob", submissions: 987, solved: 178 },
  { username: "sourav", submissions: 856, solved: 89 },
  { username: "charlie", submissions: 742, solved: 156 },
  { username: "diana", submissions: 698, solved: 134 },
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
          { id: "a1", title: "Build a Responsive Landing Page", dueDate: "2026-03-15" },
          { id: "a2", title: "CSS Grid Layout Exercise", dueDate: "2026-03-17" },
        ],
        problems: [
          { id: "pr1", title: "CSS Selector Matching", difficulty: "Easy" },
          { id: "pr2", title: "Flexbox Alignment Challenge", difficulty: "Medium" },
        ],
        resources: [
          { id: "r1", title: "MDN HTML Reference", type: "link" },
          { id: "r2", title: "CSS Tricks Flexbox Guide", type: "link" },
        ],
        announcements: [
          { id: "ann1", title: "Assignment 1 deadline extended", date: "2026-03-10" },
        ],
      },
      {
        id: "lec-2",
        title: "JavaScript Essentials",
        videos: [
          { id: "v4", title: "Variables, Scope & Closures", duration: "22 min" },
          { id: "v5", title: "Asynchronous JS & Promises", duration: "26 min" },
          { id: "v6", title: "DOM Manipulation", duration: "19 min" },
        ],
        assignments: [
          { id: "a3", title: "Todo App with Vanilla JS", dueDate: "2026-03-22" },
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
          { id: "v9", title: "React Context & State Management", duration: "30 min" },
        ],
        assignments: [
          { id: "a4", title: "Build a Weather Dashboard", dueDate: "2026-03-29" },
          { id: "a5", title: "Shopping Cart with Context API", dueDate: "2026-04-01" },
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
          { id: "ann2", title: "Guest lecture on React performance this Friday", date: "2026-03-25" },
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
          { id: "a6", title: "Connect App to Public API", dueDate: "2026-04-07" },
        ],
        problems: [
          { id: "pr7", title: "Rate Limiter Simulation", difficulty: "Medium" },
          { id: "pr8", title: "JWT Decode Without Library", difficulty: "Hard" },
        ],
        resources: [
          { id: "r7", title: "REST API Design Guide", type: "pdf" },
        ],
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
          { id: "a8", title: "Shortest Path in Weighted Graph", dueDate: "2026-03-21" },
          { id: "a9", title: "Detect Cycle in Directed Graph", dueDate: "2026-03-23" },
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
          { id: "ann3", title: "Extra office hours for graph assignment", date: "2026-03-18" },
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
