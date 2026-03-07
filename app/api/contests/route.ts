import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAllContests } from "@/lib/data";
import { errorResponse, successResponse, isGlobalAdmin } from "@/lib/api-utils";

// GET /api/contests
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
      problems:
        contest.problems?.map((p) => ({
          id: p.id,
          title: p.title,
          difficulty: p.difficulty,
          order: p.order,
        })) || [],
    }));

    return successResponse(formattedContests);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to fetch contests",
      500,
    );
  }
}

// POST /api/contests
// Body: { userId, title, slug, description?, startTime, endTime, duration, isPublic?, instituteId?, hostedBy? }
// Role: global ADMIN only
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, ...contestData } = body;

    if (!userId) {
      return errorResponse("userId is required.", 400);
    }

    const allowed = await isGlobalAdmin(userId);
    if (!allowed) {
      return errorResponse(
        "You do not have permission to create a contest.",
        403,
      );
    }

    if (
      !contestData.title ||
      !contestData.slug ||
      !contestData.startTime ||
      !contestData.endTime ||
      !contestData.duration
    ) {
      return errorResponse(
        "title, slug, startTime, endTime, and duration are required.",
        400,
      );
    }

    const contest = await prisma.contest.create({
      data: {
        title: contestData.title,
        slug: contestData.slug,
        description: contestData.description ?? null,
        startTime: new Date(contestData.startTime),
        endTime: new Date(contestData.endTime),
        duration: contestData.duration,
        status: contestData.status ?? "UPCOMING",
        isPublic: contestData.isPublic ?? true,
        hostedBy: contestData.hostedBy ?? "CODEARENA",
        createdById: userId,
        instituteId: contestData.instituteId ?? null,
      },
    });

    return successResponse(contest, 201);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to create contest",
      500,
    );
  }
}
