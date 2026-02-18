import Link from "next/link";
import type { CouncilInfo } from "@/lib/types";

const councilColors: Record<string, { accent: string; bg: string; bar: string }> = {
  Parramatta: {
    accent: "text-brand-600",
    bg: "bg-brand-50",
    bar: "bg-brand-500",
  },
  Blacktown: {
    accent: "text-violet-600",
    bg: "bg-violet-50",
    bar: "bg-violet-500",
  },
  Hornsby: {
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
    bar: "bg-emerald-500",
  },
};

export default function CouncilSelector({
  councils,
}: {
  councils: CouncilInfo[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {councils.map((council) => {
        const colors = councilColors[council.name] || councilColors.Parramatta;
        const approvalPct = council.approval_rate;

        return (
          <Link
            key={council.name}
            href={`/das?council=${encodeURIComponent(council.name)}`}
            className="card-hover group relative overflow-hidden"
          >
            {/* Top accent bar */}
            <div className={`absolute left-0 right-0 top-0 h-1 ${colors.bar}`} />

            <div className="flex items-start justify-between">
              <div>
                <h3 className={`text-xl font-bold text-gray-900 group-hover:${colors.accent} transition-colors`}>
                  {council.name}
                </h3>
                <p className="mt-0.5 text-sm text-gray-400">Council LGA</p>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg}`}
              >
                <svg
                  className={`h-5 w-5 ${colors.accent}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                  />
                </svg>
              </div>
            </div>

            {/* Approval rate bar */}
            <div className="mt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-gray-500">
                  Approval Rate
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {approvalPct}%
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${colors.bar} transition-all duration-500`}
                  style={{ width: `${approvalPct}%` }}
                />
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
              <div>
                <p className="text-xs text-gray-400">Total</p>
                <p className="text-sm font-bold text-gray-900">
                  {council.total_das}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Approved</p>
                <p className="text-sm font-bold text-emerald-600">
                  {council.approved}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Refused</p>
                <p className="text-sm font-bold text-red-600">
                  {council.refused}
                </p>
              </div>
            </div>

            {/* Hover arrow */}
            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gray-400 transition-colors group-hover:text-brand-600">
              View all DAs
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
