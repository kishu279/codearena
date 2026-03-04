import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getInstituteById } from "@/lib/data";
import {
  errorResponse,
  successResponse,
  isGlobalAdmin,
  isInstituteAdminOrInstructor,
} from "@/lib/api-utils";

type RouteContext = { params: Promise<{ instituteId: string }> };

// GET /api/institutes/[instituteId]  — full institute detail
export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { instituteId } = await params;

  try {
    const institute = await getInstituteById(instituteId);

    if (!institute) {
      return errorResponse(`Institute ${instituteId} not found.`, 404);
    }

    return successResponse(institute);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to fetch institute",
      500,
    );
  }
}

// PUT /api/institutes/[instituteId]  — update an institute
// Body: { name?, description?, userId }
// Role: ADMIN/SUPER_ADMIN or institute ADMIN
export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { instituteId } = await params;

  try {
    const body = await request.json();
    const { userId, ...updateData } = body;

    if (!userId) {
      return errorResponse("userId is required.", 400);
    }

    const globalAdmin = await isGlobalAdmin(userId);
    if (!globalAdmin) {
      const instAdmin = await isInstituteAdminOrInstructor(userId, instituteId);
      if (!instAdmin) {
        return errorResponse(
          "You do not have permission to update this institute.",
          403,
        );
      }
    }

    const institute = await prisma.institute.update({
      where: { id: instituteId },
      data: {
        ...(updateData.name && { name: updateData.name }),
        ...(updateData.description !== undefined && {
          description: updateData.description,
        }),
      },
    });

    return successResponse(institute);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to update institute",
      500,
    );
  }
}

// DELETE /api/institutes/[instituteId]  — delete an institute
// Body: { userId }
// Role: SUPER_ADMIN or ADMIN only
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { instituteId } = await params;

  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return errorResponse("userId is required.", 400);
    }

    const admin = await isGlobalAdmin(userId);
    if (!admin) {
      return errorResponse("Only admins can delete institutes.", 403);
    }

    await prisma.institute.delete({ where: { id: instituteId } });

    return successResponse({ deleted: true });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to delete institute",
      500,
    );
  }
}
