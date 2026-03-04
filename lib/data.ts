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

export async function getAllContests() {
  return await prisma.contest.findMany({
    include: { problems: { orderBy: { order: "asc" } } },
    orderBy: { startTime: "asc" },
  });
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
