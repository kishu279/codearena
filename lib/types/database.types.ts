import {
  Difficulty,
  ProblemTag,
  ContestStatus,
  SubmissionStatus,
  Role,
  InstituteMemberRole,
  LabMemberRole,
  RecurringType,
  ContestHost,
  ResourceType,
} from "@prisma/client";

export {
  Difficulty,
  ProblemTag,
  ContestStatus,
  SubmissionStatus,
  Role,
  InstituteMemberRole,
  LabMemberRole,
  RecurringType,
  ContestHost,
  ResourceType,
};

// ─── User Types ──────────────────────────────────────────────────

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithSubmissions extends User {
  submissions: Submission[];
}

export interface UserWithMemberships extends User {
  instituteMemberships: InstituteMemberWithInstitute[];
  labMemberships: LabMemberWithLab[];
}

export interface UserWithCreatedLabs extends User {
  createdLabs: Lab[];
}

export interface UserWithCreatedContests extends User {
  createdContests: Contest[];
}

export interface UserWithResources extends User {
  resource: Resource[];
}

export interface UserFull extends User {
  submissions: Submission[];
  instituteMemberships: InstituteMemberWithInstitute[];
  labMemberships: LabMemberWithLab[];
  createdLabs: Lab[];
  createdContests: Contest[];
  resource: Resource[];
}

export interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: Role;
  stats: UserStats;
}

export interface UserStats {
  totalSubmissions: number;
  solvedProblems: number;
  contestsParticipated: number;
  accuracy: number;
}

// ─── Problem Types ───────────────────────────────────────────────

