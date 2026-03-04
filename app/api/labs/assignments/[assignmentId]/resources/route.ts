import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getResourcesByAssignmentId } from "@/lib/data";
import { errorResponse, successResponse, canManageLab } from "@/lib/api-utils";

type RouteContext = { params: Promise<{ assignmentId: string }> };

// GET /api/labs/assignments/[assignmentId]/resources  — resources for an assignment
export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { assignmentId } = await params;

  try {
    const resources = await getResourcesByAssignmentId(assignmentId);
    return successResponse(resources);
  } catch (error) {
    return errorResponse(
      error instanceof Error
        ? error.message
        : "Failed to fetch assignment resources",
      500,
    );
  }
}

// POST /api/labs/assignments/[assignmentId]/resources  — create a resource for an assignment
// Body: { title, type, description?, url?, fileUrl?, content?, uploadedById, order?, isPublic? }
// Role: lab INSTRUCTOR or ADMIN
export async function POST(request: NextRequest, { params }: RouteContext) {
  const { assignmentId } = await params;

  try {
    const body = await request.json();
    const {
      title,
      type,
      description,
      url,
      fileUrl,
      content,
      uploadedById,
      order,
      isPublic,
    } = body;

    if (!title || !type || !uploadedById) {
      return errorResponse("title, type, and uploadedById are required.", 400);
    }

    // Look up the assignment to get its labId for role check
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      select: { labId: true },
    });

    if (!assignment) {
      return errorResponse(`Assignment ${assignmentId} not found.`, 404);
    }

    const allowed = await canManageLab(uploadedById, assignment.labId);
    if (!allowed) {
      return errorResponse(
        "You do not have permission to add resources to this assignment.",
        403,
      );
    }

    const resource = await prisma.resource.create({
      data: {
        title,
        type,
        description: description ?? null,
        url: url ?? null,
        fileUrl: fileUrl ?? null,
        content: content ?? null,
        assignmentId,
        uploadedById,
        order: order ?? null,
        isPublic: isPublic ?? false,
      },
    });

    return successResponse(resource, 201);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to create resource",
      500,
    );
  }
}
