import type { SimilarProject } from "@/lib/types";

function MatchBar({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const color =
    pct >= 80
      ? "bg-emerald-500"
      : pct >= 60
        ? "bg-brand-500"
        : pct >= 40
          ? "bg-amber-500"
          : "bg-gray-300";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-bold tabular-nums text-gray-500">
        {pct}%
      </span>
    </div>
  );
}

function OutcomePill({ outcome }: { outcome: string }) {
  const cls =
    outcome === "Approved"
      ? "bg-emerald-50 text-emerald-700"
      : outcome === "Refused"
        ? "bg-red-50 text-red-700"
        : outcome === "Deferred"
          ? "bg-amber-50 text-amber-700"
          : "bg-sky-50 text-sky-700";
  return (
    <span className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${cls}`}>
      {outcome}
    </span>
  );
}

export default function SimilarProjectsCard({
  projects,
}: {
  projects: SimilarProject[];
}) {
  if (projects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 py-8 text-center">
        <p className="text-sm text-gray-400">
          No similar projects found in this council.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {projects.map((proj, i) => (
        <div
          key={i}
          className="group rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900 leading-snug">
                {proj.address}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <OutcomePill outcome={proj.DA_outcome} />
                <MatchBar score={proj.similarity_score} />
              </div>
            </div>
          </div>
          {proj.key_conditions.length > 0 && (
            <ul className="mt-3 space-y-1.5 border-t border-gray-100 pt-3">
              {proj.key_conditions.slice(0, 2).map((c, j) => (
                <li key={j} className="flex gap-2 text-sm text-gray-500">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