export interface Problem {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  tag: ProblemTag;
  inputFormat: string | null;
  outputFormat: string | null;
  constraints: string | null;
  sampleInput: string | null;
  sampleOutput: string | null;
  testCases: TestCase[] | null;
  timeLimit: number;
  memoryLimit: number;
  contestId: string | null;
  order: number | null;
  assignmentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface ProblemWithTestCases extends Problem {
  testCases: TestCase[];
}

export interface ProblemCreateInput {
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  tag: ProblemTag;
  inputFormat?: string;
  outputFormat?: string;
  constraints?: string;
  sampleInput?: string;
  sampleOutput?: string;
  testCases?: TestCase[];
  timeLimit?: number;
  memoryLimit?: number;
  contestId?: string;
  assignmentId?: string;
  order?: number;
}

export interface ProblemUpdateInput {
  title?: string;
  description?: string;
  difficulty?: Difficulty;
  constraints?: string;
  testCases?: TestCase[];
  timeLimit?: number;
  memoryLimit?: number;
}

export interface ProblemWithContest extends Problem {
  contest: Contest | null;
}

export interface ProblemWithAssignment extends Problem {
  assignment: Assignment | null;
}

export interface ProblemWithSubmissions extends Problem {
  submissions: Submission[];
}

export interface ProblemFull extends Problem {
  contest: Contest | null;
  assignment: Assignment | null;
  submissions: Submission[];
}

export interface ProblemListItem {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  tag: ProblemTag;
  contestId: string | null;
  assignmentId: string | null;
}

// ─── Contest Types ───────────────────────────────────────────────

export interface Contest {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  startTime: Date;
  endTime: Date;
  duration: number;
  status: ContestStatus;
  isPublic: boolean;
  createdById: string | null;
  instituteId: string | null;
  hostedBy: ContestHost;
  isRecurring: boolean;
  recurringType: RecurringType | null;
  parentContestId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContestWithProblems extends Contest {
  problems: Problem[];
}

export interface ContestWithSubmissions extends Contest {
  submissions: Submission[];
}

export interface ContestCreateInput {
  title: string;
  slug: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  isPublic?: boolean;
  createdById?: string;
  instituteId?: string;
  hostedBy?: ContestHost;
  isRecurring?: boolean;
  recurringType?: RecurringType;
  parentContestId?: string;
}

export interface ContestUpdateInput {
  title?: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  status?: ContestStatus;
  isPublic?: boolean;
}

export interface ContestListItem {
  id: string;
  title: string;
  slug: string;
  startTime: Date;
  duration: number;
  status: ContestStatus;
  problemCount: number;
}

export interface ContestWithCreator extends Contest {
  createdBy: User | null;
}

export interface ContestWithInstitute extends Contest {
  institute: Institute | null;
}

export interface ContestWithRecurring extends Contest {
  parentContest: Contest | null;
  childContests: Contest[];
}

export interface ContestFull extends Contest {
  problems: Problem[];
  submissions: Submission[];
  createdBy: User | null;
  institute: Institute | null;
  parentContest: Contest | null;
  childContests: Contest[];
}

export interface RecurringContestConfig {
  isRecurring: boolean;
  recurringType: RecurringType | null;
  parentContestId: string | null;
}

// ─── Submission Types ────────────────────────────────────────────

export interface Submission {
  id: string;
  userId: string;
  problemId: string;
  contestId: string | null;
  code: string;
  language: string;
  status: SubmissionStatus;
  runtime: number | null;
  memory: number | null;
  testCasesPassed: number;
  totalTestCases: number;
  output: string | null;
  error: string | null;
  submittedAt: Date;
}

export interface SubmissionWithDetails extends Submission {
  user: User;
  problem: Problem;
  contest: Contest | null;
}

export interface SubmissionCreateInput {
  userId: string;
  problemId: string;
  contestId?: string;
  code: string;
  language: string;
  status?: SubmissionStatus;
  runtime?: number;
  memory?: number;
  testCasesPassed?: number;
  totalTestCases?: number;
  output?: string;
  error?: string;
}

export interface SubmissionListItem {
  id: string;
  problemTitle: string;
  language: string;
  status: SubmissionStatus;
  runtime: number | null;
  submittedAt: Date;
}

// ─── Institute Types ─────────────────────────────────────────────

export interface Institute {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface InstituteWithMembers extends Institute {
  members: InstituteMemberWithUser[];
}

export interface InstituteWithLabs extends Institute {
  labs: Lab[];
}

export interface InstituteCreateInput {
  name: string;
  slug: string;
  description?: string;
}

export interface InstituteUpdateInput {
  name?: string;
  description?: string;
}

export interface InstituteWithContests extends Institute {
  contests: Contest[];
}

export interface InstituteFull extends Institute {
  members: InstituteMemberWithUser[];
  labs: Lab[];
  contests: Contest[];
}

export interface InstituteListItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  memberCount: number;
  labCount: number;
  contestCount: number;
}

export interface InstituteMember {
  id: string;
  userId: string;
  instituteId: string;
  role: InstituteMemberRole;
  joinedAt: Date;
}

export interface InstituteMemberWithUser extends InstituteMember {
  user: User;
}

export interface InstituteMemberWithInstitute extends InstituteMember {
  institute: Institute;
}

// ─── Lab Types ───────────────────────────────────────────────────

export interface Lab {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  instituteId: string | null;
  createdById: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LabWithMembers extends Lab {
  members: LabMemberWithUser[];
}

export interface LabWithAssignments extends Lab {
  assignments: Assignment[];
}

export interface LabWithResources extends Lab {
  resources: Resource[];
}

export interface LabCreateInput {
  title: string;
  slug: string;
  description?: string;
  instituteId?: string;
  createdById?: string;
}

export interface LabUpdateInput {
  title?: string;
  description?: string;
}

export interface LabWithInstitute extends Lab {
  institute: Institute | null;
}

export interface LabWithCreator extends Lab {
  createdBy: User | null;
}

export interface LabWithDetails extends Lab {
  institute: Institute | null;
  createdBy: User | null;
  members: LabMemberWithUser[];
  assignments: AssignmentWithDetails[];
  resources: Resource[];
}

export interface LabFull extends Lab {
  institute: Institute | null;
  createdBy: User | null;
  members: LabMemberWithUser[];
  assignments: Assignment[];
  resources: Resource[];
}

export interface LabListItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  instituteId: string | null;
  memberCount: number;
  assignmentCount: number;
  resourceCount: number;
}

export interface LabMember {
  id: string;
  userId: string;
  labId: string;
  role: LabMemberRole;
  joinedAt: Date;
}

export interface LabMemberWithUser extends LabMember {
  user: User;
}

export interface LabMemberWithLab extends LabMember {
  lab: Lab;
}

// ─── Assignment Types ────────────────────────────────────────────

export interface Assignment {
  id: string;
  title: string;
  description: string | null;
  labId: string;
  startTime: Date;
  endTime: Date;
  isRecurring: boolean;
  recurringType: RecurringType | null;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AssignmentWithProblems extends Assignment {
  problems: Problem[];
}

export interface AssignmentWithResources extends Assignment {
  resources: Resource[];
}

export interface AssignmentCreateInput {
  title: string;
  description?: string;
  labId: string;
  startTime: Date;
  endTime: Date;
  isRecurring?: boolean;
  recurringType?: RecurringType;
  parentId?: string;
}

export interface AssignmentUpdateInput {
  title?: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
}

export interface AssignmentWithLab extends Assignment {
  lab: Lab;
}

export interface AssignmentWithDetails extends Assignment {
  problems: Problem[];
  resources: Resource[];
}

export interface AssignmentWithRecurring extends Assignment {
  parent: Assignment | null;
  children: Assignment[];
}

export interface AssignmentFull extends Assignment {
  lab: Lab;
  problems: Problem[];
  resources: Resource[];
  parent: Assignment | null;
  children: Assignment[];
}

export interface AssignmentListItem {
  id: string;
  title: string;
  description: string | null;
  labId: string;
  startTime: Date;
  endTime: Date;
  problemCount: number;
  resourceCount: number;
  isRecurring: boolean;
}

export interface RecurringAssignmentConfig {
  isRecurring: boolean;
  recurringType: RecurringType | null;
  parentId: string | null;
}

// ─── Resource Types ──────────────────────────────────────────────

export interface Resource {
  id: string;
  title: string;
  description: string | null;
  type: ResourceType;
  url: string | null;
  fileUrl: string | null;
  content: string | null;
  assignmentId: string | null;
  labId: string | null;
  uploadedById: string;
  order: number | null;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResourceWithRelations extends Resource {
  assignment: Assignment | null;
  lab: Lab | null;
  uploadedBy: User;
}

export interface ResourceCreateInput {
  title: string;
  description?: string;
  type: ResourceType;
  url?: string;
  fileUrl?: string;
  content?: string;
  assignmentId?: string;
  labId?: string;
  uploadedById: string;
  order?: number;
  isPublic?: boolean;
}

export interface ResourceUpdateInput {
  title?: string;
  description?: string;
  url?: string;
  fileUrl?: string;
  content?: string;
  order?: number;
  isPublic?: boolean;
}

export interface ResourceListItem {
  id: string;
  title: string;
  type: ResourceType;
  uploadedBy: string;
  createdAt: Date;
}
