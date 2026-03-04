import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAllInstitutes, getInstituteById } from "@/lib/data";
import { errorResponse, successResponse, isGlobalAdmin } from "@/lib/api-utils";

// GET /api/institutes  — list all institutes
export async function GET() {
  try {
    const institutes = await getAllInstitutes();
    return successResponse(institutes);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to fetch institutes",
      500,
    );
  }
}

// POST /api/institutes  — create a new institute
// Body: { name, slug, description?, userId }
// Role: SUPER_ADMIN or ADMIN only
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, userId } = body;

    if (!name || !slug || !userId) {
      return errorResponse("name, slug, and userId are required.", 400);
    }

    const admin = await isGlobalAdmin(userId);
    if (!admin) {
      return errorResponse("Only admins can create institutes.", 403);
    }

    const institute = await prisma.institute.create({
      data: {
        name,
        slug,
        description: description ?? null,
      },
    });

    return successResponse(institute, 201);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to create institute",
      500,
    );
  }
}
