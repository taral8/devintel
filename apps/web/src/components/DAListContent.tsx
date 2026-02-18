"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DAFilters from "@/components/DAFilters";
import DATable from "@/components/DATable";
import type { DA } from "@/lib/types";

export default function DAListContent() {
  const searchParams = useSearchParams();
  const initialCouncil = searchParams.get("council") || "";

  const [council, setCouncil] = useState(initialCouncil);
  const [zoning, setZoning] = useState("");
  const [outcome, setOutcome] = useState("");
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
    <div className="space-y-6">
      <DAFilters
        council={council}
        zoning={zoning}
        outcome={outcome}
        onCouncilChange={setCouncil}
        onZoningChange={setZoning}
        onOutcomeChange={setOutcome}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
              Searching...
            </span>
          ) : (
            <>
              <span className="font-semibold text-gray-900">{total}</span>{" "}
              development applications
            </>
          )}
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-gray-100 bg-white py-20 shadow-card">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-brand-500 border-t-transparent" />
            <p className="text-sm text-gray-400">Loading applications...</p>
          </div>
        </div>
      ) : (
        <DATable das={das} />
      )}
    </div>
  );
}
