import type {
  InstituteListItem,
  InstituteFull,
} from "@/lib/types/database.types";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export async function fetchAllInstitutes(
  signal?: AbortSignal,
): Promise<InstituteListItem[]> {
  const res = await fetch("/api/institutes", {
    method: "GET",
    cache: "no-store",
    signal,
  });

  const payload = (await res.json()) as ApiResponse<InstituteListItem[]>;

  if (!res.ok || !payload.data) {
    throw new Error(payload.error ?? "Failed to fetch institutes.");
  }

  return payload.data;
}

export async function fetchInstituteById(
  instituteId: string,
  signal?: AbortSignal,
): Promise<InstituteFull> {
  const res = await fetch(`/api/institutes/${instituteId}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });

  const payload = (await res.json()) as ApiResponse<InstituteFull>;

  if (!res.ok || !payload.data) {
    throw new Error(payload.error ?? "Failed to fetch institute.");
  }

  return payload.data;
}
