// import { getLabById } from "@/lib/mock-data";
import { prisma } from "./prisma";
import {
  Difficulty,
  ProblemTag,
  ContestStatus,
  LabMemberRole,
  InstituteMemberRole,
  ResourceType,
} from "@prisma/client";

export {
  Difficulty,
  ProblemTag,
  ContestStatus,
  LabMemberRole,
  InstituteMemberRole,
  ResourceType,
} from "@prisma/client";

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface ContestProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  order: number | null;
  tag: ProblemTag;
}

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
  hostedBy: string;
  isRecurring: boolean;
  recurringType: string | null;
  parentContestId: string | null;
  createdAt: Date;
  updatedAt: Date;
  problems?: Problem[];
}

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
  testCases: any;
  timeLimit: number;
  memoryLimit: number;
  contestId: string | null;
  order: number | null;
  assignmentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function getAllProblems() {
  return await prisma.problem.findMany();
}

export async function getProblemsByPage(page: number, limit: number = 10) {
  const [problems, total] = await Promise.all([
    prisma.problem.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.problem.count(),
  ]);

  return { page, limit, total, data: problems };
}

export async function getAllContests() {
  return await prisma.contest.findMany({
    include: { problems: { orderBy: { order: "asc" } } },
    orderBy: { startTime: "asc" },
  });
}

export async function getContestsByPage(page: number, limit: number = 10) {
  const [contests, total] = await Promise.all([
    prisma.contest.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: { problems: { orderBy: { order: "asc" } } },
      orderBy: { startTime: "asc" },
    }),
    prisma.contest.count(),
  ]);

  return {
    page: page,
    limit,
    total,
    data: contests,
  };
}

export async function getContestById(contestId: string) {
  return await prisma.contest.findUnique({
    where: { id: contestId },
    include: { problems: { orderBy: { order: "asc" } } },
  });
}

/// ### LABS QUERIES #### ----------------------------------------->
export interface LabsData {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  instituteId: string | null;
  createdById: string | null;
  memberCount: number;
  assignmentCount: number;
  resourceCount: number;
}

