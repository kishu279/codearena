import { NextResponse } from "next/server";

import { getContestById } from "@/lib/data";

type ContestRouteContext = {
  params: Promise<{ contestId: string }>;
};

export async function GET(_request: Request, { params }: ContestRouteContext) {
  const { contestId } = await params;

  try {
    const contest = await getContestById(contestId);

    if (!contest) {
      return NextResponse.json({ error: `Contest ${contestId} not found.` }, { status: 404 });
    }

    const formattedContest = {
      id: contest.id,
      title: contest.title,
      slug: contest.slug,
      description: contest.description,
      startTime: contest.startTime,
      endTime: contest.endTime,
      duration: contest.duration,
      status: contest.status,
      isPublic: contest.isPublic,
      problems: contest.problems?.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        difficulty: p.difficulty,
        order: p.order,
        tag: p.tag,
      })) || [],
    };

    return NextResponse.json({ data: formattedContest });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contest', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
