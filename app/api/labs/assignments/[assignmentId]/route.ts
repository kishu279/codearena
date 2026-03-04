import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAssignmentById } from "@/lib/data";
import { errorResponse, successResponse, canManageLab } from "@/lib/api-utils";

type RouteContext = { params: Promise<{ assignmentId: string }> };

// GET /api/labs/assignments/[assignmentId]  — full assignment detail
export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { assignmentId } = await params;

  try {
    const assignment = await getAssignmentById(assignmentId);

    if (!assignment) {
      return errorResponse(`Assignment ${assignmentId} not found.`, 404);
    }

    return successResponse(assignment);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to fetch assignment",
      500,
    );
  }
}

// PUT /api/labs/assignments/[assignmentId]  — update an assignment
// Body: { title?, description?, startTime?, endTime?, userId }
// Role: lab INSTRUCTOR or ADMIN
export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { assignmentId } = await params;

  try {
    const body = await request.json();
    const { userId, ...updateData } = body;

    if (!userId) {
      return errorResponse("userId is required.", 400);
    }

    const existing = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      select: { labId: true },
    });

    if (!existing) {
      return errorResponse(`Assignment ${assignmentId} not found.`, 404);
    }

    const allowed = await canManageLab(userId, existing.labId);
    if (!allowed) {
      return errorResponse(
        "You do not have permission to update this assignment.",
        403,
      );
    }

    const assignment = await prisma.assignment.update({
      where: { id: assignmentId },
      data: {
        ...(updateData.title && { title: updateData.title }),
        ...(updateData.description !== undefined && {
          description: updateData.description,
        }),
        ...(updateData.startTime && {
          startTime: new Date(updateData.startTime),
        }),
        ...(updateData.endTime && { endTime: new Date(updateData.endTime) }),
      },
      include: {
        problems: true,
        resource: true,
      },
    });

    return successResponse(assignment);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update assignment",
      500,
    );
  }
}

// DELETE /api/labs/assignments/[assignmentId]  — delete an assignment
// Body: { userId }
// Role: lab INSTRUCTOR or ADMIN
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { assignmentId } = await params;

  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return errorResponse("userId is required.", 400);
    }

    const existing = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      select: { labId: true },
    });

    if (!existing) {
      return errorResponse(`Assignment ${assignmentId} not found.`, 404);
    }

    const allowed = await canManageLab(userId, existing.labId);
    if (!allowed) {
      return errorResponse(
        "You do not have permission to delete this assignment.",
        403,
      );
    }

    await prisma.assignment.delete({ where: { id: assignmentId } });

    return successResponse({ deleted: true });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to delete assignment",
      500,
    );
  }
}
