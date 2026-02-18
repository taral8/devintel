import type { DAListResponse, DADetail, StatsResponse } from "./types";

function getApiBase(): string {
  if (typeof window === "undefined") {
    // Server-side: need absolute URL
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  }
  // Client-side: relative URLs work
  return "";
}

async function fetchAPI<T>(path: string): Promise<T> {
  const base = getApiBase();
  const res = await fetch(`${base}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getCouncils(): Promise<string[]> {
  return fetchAPI<string[]>("/api/councils");
}

export async function getDAs(params?: {
  council?: string;
  zoning?: string;
  outcome?: string;
}): Promise<DAListResponse> {
  const searchParams = new URLSearchParams();
  if (params?.council) searchParams.set("council", params.council);
  if (params?.zoning) searchParams.set("zoning", params.zoning);
  if (params?.outcome) searchParams.set("outcome", params.outcome);
  const qs = searchParams.toString();
  return fetchAPI<DAListResponse>(`/api/das${qs ? `?${qs}` : ""}`);
}

export async function getDA(id: string): Promise<DADetail> {
  return fetchAPI<DADetail>(`/api/das/${id}`);
}

export async function getStats(): Promise<StatsResponse> {
  return fetchAPI<StatsResponse>("/api/stats");
}
