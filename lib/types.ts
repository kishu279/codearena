export type ContestStatus = "UPCOMING" | "LIVE" | "ENDED";

export type ProblemAttemptStatus = "SOLVED" | "UNSOLVED" | "NOT_ATTEMPTED";

export type LeaderboardFilter = "weekly" | "monthly" | "all_time";

export type QuestionDifficulty = "Easy" | "Medium" | "Hard";
export type EditorLanguage = "javascript" | "typescript" | "python" | "java" | "cpp";

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
  // LAB = "LAB",
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