export async function getAllLabs(): Promise<LabsData[]> {
  const labs = await prisma.lab.findMany({
    include: {
      members: true,
      assignments: true,
      resource: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return labs.map((lab) => ({
    id: lab.id,
    title: lab.title,
    slug: lab.slug,
    description: lab.description,
    instituteId: lab.instituteId,
    createdById: lab.createdById,
    memberCount: lab.members.length,
    assignmentCount: lab.assignments.length,
    resourceCount: lab.resource.length,
  }));
}

export async function getLabsByInstituteId(
  instituteId: string,
): Promise<LabsData[]> {
  const labs = await prisma.lab.findMany({
    where: { instituteId },
    include: {
      members: true,
      assignments: true,
      resource: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return labs.map((lab) => ({
    id: lab.id,
    title: lab.title,
    slug: lab.slug,
    description: lab.description,
    instituteId: lab.instituteId,
    createdById: lab.createdById,
    memberCount: lab.members.length,
    assignmentCount: lab.assignments.length,
    resourceCount: lab.resource.length,
  }));
}

export async function getLabsByPage(
  page: number,
  limit: number = 10,
): Promise<{ page: number; limit: number; total: number; data: LabsData[] }> {
  const [labs, total] = await Promise.all([
    prisma.lab.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        members: true,
        assignments: true,
        resource: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.lab.count(),
  ]);

  return {
    page,
    limit,
    total,
    data: labs.map((lab) => ({
      id: lab.id,
      title: lab.title,
      slug: lab.slug,
      description: lab.description,
      instituteId: lab.instituteId,
      createdById: lab.createdById,
      memberCount: lab.members.length,
      assignmentCount: lab.assignments.length,
      resourceCount: lab.resource.length,
    })),
  };
}

export async function getLabById(labId: string) {
  return await prisma.lab.findUnique({
    where: { id: labId },
    include: {
      institute: true,
      createdBy: {
        select: { id: true, name: true, email: true, image: true },
      },
      members: {
        include: {
          user: {
            select: { id: true, name: true, email: true, image: true },
          },
        },
        orderBy: { joinedAt: "asc" },
      },
      assignments: {
        include: {
          problems: {
            orderBy: { order: "asc" },
          },
          resource: {
            orderBy: { order: "asc" },
          },
        },
        orderBy: { startTime: "asc" },
      },
      resource: {
        where: { assignmentId: null },
        orderBy: { order: "asc" },
      },
    },
  });
}

export async function getLabBySlug(slug: string) {
  return await prisma.lab.findUnique({
    where: { slug },
    include: {
      institute: true,
      createdBy: {
        select: { id: true, name: true, email: true, image: true },
      },
      members: {
        include: {
          user: {
            select: { id: true, name: true, email: true, image: true },
          },
        },
        orderBy: { joinedAt: "asc" },
      },
      assignments: {
        include: {
          problems: {
            orderBy: { order: "asc" },
          },
          resource: {
            orderBy: { order: "asc" },
          },
        },
        orderBy: { startTime: "asc" },
      },
      resource: {
        where: { assignmentId: null },
        orderBy: { order: "asc" },
      },
    },
  });
}

export async function getLabMembers(labId: string) {
  return await prisma.labMember.findMany({
    where: { labId },
    include: {
      user: {
        select: { id: true, name: true, email: true, image: true, role: true },
      },
    },
    orderBy: { joinedAt: "asc" },
  });
}

/// ### ASSIGNMENT QUERIES #### ------------------------------------->

export async function getAssignmentById(assignmentId: string) {
  return await prisma.assignment.findUnique({
    where: { id: assignmentId },
    include: {
      lab: {
        include: {
          institute: true,
        },
      },
      problems: {
        orderBy: { order: "asc" },
      },
      resource: {
        orderBy: { order: "asc" },
      },
      parent: true,
      children: true,
    },
  });
}

export async function getAssignmentsByLabId(labId: string) {
  return await prisma.assignment.findMany({
    where: { labId },
    include: {
      problems: {
        orderBy: { order: "asc" },
      },
      resource: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { startTime: "asc" },
  });
}

/// ### RESOURCE QUERIES #### --------------------------------------->

export async function getResourceById(resourceId: string) {
  return await prisma.resource.findUnique({
    where: { id: resourceId },
    include: {
      assignment: true,
      lab: true,
      uploadedBy: {
        select: { id: true, name: true, email: true, image: true },
      },
    },
  });
}

export async function getResourcesByLabId(labId: string) {
  return await prisma.resource.findMany({
    where: { labId, assignmentId: null },
    include: {
      uploadedBy: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { order: "asc" },
  });
}

export async function getResourcesByAssignmentId(assignmentId: string) {
  return await prisma.resource.findMany({
    where: { assignmentId },
    include: {
      uploadedBy: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { order: "asc" },
  });
}

/// ### INSTITUTE QUERIES #### ------------------------------------->

export async function getAllInstitutes() {
  const institutes = await prisma.institute.findMany({
    include: {
      members: true,
      labs: true,
      contests: true,
    },
    orderBy: { name: "asc" },
  });

  return institutes.map((inst) => ({
    id: inst.id,
    name: inst.name,
    slug: inst.slug,
    description: inst.description,
    memberCount: inst.members.length,
    labCount: inst.labs.length,
    contestCount: inst.contests.length,
  }));
}

export async function getInstitutesByPage(page: number, limit: number = 10) {
  const [institutes, total] = await Promise.all([
    prisma.institute.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        members: true,
        labs: true,
        contests: true,
      },
      orderBy: { name: "asc" },
    }),
    prisma.institute.count(),
  ]);

  return {
    page,
    limit,
    total,
    data: institutes.map((inst) => ({
      id: inst.id,
      name: inst.name,
      slug: inst.slug,
      description: inst.description,
      memberCount: inst.members.length,
      labCount: inst.labs.length,
      contestCount: inst.contests.length,
    })),
  };
}

export async function getInstituteById(instituteId: string) {
  return await prisma.institute.findUnique({
    where: { id: instituteId },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              role: true,
            },
          },
        },
        orderBy: { joinedAt: "asc" },
      },
      labs: {
        include: {
          members: true,
          assignments: true,
        },
      },
      contests: {
        orderBy: { startTime: "desc" },
      },
    },
  });
}

export async function getInstituteBySlug(slug: string) {
  return await prisma.institute.findUnique({
    where: { slug },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              role: true,
            },
          },
        },
        orderBy: { joinedAt: "asc" },
      },
      labs: {
        include: {
          members: true,
          assignments: true,
        },
      },
      contests: {
        orderBy: { startTime: "desc" },
      },
    },
  });
}

