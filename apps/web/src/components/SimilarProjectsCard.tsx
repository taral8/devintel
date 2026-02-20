import type { SimilarProject } from "@/lib/types";

function MatchBar({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const color =
    pct >= 80
      ? "bg-emerald-500"
      : pct >= 60
        ? "bg-brand-600"
        : pct >= 40
          ? "bg-amber-500"
          : "bg-gray-300";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-14 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold tabular-nums text-gray-500">
        {pct}%
      </span>
    </div>
  );
}

function OutcomePill({ outcome }: { outcome: string }) {
  const cls =
    outcome === "Approved"
      ? "bg-status-approved-bg text-status-approved-text"
      : outcome === "Refused"
        ? "bg-status-refused-bg text-status-refused-text"
        : outcome === "Deferred"
          ? "bg-status-deferred-bg text-status-deferred-text"
          : "bg-status-assessment-bg text-status-assessment-text";
  return (
    <span className={`rounded-md px-1.5 py-0.5 text-xs font-semibold ${cls}`}>
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
      <div className="rounded-lg border border-dashed border-gray-300 py-6 text-center">
        <p className="text-sm text-gray-400">
          No comparable precedents found in this council area.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {projects.map((proj, i) => (
        <div
          key={i}
          className="group rounded-lg border border-gray-200 bg-gray-50 p-3.5 transition-colors duration-150 hover:border-gray-300 hover:bg-white"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 leading-snug">
                {proj.address}
              </p>
              <div className="mt-1.5 flex items-center gap-2.5">
                <OutcomePill outcome={proj.DA_outcome} />
                <MatchBar score={proj.similarity_score} />
              </div>
            </div>
          </div>
          {proj.key_conditions.length > 0 && (
            <ul className="mt-2.5 space-y-1 border-t border-gray-200 pt-2.5">
              {proj.key_conditions.slice(0, 2).map((c, j) => (
                <li key={j} className="flex gap-2 text-xs text-gray-500">
                  <svg className="mt-0.5 h-3 w-3 shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
