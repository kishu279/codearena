import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAssignmentsByLabId } from "@/lib/data";
import { errorResponse, successResponse, canManageLab } from "@/lib/api-utils";

type RouteContext = { params: Promise<{ labId: string }> };

// GET /api/labs/[labId]/assignments  — all assignments for a lab
export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { labId } = await params;

  try {
    const assignments = await getAssignmentsByLabId(labId);
    return successResponse(assignments);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to fetch assignments",
      500,
    );
  }
}

// POST /api/labs/[labId]/assignments  — create a new assignment in a lab
// Body: { title, description?, startTime, endTime, userId, isRecurring?, recurringType?, problemIds? }
// Role: lab INSTRUCTOR or ADMIN
export async function POST(request: NextRequest, { params }: RouteContext) {
  const { labId } = await params;

  try {
    const body = await request.json();
    const {
      title,
      description,
      startTime,
      endTime,
      userId,
      isRecurring,
      recurringType,
      problemIds,
    } = body;

    if (!title || !startTime || !endTime || !userId) {
      return errorResponse(
        "title, startTime, endTime, and userId are required.",
        400,
      );
    }

    const allowed = await canManageLab(userId, labId);
    if (!allowed) {
      return errorResponse(
        "You do not have permission to create assignments in this lab.",
        403,
      );
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description: description ?? null,
        labId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        isRecurring: isRecurring ?? false,
        recurringType: recurringType ?? null,
        ...(problemIds?.length && {
          problems: {
            connect: problemIds.map((id: string) => ({ id })),
          },
        }),
      },
      include: {
        problems: true,
        resource: true,
      },
    });

    return successResponse(assignment, 201);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to create assignment",
      500,
    );
  }
}
