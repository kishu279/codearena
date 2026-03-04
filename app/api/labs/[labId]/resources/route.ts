import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getResourcesByLabId } from "@/lib/data";
import { errorResponse, successResponse, canManageLab } from "@/lib/api-utils";

type RouteContext = { params: Promise<{ labId: string }> };

// GET /api/labs/[labId]/resources  — lab-level resources
export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { labId } = await params;

  try {
    const resources = await getResourcesByLabId(labId);
    return successResponse(resources);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to fetch lab resources",
      500,
    );
  }
}

// POST /api/labs/[labId]/resources  — create a lab-level resource
// Body: { title, type, description?, url?, fileUrl?, content?, uploadedById, order?, isPublic? }
// Role: lab INSTRUCTOR or ADMIN
export async function POST(request: NextRequest, { params }: RouteContext) {
  const { labId } = await params;

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

    const allowed = await canManageLab(uploadedById, labId);
    if (!allowed) {
      return errorResponse(
        "You do not have permission to add resources to this lab.",
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
        labId,
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