/// ### SUBMISSION QUERIES #### ------------------------------------->

export type SubmissionStatus =
  | "PENDING"
  | "ACCEPTED"
  | "WRONG_ANSWER"
  | "TIME_LIMIT_EXCEEDED"
  | "MEMORY_LIMIT_EXCEEDED"
  | "RUNTIME_ERROR"
  | "COMPILATION_ERROR";

export type CreateSubmissionRequest = {
  userId: string; // from the session cookie
  problemId: string; // from the route param
  code: string; // source code
  language: string; // "python", "cpp", etc.
  status: SubmissionStatus; // "ACCEPTED" | "WRONG_ANSWER" | "RUNTIME_ERROR" | ...
  testCasesPassed: number; // how many passed
  totalTestCases: number; // total run
  contestId?: string; // only if contest submission
  runtime?: number; // ms (from Date.now() wrapper)
  memory?: number; // KB (null for now — Piston doesn't provide it)
  output?: string; // stdout summary
  error?: string; // stderr if any
};

export async function getSubmissionsByUserId(userId: string) {
  return await prisma.submission.findMany({
    where: { userId },
    include: {
      problem: {
        select: {
          id: true,
          title: true,
          slug: true,
          difficulty: true,
          tag: true,
        },
      },
      contest: {
        select: { id: true, title: true, slug: true },
      },
    },
    orderBy: { submittedAt: "desc" },
  });
}

export async function getSubmissionsByProblemId(problemId: string) {
  return await prisma.submission.findMany({
    where: { problemId },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { submittedAt: "desc" },
  });
}

export async function createSubmission(
  submissionData: CreateSubmissionRequest,
): Promise<ReturnType<typeof prisma.submission.create>> {
  const response = await prisma.submission.create({
    data: submissionData,
  });

  return response;
}

// problems solved
export async function totalProblemsSolved(userId: string) {
  const problems = await prisma.submission.groupBy({
    where: {
      userId,
      status: "ACCEPTED",
    },
    by: ["problemId"],
  });

  // const problems = await prisma.submission.findMany({
  //   where: { userId, status: "ACCEPTED" },
  //   distinct: ["problemId"],
  //   orderBy: { submittedAt: "desc" },
  //   select: {
  //     problemId: true,
  //     submittedAt: true,
  //     problem: {
  //       select: {
  //         id: true,
  //         title: true,
  //         slug: true,
  //         difficulty: true,
  //         tag: true,
  //       },
  //     },
  //   },
  // });

  return problems.length;
}

// total submissions
export async function totalSubmissions(userId: string) {
  return await prisma.submission.count({
    where: { userId },
  });
}

