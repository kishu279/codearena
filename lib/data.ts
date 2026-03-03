import { prisma } from "./prisma";
import { Difficulty, ProblemTag, ContestStatus } from "@prisma/client";

export { Difficulty, ProblemTag, ContestStatus } from "@prisma/client";

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
  testCases: TestCase[] | null;
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
    starterCode: { ...starterCodeTemplates },
  };
}
