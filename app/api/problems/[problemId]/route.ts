import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCodingQuestion } from "@/lib/data";
import { errorResponse, successResponse, isGlobalAdmin } from "@/lib/api-utils";

type RouteContext = {
  params: Promise<{ problemId: string }>;
};

// GET /api/problems/[problemId]
export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { problemId } = await params;

  try {
    const problem = await getCodingQuestion(problemId);

    if (!problem) {
      return errorResponse("Problem not found.", 404);
    }

    return successResponse(problem);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to fetch problem",
      500,
    );
  }
}

// PUT /api/problems/[problemId]
// Body: { userId, ...fieldsToUpdate }
// Role: global ADMIN only
export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { problemId } = await params;

  try {
    const body = await request.json();
    const { userId, ...updateData } = body;

    if (!userId) {
      return errorResponse("userId is required.", 400);
    }

    const allowed = await isGlobalAdmin(userId);
    if (!allowed) {
      return errorResponse(
        "You do not have permission to update this problem.",
        403,
      );
    }

    const existing = await prisma.problem.findUnique({
      where: { id: problemId },
    });
    if (!existing) {
      return errorResponse("Problem not found.", 404);
    }

    const problem = await prisma.problem.update({
      where: { id: problemId },
      data: {
        ...(updateData.title && { title: updateData.title }),
        ...(updateData.slug && { slug: updateData.slug }),
        ...(updateData.description && { description: updateData.description }),
        ...(updateData.difficulty && { difficulty: updateData.difficulty }),
        ...(updateData.tag && { tag: updateData.tag }),
        ...(updateData.inputFormat !== undefined && {
          inputFormat: updateData.inputFormat,
        }),
        ...(updateData.outputFormat !== undefined && {
          outputFormat: updateData.outputFormat,
        }),
        ...(updateData.constraints !== undefined && {
          constraints: updateData.constraints,
        }),
        ...(updateData.sampleInput !== undefined && {
          sampleInput: updateData.sampleInput,
        }),
        ...(updateData.sampleOutput !== undefined && {
          sampleOutput: updateData.sampleOutput,
        }),
        ...(updateData.testCases !== undefined && {
          testCases: updateData.testCases,
        }),
        ...(updateData.timeLimit !== undefined && {
          timeLimit: updateData.timeLimit,
        }),
        ...(updateData.memoryLimit !== undefined && {
          memoryLimit: updateData.memoryLimit,
        }),
        ...(updateData.contestId !== undefined && {
          contestId: updateData.contestId,
        }),
        ...(updateData.assignmentId !== undefined && {
          assignmentId: updateData.assignmentId,
        }),
        ...(updateData.visibility && { visibility: updateData.visibility }),
        ...(updateData.instituteId !== undefined && {
          instituteId: updateData.instituteId,
        }),
        ...(updateData.order !== undefined && { order: updateData.order }),
      },
    });

    return successResponse(problem);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update problem",
      500,
    );
  }
}

// DELETE /api/problems/[problemId]
// Body: { userId }
// Role: global ADMIN only
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { problemId } = await params;

  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return errorResponse("userId is required.", 400);
    }

    const allowed = await isGlobalAdmin(userId);
    if (!allowed) {
      return errorResponse(
        "You do not have permission to delete this problem.",
        403,
      );
    }

    const existing = await prisma.problem.findUnique({
      where: { id: problemId },
    });
    if (!existing) {
      return errorResponse("Problem not found.", 404);
    }

    await prisma.problem.delete({ where: { id: problemId } });

    return successResponse({ deleted: true });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to delete problem",
      500,
    );
  }
}
