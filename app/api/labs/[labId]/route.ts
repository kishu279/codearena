import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getLabById } from "@/lib/data";
import { errorResponse, successResponse, canManageLab } from "@/lib/api-utils";

type RouteContext = { params: Promise<{ labId: string }> };

// GET /api/labs/[labId]  — full lab detail
export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { labId } = await params;

  try {
    const lab = await getLabById(labId);

    if (!lab) {
      return errorResponse(`Lab ${labId} not found.`, 404);
    }

    return successResponse(lab);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to fetch lab",
      500,
    );
  }
}

// PUT /api/labs/[labId]  — update a lab
// Body: { title?, description?, userId }
// Role: lab creator, lab INSTRUCTOR, or global ADMIN
export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { labId } = await params;

  try {
    const body = await request.json();
    const { userId, ...updateData } = body;

    if (!userId) {
      return errorResponse("userId is required.", 400);
    }

    const allowed = await canManageLab(userId, labId);
    if (!allowed) {
      return errorResponse("You do not have permission to update this lab.", 403);
    }

    const lab = await prisma.lab.update({
      where: { id: labId },
      data: {
        ...(updateData.title && { title: updateData.title }),
        ...(updateData.description !== undefined && {
          description: updateData.description,
        }),
      },
    });

    return successResponse(lab);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update lab",
      500,
    );
  }
}

// DELETE /api/labs/[labId]  — delete a lab
// Body: { userId }
// Role: lab creator or global ADMIN
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { labId } = await params;

  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return errorResponse("userId is required.", 400);
    }

    const allowed = await canManageLab(userId, labId);
    if (!allowed) {
      return errorResponse("You do not have permission to delete this lab.", 403);
    }

    await prisma.lab.delete({ where: { id: labId } });

    return successResponse({ deleted: true });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to delete lab",
      500,
    );
  }
}
