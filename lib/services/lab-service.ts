import type {
  LabListItem,
  LabWithDetails,
  AssignmentFull,
  ResourceWithRelations,
} from "@/lib/types/database.types";

// ─── Response wrappers ───────────────────────────────────────────

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// ─── Lab fetchers ────────────────────────────────────────────────

export async function fetchAllLabs(
  signal?: AbortSignal,
): Promise<LabListItem[]> {
  const res = await fetch("/api/labs", {
    method: "GET",
    cache: "no-store",
    signal,
  });

  const payload = (await res.json()) as ApiResponse<LabListItem[]>;

  if (!res.ok || !payload.data) {
    throw new Error(payload.error ?? "Failed to fetch labs.");
  }

  return payload.data;
}

export async function fetchLabsByInstituteId(
  instituteId: string,
  signal?: AbortSignal,
): Promise<LabListItem[]> {
  const res = await fetch(`/api/labs?instituteId=${instituteId}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });

  const payload = (await res.json()) as ApiResponse<LabListItem[]>;

  if (!res.ok || !payload.data) {
    throw new Error(payload.error ?? "Failed to fetch labs by institute.");
  }

  return payload.data;
}

export async function fetchLabById(
  labId: string,
  signal?: AbortSignal,
): Promise<LabWithDetails> {
  const res = await fetch(`/api/labs/${labId}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });

  const payload = (await res.json()) as ApiResponse<LabWithDetails>;

  if (!res.ok || !payload.data) {
    throw new Error(payload.error ?? "Failed to fetch lab details.");
  }

  return payload.data;
}

// ─── Assignment fetchers ─────────────────────────────────────────

export async function fetchAssignmentById(
  assignmentId: string,
  signal?: AbortSignal,
): Promise<AssignmentFull> {
  const res = await fetch(`/api/labs/assignments/${assignmentId}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });

  const payload = (await res.json()) as ApiResponse<AssignmentFull>;

  if (!res.ok || !payload.data) {
    throw new Error(payload.error ?? "Failed to fetch assignment.");
  }

  return payload.data;
}

// ─── Resource fetchers ───────────────────────────────────────────

export async function fetchResourcesByLabId(
  labId: string,
  signal?: AbortSignal,
): Promise<ResourceWithRelations[]> {
  const res = await fetch(`/api/labs/${labId}/resources`, {
    method: "GET",
    cache: "no-store",
    signal,
  });

  const payload = (await res.json()) as ApiResponse<ResourceWithRelations[]>;

  if (!res.ok || !payload.data) {
    throw new Error(payload.error ?? "Failed to fetch resources.");
  }

  return payload.data;
}

export async function fetchResourcesByAssignmentId(
  assignmentId: string,
  signal?: AbortSignal,
): Promise<ResourceWithRelations[]> {
  const res = await fetch(`/api/labs/assignments/${assignmentId}/resources`, {
    method: "GET",
    cache: "no-store",
    signal,
  });

  const payload = (await res.json()) as ApiResponse<ResourceWithRelations[]>;

  if (!res.ok || !payload.data) {
    throw new Error(payload.error ?? "Failed to fetch assignment resources.");
  }

  return payload.data;
}
