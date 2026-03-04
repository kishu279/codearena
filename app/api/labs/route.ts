import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAllLabs, getLabsByInstituteId } from "@/lib/data";
import {
  errorResponse,
  successResponse,
  isGlobalAdmin,
  isInstituteAdminOrInstructor,
} from "@/lib/api-utils";

// GET /api/labs  — list all labs (optionally filter by ?instituteId=)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const instituteId = searchParams.get("instituteId");

    const labs = instituteId
      ? await getLabsByInstituteId(instituteId)
      : await getAllLabs();

    return successResponse(labs);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to fetch labs",
      500,
    );
  }
}

// POST /api/labs  — create a new lab
// Body: { title, slug, description?, instituteId?, createdById }
// Role: ADMIN/SUPER_ADMIN or institute INSTRUCTOR
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, description, instituteId, createdById } = body;

    if (!title || !slug || !createdById) {
      return errorResponse("title, slug, and createdById are required.", 400);
    }

    // Role check
    const admin = await isGlobalAdmin(createdById);
    if (!admin) {
      if (instituteId) {
        const instRole = await isInstituteAdminOrInstructor(
          createdById,
          instituteId,
        );
        if (!instRole) {
          return errorResponse(
            "Only admins or institute instructors can create labs.",
            403,
          );
        }
      } else {
        return errorResponse(
          "Only admins can create platform-level labs.",
          403,
        );
      }
    }

    const lab = await prisma.lab.create({
      data: {
        title,
        slug,
        description: description ?? null,
        instituteId: instituteId ?? null,
        createdById,
      },
    });

    return successResponse(lab, 201);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Failed to create lab",
      500,
    );
  }
}
