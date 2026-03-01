import contestsData from "../prisma/data/contests.json" with { type: "json" };
import problemsData from "../prisma/data/problems.json" with { type: "json" };

export type Difficulty = "EASY" | "MEDIUM" | "HARD";
export type ProblemTag = "CONTEST" | "LAB" | "PRACTICE";
export type ContestStatus = "UPCOMING" | "ACTIVE" | "ENDED";

interface RawProblem {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  tag: string;
  inputFormat?: string;
  outputFormat?: string;
  constraints?: string;
  sampleInput?: string;
  sampleOutput?: string;
  testCases?: unknown;
  timeLimit: number;
  memoryLimit: number;
  contestId?: string | null;
  order?: number | null;
}

interface RawContest {
  id: string;
  title: string;
  slug: string;
  description?: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: string;
  isPublic: boolean;
  problems?: { id: string; title: string; slug: string; difficulty: string; order: number | null }[];
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
  description?: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: ContestStatus;
  isPublic: boolean;
  problems: ContestProblem[];
}

function toDifficulty(d: string): Difficulty {
  return d as Difficulty;
}

function toTag(t: string): ProblemTag {
  return t as ProblemTag;
}

function toStatus(s: string): ContestStatus {
  return s as ContestStatus;
}

export function getAllContests(): Contest[] {
  const now = new Date().getTime();

  const contests: Contest[] = contestsData.map((c: RawContest) => {
    const contestProblems = c.problems || [];
    
    const problems: ContestProblem[] = contestProblems
      .map((cp: { id: string; title: string; slug: string; difficulty: string; order: number | null }) => {
        const problem = problemsData.find((p: RawProblem) => p.id === cp.id);
        return {
          id: cp.id,
          title: cp.title,
          slug: cp.slug,
          difficulty: toDifficulty(cp.difficulty),
          order: cp.order ?? null,
          tag: problem ? toTag(problem.tag) : "PRACTICE" as ProblemTag,
        };
      });

    return {
      id: c.id,
      title: c.title,
      slug: c.slug,
      description: c.description,
      startTime: c.startTime,
      endTime: c.endTime,
      duration: c.duration,
      status: toStatus(c.status),
      isPublic: c.isPublic,
      problems,
    };
  });

  return contests.sort((a, b) => {
    const aStart = new Date(a.startTime).getTime();
    const bStart = new Date(b.startTime).getTime();
    const aEnd = new Date(a.endTime).getTime();
    const bEnd = new Date(b.endTime).getTime();

    const aIsActive = now >= aStart && now <= aEnd;
    const bIsActive = now >= bStart && now <= bEnd;
    const aIsUpcoming = now < aStart;
    const bIsUpcoming = now < bStart;

    if (aIsActive && !bIsActive) return -1;
    if (!aIsActive && bIsActive) return 1;
    if (aIsUpcoming && !bIsUpcoming) return -1;
    if (!aIsUpcoming && bIsUpcoming) return 1;

    return aStart - bStart;
  });
}

export function getContestById(contestId: string): Contest | undefined {
  const contest = contestsData.find((c: RawContest) => c.id === contestId);
  if (!contest) return undefined;

  const problems: ContestProblem[] = problemsData
    .filter((p: RawProblem) => p.contestId === contestId)
    .sort((a: RawProblem, b: RawProblem) => (a.order || 0) - (b.order || 0))
    .map((p: RawProblem) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      difficulty: toDifficulty(p.difficulty),
      order: p.order ?? null,
      tag: toTag(p.tag),
    }));

  return {
    id: contest.id,
    title: contest.title,
    slug: contest.slug,
    description: contest.description,
    startTime: contest.startTime,
    endTime: contest.endTime,
    duration: contest.duration,
    status: toStatus(contest.status),
    isPublic: contest.isPublic,
    problems,
  };
}

export interface Problem {
  id: string;
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
  testCases?: unknown;
  timeLimit: number;
  memoryLimit: number;
  contestId?: string | null;
  order?: number | null;
}

export function getAllProblems(): Problem[] {
  return problemsData.map((p: RawProblem) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    difficulty: toDifficulty(p.difficulty),
    tag: toTag(p.tag),
    inputFormat: p.inputFormat,
    outputFormat: p.outputFormat,
    constraints: p.constraints,
    sampleInput: p.sampleInput,
    sampleOutput: p.sampleOutput,
    testCases: p.testCases,
    timeLimit: p.timeLimit,
    memoryLimit: p.memoryLimit,
    contestId: p.contestId,
    order: p.order,
  }));
}

export function getProblemById(problemId: string): Problem | undefined {
  const p = problemsData.find((p: RawProblem) => p.id === problemId);
  if (!p) return undefined;
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    difficulty: toDifficulty(p.difficulty),
    tag: toTag(p.tag),
    inputFormat: p.inputFormat,
    outputFormat: p.outputFormat,
    constraints: p.constraints,
    sampleInput: p.sampleInput,
    sampleOutput: p.sampleOutput,
    testCases: p.testCases,
    timeLimit: p.timeLimit,
    memoryLimit: p.memoryLimit,
    contestId: p.contestId,
    order: p.order,
  };
}

export function getProblemsByTag(tag: ProblemTag): Problem[] {
  return problemsData
    .filter((p: RawProblem) => p.tag === tag)
    .map((p: RawProblem) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      difficulty: toDifficulty(p.difficulty),
      tag: toTag(p.tag),
      inputFormat: p.inputFormat,
      outputFormat: p.outputFormat,
      constraints: p.constraints,
      sampleInput: p.sampleInput,
      sampleOutput: p.sampleOutput,
      testCases: p.testCases,
      timeLimit: p.timeLimit,
      memoryLimit: p.memoryLimit,
      contestId: p.contestId,
      order: p.order,
    }));
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

export function getCodingQuestion(problemId: string): CodingQuestionData | undefined {
  const p = problemsData.find((problem: RawProblem) => problem.id === problemId);
  if (!p) return undefined;

  const constraints = p.constraints ? p.constraints.split("\n").filter(Boolean) : [];
  
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
    difficulty: p.difficulty === "EASY" ? "Easy" : p.difficulty === "MEDIUM" ? "Medium" : "Hard",
    description: p.description || "",
    constraints,
    samples,
    starterCode: { ...starterCodeTemplates },
  };
}
