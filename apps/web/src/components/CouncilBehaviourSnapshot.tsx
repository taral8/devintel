import { COUNCIL_SNAPSHOT, DISCLAIMER } from "@/lib/copy";

interface CouncilBehaviourSnapshotProps {
  approvalRate: number;
  refusalThemes: string[];
  consentConditions: string[];
}

export default function CouncilBehaviourSnapshot({
  approvalRate,
  refusalThemes,
  consentConditions,
}: CouncilBehaviourSnapshotProps) {
  return (
    <div className="card">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50">
          <svg
            className="h-4 w-4 text-violet-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
            />
          </svg>
        </div>
        <h2 className="text-base font-bold text-gray-900">
          {COUNCIL_SNAPSHOT.title}
        </h2>
      </div>

      {/* Approval Rate */}
      <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">
            {COUNCIL_SNAPSHOT.approvalRate}
          </span>
          <span className="text-lg font-bold tabular-nums text-gray-900">
            {approvalRate}%
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${approvalRate}%` }}
          />
        </div>
      </div>

      {/* Refusal Themes */}
      <div className="mb-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          {COUNCIL_SNAPSHOT.refusalThemes}
        </h3>
        <ul className="space-y-1.5">
          {refusalThemes.map((theme, i) => (
            <li
              key={i}
              className="flex gap-2 rounded-md bg-red-50/50 px-3 py-2 text-xs text-gray-600"
            >
              <svg
                className="mt-0.5 h-3 w-3 shrink-0 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="leading-relaxed">{theme}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Consent Conditions */}
      <div className="mb-3">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          {COUNCIL_SNAPSHOT.consentConditions}
        </h3>
        <ul className="space-y-1.5">
          {consentConditions.map((condition, i) => (
            <li
              key={i}
              className="flex gap-2 rounded-md bg-emerald-50/50 px-3 py-2 text-xs text-gray-600"
            >
              <svg
                className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="leading-relaxed">{condition}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <p className="border-t border-gray-100 pt-3 text-2xs text-gray-300">
        {DISCLAIMER.short}
      </p>
    </div>
  );
}
