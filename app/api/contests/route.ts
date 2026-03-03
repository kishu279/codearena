import { NextResponse } from "next/server";

import { getAllContests } from "@/lib/data";

export async function GET() {
  try {
    const contests = await getAllContests();

    const formattedContests = contests.map((contest) => ({
      id: contest.id,
      title: contest.title,
      startTime: contest.startTime,
      endTime: contest.endTime,
      duration: contest.duration,
      status: contest.status,
      isPublic: contest.isPublic,
      description: contest.description,
      problems: contest.problems?.map((p) => ({
        id: p.id,
        title: p.title,
        difficulty: p.difficulty,
        order: p.order,
      })) || [],
    }));

    return NextResponse.json({ data: formattedContests });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contests', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
