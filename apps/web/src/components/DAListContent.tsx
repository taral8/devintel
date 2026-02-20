"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DAFilters from "@/components/DAFilters";
import DATable from "@/components/DATable";
import type { DA } from "@/lib/types";

export default function DAListContent() {
  const searchParams = useSearchParams();
  const initialCouncil = searchParams.get("council") || "";
  const initialOutcome = searchParams.get("outcome") || "";

  const [council, setCouncil] = useState(initialCouncil);
  const [zoning, setZoning] = useState("");
  const [outcome, setOutcome] = useState(initialOutcome);
  const [das, setDas] = useState<DA[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (council) params.set("council", council);
    if (zoning) params.set("zoning", zoning);
    if (outcome) params.set("outcome", outcome);
    const qs = params.toString();

    setLoading(true);
    fetch(`/api/das${qs ? `?${qs}` : ""}`)
      .then((r) => r.json())
      .then((data) => {
        setDas(data.results);
        setTotal(data.total);
      })
      .catch(() => {
        setDas([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [council, zoning, outcome]);

  return (
    <div className="space-y-4">
      <DAFilters
        council={council}
        zoning={zoning}
        outcome={outcome}
        onCouncilChange={setCouncil}
        onZoningChange={setZoning}
        onOutcomeChange={setOutcome}
      />

      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-gray-500">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
              Searching...
            </span>
          ) : (
            <>
              <span className="font-semibold tabular-nums text-gray-900">{total}</span>{" "}
              development application{total !== 1 ? "s" : ""}
            </>
          )}
        </p>
      </div>

      {loading ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="skeleton h-4 w-32" />
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4 border-b border-gray-100 last:border-0">
              <div className="skeleton h-4 flex-1 max-w-[200px]" />
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-4 w-10" />
              <div className="skeleton h-4 w-16" />
              <div className="skeleton h-4 w-12" />
              <div className="skeleton h-4 w-10" />
              <div className="skeleton h-5 w-20 rounded-md" />
            </div>
          ))}
        </div>
      ) : (
        <DATable das={das} />
      )}
    </div>
  );
}
