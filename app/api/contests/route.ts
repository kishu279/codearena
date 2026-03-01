import { NextResponse } from "next/server";

import { getAllContests } from "@/lib/data";

export async function GET() {
  const contests = getAllContests();

  const formattedContests = contests.map((contest) => ({
    id: contest.id,
    title: contest.title,
    startTime: contest.startTime,
    endTime: contest.endTime,
    duration: contest.duration,
    status: contest.status,
    isPublic: contest.isPublic,
    description: contest.description,
    problems: contest.problems.map((p) => ({
      id: p.id,
      title: p.title,
      difficulty: p.difficulty,
      order: p.order,
    })),
  }));

  return NextResponse.json({ data: formattedContests });
}
