import { NextResponse } from "next/server";

import { getAllProblems } from "@/lib/data";

export async function GET() {
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
}
