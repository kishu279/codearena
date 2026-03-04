export type ContestStatus = "UPCOMING" | "LIVE" | "ENDED";

export type ProblemAttemptStatus = "SOLVED" | "UNSOLVED" | "NOT_ATTEMPTED";

export type LeaderboardFilter = "weekly" | "monthly" | "all_time";

export type QuestionDifficulty = "Easy" | "Medium" | "Hard";
export type EditorLanguage =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "cpp";

export const languageOptions: Array<{
  label: string;
  value: EditorLanguage;
  disabled?: boolean;
}> = [
  { label: "JavaScript", value: "javascript", disabled: true },
  { label: "TypeScript", value: "typescript", disabled: true },
  { label: "Python", value: "python" },
  { label: "Java", value: "java", disabled: true },
  { label: "C++", value: "cpp", disabled: true },
];

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  rating: number;
};

export type UserStats = {
  totalSolved: number;
  totalSubmissions: number;
  accuracy: number;
  currentStreak: number;
  contestsParticipated: number;
};

export type RecentActivityItem = {
  id: string;
  title: string;
  difficulty: QuestionDifficulty;
  solvedAt: string;
};

export type DashboardUser = {
  id: string;
  username: string;
  rank?: number;
  joinDate: string;
  stats: UserStats;
  recentActivity: RecentActivityItem[];
};

export type ContestProblem = {
  id: string;
  title: string;
  difficulty: QuestionDifficulty;
};

export type ContestListItem = {
  id: string;
  title: string;
  startTime: string;
  durationMinutes: number;
  problems: ContestProblem[];
};

export type LabListItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  memberCount: number;
  assignmentCount: number;
};

export type ContestSubmissionState = {
  userId: string;
  contestId: string;
  problemId: string;
  status: ProblemAttemptStatus;
};

export type LeaderboardRow = {
  username: string;
  rating: number;
  problemsSolved: number;
  contestsParticipated: number;
};

export type QuestionSample = {
  input: string;
  output: string;
  explanation?: string;
};

export type CodingQuestion = {
  id: string;
  title: string;
  difficulty: QuestionDifficulty;
  description: string;
  constraints: string[];
  samples: QuestionSample[];
  testCases: QuestionSample[];
  starterCode: Record<EditorLanguage, string>;
};

export type RunCodeResult = {
  status: "success";
  stdout: string;
  runtimeMs: number;
};

export type SubmitCodeResult = {
  status: "Accepted" | "Wrong Answer" | "Runtime Error";
  message: string;
  runtimeMs: number;
  memoryMb: number;
};

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export enum Tags {
  PRACTICE = "PRACTICE",
  CONTEST = "CONTEST",
  LAB = "LAB",
}

// ── Unified Code Runner Types ──────────────────────────────────────────

export type CodeRunnerAction = "run" | "submit";

export type ProblemType = "PRACTICE" | "CONTEST" | "LAB";

export type TestCaseInput = {
  input: string;
  expectedOutput: string;
};

export type TestCaseResult = {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
};

export type CodeRunnerRequest = {
  code: string;
  language: EditorLanguage;
  action: CodeRunnerAction;
  problemType: ProblemType;
  contestId?: string;
  customTestCases?: TestCaseInput[];
};

export type CodeRunnerResponse = {
  success: boolean;
  action: CodeRunnerAction;
  problemId: string;
  totalTests: number;
  passed: number;
  failed: number;
  verdict: "Accepted" | "Wrong Answer" | "Runtime Error";
  results: TestCaseResult[];
  error?: string;
};

// ── Course Types ────────────────────────────────────────────────

export type CourseLecture = {
  id: string;
  title: string;
  duration: string;
};

export type CourseLab = {
  id: string;
  title: string;
};

export type CourseAssignment = {
  id: string;
  title: string;
  dueDate?: string;
};

export type CourseResource = {
  id: string;
  title: string;
  type: "pdf" | "link" | "video";
};

export type CourseTopic = {
  id: string;
  title: string;
  lectures: CourseLecture[];
  labs: CourseLab[];
  assignments: CourseAssignment[];
  resources?: CourseResource[];
};

export type CourseDetail = {
  id: string;
  title: string;
  instructor: string;
  description: string;
  topics: CourseTopic[];
};

// ── Lab Types ───────────────────────────────────────────────────

export type LabVideo = {
  id: string;
  title: string;
  duration: string;
};

export type LabAssignment = {
  id: string;
  title: string;
  dueDate?: string;
};

export type LabProblem = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
};

export type LabResource = {
  id: string;
  title: string;
  type: "pdf" | "link" | "video";
};

export type LabAnnouncement = {
  id: string;
  title: string;
  date: string;
};

export type LabLecture = {
  id: string;
  title: string;
  videos: LabVideo[];
  assignments: LabAssignment[];
  problems: LabProblem[];
  resources?: LabResource[];
  announcements?: LabAnnouncement[];
};

export type LabDetail = {
  id: string;
  title: string;
  instructor: string;
  description: string;
  memberCount: number;
  assignmentCount: number;
  lectures: LabLecture[];
};

// ── Admin Dashboard Types ───────────────────────────────────────

export type AdminStats = {
  totalUsers: number;
  totalProblems: number;
  totalContests: number;
  totalSubmissions: number;
  activeUsers: number;
  systemHealth: string;
};

export type RecentSubmission = {
  id: string;
  userId: string;
  username: string;
  problemTitle: string;
  status: string;
  language: string;
  submittedAt: string;
};

export type SystemActivity = {
  id: string;
  type: "user" | "contest" | "problem" | "system";
  action: string;
  description: string;
  timestamp: string;
};

export type AdminDashboardData = {
  stats: AdminStats;
  recentSubmissions: RecentSubmission[];
  systemActivity: SystemActivity[];
  topUsers: Array<{ username: string; submissions: number; solved: number }>;
};
