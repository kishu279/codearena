// ─── UI Component Types ──────────────────────────────────────────

export type QuestionDifficulty = "Easy" | "Medium" | "Hard";
export type EditorLanguage =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "cpp";
export type ContestStatus = "UPCOMING" | "LIVE" | "ENDED";
export type ProblemAttemptStatus = "SOLVED" | "UNSOLVED" | "NOT_ATTEMPTED";

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

// ─── Dashboard Types ─────────────────────────────────────────────

export interface UserStats {
  totalSolved: number;
  totalSubmissions: number;
  accuracy: number;
  currentStreak: number;
  contestsParticipated: number;
}

export interface RecentActivityItem {
  id: string;
  title: string;
  difficulty: QuestionDifficulty;
  solvedAt: string;
}

export interface DashboardUser {
  id: string;
  username: string;
  rank?: number;
  joinDate: string;
  stats: UserStats;
  recentActivity: RecentActivityItem[];
}

// ─── Contest UI Types ────────────────────────────────────────────

export interface ContestProblem {
  id: string;
  title: string;
  difficulty: QuestionDifficulty;
}

export interface ContestListItem {
  id: string;
  title: string;
  startTime: string;
  durationMinutes: number;
  problems: ContestProblem[];
}

export interface ContestSubmissionState {
  userId: string;
  contestId: string;
  problemId: string;
  status: ProblemAttemptStatus;
}

// ─── Problem UI Types ────────────────────────────────────────────

export interface QuestionSample {
  input: string;
  output: string;
  explanation?: string;
}

export interface CodingQuestion {
  id: string;
  title: string;
  difficulty: QuestionDifficulty;
  description: string;
  constraints: string[];
  samples: QuestionSample[];
  starterCode: Record<EditorLanguage, string>;
}

export interface RunCodeResult {
  status: "success";
  stdout: string;
  runtimeMs: number;
}

export interface SubmitCodeResult {
  status: "Accepted" | "Wrong Answer" | "Runtime Error";
  message: string;
  runtimeMs: number;
  memoryMb: number;
}

// ─── Leaderboard Types ───────────────────────────────────────────

export type LeaderboardFilter = "weekly" | "monthly" | "all_time";

export interface LeaderboardRow {
  username: string;
  rating: number;
  problemsSolved: number;
  contestsParticipated: number;
}

// ─── Lab UI Types ────────────────────────────────────────────────

/** Lab card in lab listing pages (from DB) */
export interface LabCardItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  instituteName: string | null;
  creatorName: string | null;
  memberCount: number;
  assignmentCount: number;
  resourceCount: number;
}

/** Lab detail page (from DB with full relations) */
export interface LabDetailView {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  institute: { id: string; name: string; slug: string } | null;
  createdBy: { id: string; name: string | null; email: string } | null;
  memberCount: number;
  members: LabMemberView[];
  assignments: AssignmentView[];
  resources: ResourceView[];
}

export interface LabMemberView {
  id: string;
  userId: string;
  name: string | null;
  email: string;
  image: string | null;
  role: "INSTRUCTOR" | "STUDENT";
  joinedAt: string;
}

export interface AssignmentView {
  id: string;
  title: string;
  description: string | null;
  startTime: string;
  endTime: string;
  isRecurring: boolean;
  problemCount: number;
  resourceCount: number;
  problems: AssignmentProblemView[];
  resources: ResourceView[];
}

export interface AssignmentProblemView {
  id: string;
  title: string;
  slug: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  order: number | null;
}

export interface ResourceView {
  id: string;
  title: string;
  description: string | null;
  type: "VIDEO" | "DOCUMENT" | "LINK" | "NOTE" | "CODE_SNIPPET";
  url: string | null;
  fileUrl: string | null;
  content: string | null;
  order: number | null;
  isPublic: boolean;
  uploadedBy?: string | null;
}

/** Institute detail view */
export interface InstituteDetailView {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  memberCount: number;
  labCount: number;
  contestCount: number;
  members: InstituteMemberView[];
  labs: InstituteLabView[];
}

export interface InstituteMemberView {
  id: string;
  userId: string;
  name: string | null;
  email: string;
  role: "ADMIN" | "INSTRUCTOR" | "STUDENT";
  joinedAt: string;
}

export interface InstituteLabView {
  id: string;
  title: string;
  slug: string;
  memberCount: number;
  assignmentCount: number;
}

// ─── Legacy Lab UI Types (mock-data backed) ──────────────────────

export interface LabListItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  memberCount: number;
  assignmentCount: number;
}

export interface LabVideo {
  id: string;
  title: string;
  duration: string;
}

export interface LabAssignment {
  id: string;
  title: string;
  dueDate?: string;
}

export interface LabProblem {
  id: string;
  title: string;
  difficulty: QuestionDifficulty;
}

export interface LabResource {
  id: string;
  title: string;
  type: "pdf" | "link" | "video";
}

export interface LabAnnouncement {
  id: string;
  title: string;
  date: string;
}

export interface LabLecture {
  id: string;
  title: string;
  videos: LabVideo[];
  assignments: LabAssignment[];
  problems: LabProblem[];
  resources?: LabResource[];
  announcements?: LabAnnouncement[];
}

export interface LabDetail {
  id: string;
  title: string;
  instructor: string;
  description: string;
  memberCount: number;
  assignmentCount: number;
  lectures: LabLecture[];
}

// ─── Admin Dashboard Types ───────────────────────────────────────

export interface AdminStats {
  totalUsers: number;
  totalProblems: number;
  totalContests: number;
  totalSubmissions: number;
  activeUsers: number;
  systemHealth: string;
}

export interface RecentSubmission {
  id: string;
  userId: string;
  username: string;
  problemTitle: string;
  status: string;
  language: string;
  submittedAt: string;
}

export interface SystemActivity {
  id: string;
  type: "user" | "contest" | "problem" | "system";
  action: string;
  description: string;
  timestamp: string;
}

export interface AdminDashboardData {
  stats: AdminStats;
  recentSubmissions: RecentSubmission[];
  systemActivity: SystemActivity[];
  topUsers: Array<{ username: string; submissions: number; solved: number }>;
}

// ─── Form Types ──────────────────────────────────────────────────

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProblemFormData {
  title: string;
  slug: string;
  description: string;
  difficulty: QuestionDifficulty;
  constraints: string;
  sampleInput: string;
  sampleOutput: string;
  testCases: string;
}

export interface ContestFormData {
  title: string;
  slug: string;
  description: string;
  startTime: string;
  duration: number;
  isPublic: boolean;
}
