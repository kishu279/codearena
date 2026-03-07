import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getContestById } from "@/lib/data";
import { errorResponse, successResponse, isGlobalAdmin } from "@/lib/api-utils";

type RouteContext = {
  params: Promise<{ contestId: string }>;
};

// GET /api/contests/[contestId]
export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { contestId } = await params;

  try {
    const contest = await getContestById(contestId);

    if (!contest) {
      return errorResponse(`Contest ${contestId} not found.`, 404);
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
      problems:
        contest.problems?.map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          difficulty: p.difficulty,
          order: p.order,
          tag: p.tag,
        })) || [],
    };

    return successResponse(formattedContest);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to fetch contest",
      500,
    );
  }
}

// PUT /api/contests/[contestId]
// Body: { userId, ...fieldsToUpdate }
// Role: global ADMIN or contest creator
export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { contestId } = await params;

  try {
    const body = await request.json();
    const { userId, ...updateData } = body;

    if (!userId) {
      return errorResponse("userId is required.", 400);
    }

    const existing = await prisma.contest.findUnique({
      where: { id: contestId },
    });
    if (!existing) {
      return errorResponse("Contest not found.", 404);
    }

    const isAdmin = await isGlobalAdmin(userId);
    if (!isAdmin && existing.createdById !== userId) {
      return errorResponse(
        "You do not have permission to update this contest.",
        403,
      );
    }

    const contest = await prisma.contest.update({
      where: { id: contestId },
      data: {
        ...(updateData.title && { title: updateData.title }),
        ...(updateData.slug && { slug: updateData.slug }),
        ...(updateData.description !== undefined && {
          description: updateData.description,
        }),
        ...(updateData.startTime && {
          startTime: new Date(updateData.startTime),
        }),
        ...(updateData.endTime && { endTime: new Date(updateData.endTime) }),
        ...(updateData.duration !== undefined && {
          duration: updateData.duration,
        }),
        ...(updateData.status && { status: updateData.status }),
        ...(updateData.isPublic !== undefined && {
          isPublic: updateData.isPublic,
        }),
        ...(updateData.hostedBy && { hostedBy: updateData.hostedBy }),
        ...(updateData.instituteId !== undefined && {
          instituteId: updateData.instituteId,
        }),
      },
    });

    return successResponse(contest);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update contest",
      500,
    );
  }
}

// DELETE /api/contests/[contestId]
// Body: { userId }
// Role: global ADMIN or contest creator
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { contestId } = await params;

  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return errorResponse("userId is required.", 400);
    }

    const existing = await prisma.contest.findUnique({
      where: { id: contestId },
    });
    if (!existing) {
      return errorResponse("Contest not found.", 404);
    }

    const isAdmin = await isGlobalAdmin(userId);
    if (!isAdmin && existing.createdById !== userId) {
      return errorResponse(
        "You do not have permission to delete this contest.",
        403,
      );
    }

    await prisma.contest.delete({ where: { id: contestId } });

    return successResponse({ deleted: true });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to delete contest",
      500,
    );
  }
}
