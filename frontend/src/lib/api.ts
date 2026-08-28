import { RSVPFormData, RSVPRecord, RSVPSummaryResponse } from "@/types";

// Empty string means relative URL, which automatically resolves to the host domain (Vercel, localhost, etc.)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function submitRSVP(data: RSVPFormData): Promise<RSVPRecord> {
  const response = await fetch(`${API_BASE_URL}/api/rsvp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: "Failed to submit RSVP" }));
    throw new Error(errorData.detail || "Failed to submit RSVP. Please try again.");
  }

  return response.json();
}

export async function fetchRSVPSummary(search?: string, attendingFilter?: boolean): Promise<RSVPSummaryResponse> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (attendingFilter !== undefined) params.append("filter_attending", attendingFilter.toString());

  const queryString = params.toString() ? `?${params.toString()}` : "";
  const response = await fetch(`${API_BASE_URL}/api/rsvps${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch RSVPs from backend");
  }

  return response.json();
}

export function getExportCSVUrl(): string {
  return `${API_BASE_URL}/api/rsvps/export`;
}
