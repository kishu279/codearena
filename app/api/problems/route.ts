import { NextResponse } from "next/server";

import { getAllProblems } from "@/lib/data";

export async function GET() {
  try {
    const problems = await getAllProblems();

    const formattedProblems = problems.map((problem) => ({
      id: problem.id,
      title: problem.title,
      slug: problem.slug,
      difficulty: problem.difficulty,
      tag: problem.tag,
      contestId: problem.contestId,
    }));

    return NextResponse.json({ data: formattedProblems });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch problems', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