// current streak
export async function currentStreak(userId: string) {
  const submissions = await prisma.submission.findMany({
    where: { userId, status: "ACCEPTED" },
    orderBy: { submittedAt: "desc" },
    select: { submittedAt: true },
  });

  if (submissions.length === 0) return 0;

  // Get unique dates (YYYY-MM-DD) in descending order
  const uniqueDays = [
    ...new Set(
      submissions.map((s) => s.submittedAt.toISOString().slice(0, 10)),
    ),
  ];

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < uniqueDays.length; i++) {
    const expected = new Date(today);
    expected.setDate(expected.getDate() - i);
    const expectedStr = expected.toISOString().slice(0, 10);

    if (uniqueDays[i] === expectedStr) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

// contests participated
export async function contestsParticipated(userId: string) {
  return await prisma.submission.findMany({
    where: { userId, contestId: { not: null } },
    distinct: ["contestId"],
    orderBy: { submittedAt: "desc" },
  });
}

// recent activity
export async function recentActivity(userId: string) {
  return await prisma.submission.findMany({
    where: { userId },
    include: {
      problem: {
        select: {
          id: true,
          title: true,
          difficulty: true,
        },
      },
      contest: {
        select: { id: true, title: true },
      },
    },
    orderBy: { submittedAt: "desc" },
    take: 5,
  });
}

/// ### USER QUERIES #### ------------------------------------------->

export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      submissions: {
        orderBy: { submittedAt: "desc" },
        take: 20,
      },
      instituteMemberships: {
        include: { institute: true },
      },
      labMemberships: {
        include: { lab: true },
      },
      createdLabs: true,
      createdContests: true,
    },
  });
}

export async function getUser(email?: string, username?: string) {
  return await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { username: username }],
    },
  });
}

export async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      image: true,
      createdAt: true,
      role: true,
    },
  });
}

/// ### PROBLEM QUERIES #### ---------------------------------------->

export async function getProblemById(
  problemId: string,
): Promise<Problem | null> {
  return await prisma.problem.findUnique({
    where: { id: problemId },
  });
}

export async function getProblemsByTag(tag: ProblemTag) {
  return await prisma.problem.findMany({
    where: { tag },
  });
}

export interface CodingQuestionData {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  constraints: string[];
  samples: { input: string; output: string; explanation?: string }[];
  testCases: { input: string; output: string; explanation?: string }[];
  starterCode: Record<string, string>;
}

const starterCodeTemplates: Record<string, string> = {
  javascript: `function solution(input) {
  // Write your code here
  return result;
}
`,
  python: `def solution(input):
    # Write your code here
    return result
`,
  java: `class Solution {
    public String solution(String input) {
        // Write your code here
        return "";
    }
}
`,
  cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Write your code here
    return 0;
}
`,
  typescript: `function solution(input: string): string {
  // Write your code here
  return "";
}
`,
};

export const createUser = async (
  name: string,
  email: string,
  image: string,
) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  console.log("User created successfully", user);
  return user;
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export async function getCodingQuestion(
  problemId: string,
): Promise<CodingQuestionData | null> {
  const p = await prisma.problem.findUnique({
    where: { id: problemId },
  });
  if (!p) return null;

  const constraints = p.constraints
    ? p.constraints.split("\n").filter(Boolean)
    : [];

  const samples: { input: string; output: string; explanation?: string }[] = [];
  if (p.sampleInput && p.sampleOutput) {
    samples.push({
      input: p.sampleInput,
      output: p.sampleOutput,
    });
  }

  const testCases: { input: string; output: string; explanation?: string }[] =
    [];
  if (p.testCases && Array.isArray(p.testCases)) {
    for (const tc of p.testCases as {
      input: string;
      expectedOutput: string;
    }[]) {
      testCases.push({
        input: tc.input,
        output: tc.expectedOutput,
      });
    }
  }

  return {
    id: p.id,
    title: p.title,
    difficulty:
      p.difficulty === "EASY"
        ? "Easy"
        : p.difficulty === "MEDIUM"
          ? "Medium"
          : "Hard",
    description: p.description || "",
    constraints,
    samples,
    testCases,
    starterCode: { ...starterCodeTemplates },
  };
}
