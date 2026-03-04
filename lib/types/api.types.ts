// ─── API Request Types ───────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ─── Problem API Types ───────────────────────────────────────────

export interface GetProblemsRequest extends PaginatedRequest {
  difficulty?: string;
  tag?: string;
  search?: string;
}

export interface GetProblemsResponse {
  data: Array<{
    id: string;
    title: string;
    slug: string;
    difficulty: string;
    tag: string;
    contestId: string | null;
  }>;
}

export interface GetProblemByIdResponse {
  data: {
    id: string;
    title: string;
    difficulty: string;
    description: string;
    constraints: string[];
    samples: Array<{ input: string; output: string; explanation?: string }>;
    starterCode: Record<string, string>;
  };
}

// ─── Contest API Types ───────────────────────────────────────────

export interface GetContestsRequest extends PaginatedRequest {
  status?: string;
  instituteId?: string;
}

export interface GetContestsResponse {
  data: Array<{
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    duration: number;
    status: string;
    isPublic: boolean;
    description: string | null;
    problems: Array<{
      id: string;
      title: string;
      difficulty: string;
      order: number | null;
    }>;
  }>;
}

export interface GetContestByIdResponse {
  data: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    startTime: Date;
    endTime: Date;
    duration: number;
    status: string;
    isPublic: boolean;
    problems: Array<{
      id: string;
      title: string;
      slug: string;
      difficulty: string;
      order: number | null;
      tag: string;
    }>;
  };
}

// ─── Submission API Types ────────────────────────────────────────

export interface CreateSubmissionRequest {
  userId: string;
  problemId: string;
  contestId?: string;
  code: string;
  language: string;
}

export interface CreateSubmissionResponse {
  data: {
    id: string;
    status: string;
    testCasesPassed: number;
    totalTestCases: number;
    runtime: number | null;
    memory: number | null;
  };
}

export interface GetSubmissionsRequest extends PaginatedRequest {
  userId?: string;
  problemId?: string;
  contestId?: string;
  status?: string;
}

// ─── Lab API Types ───────────────────────────────────────────────

export interface CreateLabRequest {
  title: string;
  slug: string;
  description?: string;
  instituteId?: string;
  createdById?: string;
}

export interface UpdateLabRequest {
  title?: string;
  description?: string;
}

export interface GetLabsRequest extends PaginatedRequest {
  instituteId?: string;
  search?: string;
}

export interface GetLabsResponse {
  data: Array<{
    id: string;
    title: string;
    slug: string;
    description: string | null;
    instituteId: string | null;
    createdById: string | null;
    memberCount: number;
    assignmentCount: number;
    resourceCount: number;
  }>;
}

export interface GetLabByIdResponse {
  data: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    institute: { id: string; name: string; slug: string } | null;
    createdBy: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
    } | null;
    members: Array<{
      id: string;
      userId: string;
      role: string;
      joinedAt: Date;
      user: {
        id: string;
        name: string | null;
        email: string;
        image: string | null;
      };
    }>;
    assignments: Array<{
      id: string;
      title: string;
      description: string | null;
      startTime: Date;
      endTime: Date;
      isRecurring: boolean;
      problems: Array<{
        id: string;
        title: string;
        slug: string;
        difficulty: string;
        order: number | null;
      }>;
      resource: Array<{
        id: string;
        title: string;
        type: string;
        url: string | null;
        order: number | null;
      }>;
    }>;
    resource: Array<{
      id: string;
      title: string;
      type: string;
      url: string | null;
      content: string | null;
      order: number | null;
    }>;
  };
}

// ─── Assignment API Types ────────────────────────────────────────

export interface CreateAssignmentRequest {
  title: string;
  description?: string;
  labId: string;
  startTime: Date;
  endTime: Date;
  problemIds?: string[];
  isRecurring?: boolean;
  recurringType?: string;
}

export interface UpdateAssignmentRequest {
  title?: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
}

export interface GetAssignmentByIdResponse {
  data: {
    id: string;
    title: string;
    description: string | null;
    startTime: Date;
    endTime: Date;
    isRecurring: boolean;
    recurringType: string | null;
    lab: {
      id: string;
      title: string;
      slug: string;
      institute: { id: string; name: string } | null;
    };
    problems: Array<{
      id: string;
      title: string;
      slug: string;
      difficulty: string;
      order: number | null;
    }>;
    resource: Array<{
      id: string;
      title: string;
      type: string;
      url: string | null;
      content: string | null;
      order: number | null;
    }>;
    parent: { id: string; title: string } | null;
    children: Array<{ id: string; title: string }>;
  };
}

// ─── Resource API Types ──────────────────────────────────────────

export interface CreateResourceRequest {
  title: string;
  description?: string;
  type: "VIDEO" | "DOCUMENT" | "LINK" | "NOTE" | "CODE_SNIPPET";
  url?: string;
  fileUrl?: string;
  content?: string;
  assignmentId?: string;
  labId?: string;
  uploadedById: string;
  order?: number;
  isPublic?: boolean;
}

export interface UpdateResourceRequest {
  title?: string;
  description?: string;
  url?: string;
  fileUrl?: string;
  content?: string;
  order?: number;
  isPublic?: boolean;
}

export interface GetResourcesRequest {
  assignmentId?: string;
  labId?: string;
  type?: string;
}

export interface GetResourcesResponse {
  data: Array<{
    id: string;
    title: string;
    description: string | null;
    type: string;
    url: string | null;
    fileUrl: string | null;
    content: string | null;
    order: number | null;
    isPublic: boolean;
    uploadedBy: { id: string; name: string | null; email: string };
  }>;
}

// ─── Institute API Types ─────────────────────────────────────────

export interface CreateInstituteRequest {
  name: string;
  slug: string;
  description?: string;
}

export interface AddInstituteMemberRequest {
  userId: string;
  instituteId: string;
  role: "ADMIN" | "INSTRUCTOR" | "STUDENT";
}

export interface GetInstitutesResponse {
  data: Array<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    memberCount: number;
    labCount: number;
    contestCount: number;
  }>;
}

export interface GetInstituteByIdResponse {
  data: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    members: Array<{
      id: string;
      userId: string;
      role: string;
      joinedAt: Date;
      user: {
        id: string;
        name: string | null;
        email: string;
        image: string | null;
      };
    }>;
    labs: Array<{
      id: string;
      title: string;
      slug: string;
      memberCount: number;
      assignmentCount: number;
    }>;
    contests: Array<{
      id: string;
      title: string;
      slug: string;
      startTime: Date;
      status: string;
    }>;
  };
}

// ─── Code Runner API Types ───────────────────────────────────────

export interface RunCodeRequest {
  code: string;
  language: string;
  action: "run" | "submit";
  problemType: "PRACTICE" | "CONTEST" | "LAB";
  contestId?: string;
  customTestCases?: Array<{ input: string; expectedOutput: string }>;
}

export interface RunCodeResponse {
  success: boolean;
  action: "run" | "submit";
  problemId: string;
  totalTests: number;
  passed: number;
  failed: number;
  verdict: "Accepted" | "Wrong Answer" | "Runtime Error";
  results: Array<{
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
  }>;
  error?: string;
}
