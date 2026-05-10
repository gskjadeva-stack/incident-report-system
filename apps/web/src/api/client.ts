import type { Incident, IncidentListResponse, IncidentPayload, IncidentStatus } from "../types/incident";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

type ApiEnvelope<T> = {
  data: T;
  error?: never;
};

type ApiErrorEnvelope = {
  data?: never;
  error: {
    message: string;
    details?: unknown;
  };
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    },
    ...init
  });

  const payload = (await response.json()) as ApiEnvelope<T> | ApiErrorEnvelope;

  if (!response.ok || "error" in payload) {
    throw new Error(payload.error?.message ?? "API request failed.");
  }

  return payload.data;
}

export function createIncident(payload: IncidentPayload) {
  return request<Incident>("/incidents", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function listIncidents(params?: { status?: IncidentStatus; search?: string }) {
  const query = new URLSearchParams();

  if (params?.status) query.set("status", params.status);
  if (params?.search) query.set("search", params.search);

  const suffix = query.toString() ? `?${query.toString()}` : "";
  return request<IncidentListResponse>(`/incidents${suffix}`);
}

export function updateIncidentStatus(id: string, status: IncidentStatus, statusNotes?: string) {
  return request<Incident>(`/incidents/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status, statusNotes })
  });
}
