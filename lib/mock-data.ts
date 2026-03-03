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
