import { prisma } from "./prisma";
import { NextResponse } from "next/server";

/**
 * Check if a user has SUPER_ADMIN or ADMIN global role.
 */
export async function isGlobalAdmin(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return user?.role === "SUPER_ADMIN" || user?.role === "ADMIN";
}

/**
 * Check if a user is an INSTRUCTOR in a specific lab.
 */
export async function isLabInstructor(
  userId: string,
  labId: string,
): Promise<boolean> {
  const member = await prisma.labMember.findUnique({
    where: { userId_labId: { userId, labId } },
    select: { role: true },
  });
  return member?.role === "INSTRUCTOR";
}

/**
 * Check if a user is an ADMIN or INSTRUCTOR in a specific institute.
 */
export async function isInstituteAdminOrInstructor(
  userId: string,
  instituteId: string,
): Promise<boolean> {
  const member = await prisma.instituteMember.findUnique({
    where: { userId_instituteId: { userId, instituteId } },
    select: { role: true },
  });
  return member?.role === "ADMIN" || member?.role === "INSTRUCTOR";
}

/**
 * Check if a user can manage a lab (global admin OR lab instructor OR lab creator).
 */
export async function canManageLab(
  userId: string,
  labId: string,
): Promise<boolean> {
  const admin = await isGlobalAdmin(userId);
  if (admin) return true;

  const instructor = await isLabInstructor(userId, labId);
  if (instructor) return true;

  const lab = await prisma.lab.findUnique({
    where: { id: labId },
    select: { createdById: true },
  });
  return lab?.createdById === userId;
}

/**
 * Standard JSON error response.
 */
export function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Standard JSON success response.
 */
export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ data }, { status });
}
