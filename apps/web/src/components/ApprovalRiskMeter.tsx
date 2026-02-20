import { RISK_METER, DISCLAIMER } from "@/lib/copy";
import type { RiskProfile } from "@/lib/risk-engine";

interface ApprovalRiskMeterProps {
  profile: RiskProfile;
  similarProjectsCount: number;
}

export default function ApprovalRiskMeter({
  profile,
  similarProjectsCount,
}: ApprovalRiskMeterProps) {
  const { score, level, drivers } = profile;

  let badgeClass: string;
  let barColor: string;
  let levelCopy: { label: string; description: string };

  if (level === "Low") {
    badgeClass =
      "bg-emerald-50 text-emerald-700 border-emerald-200";
    barColor = "bg-emerald-500";
    levelCopy = RISK_METER.levels.low;
  } else if (level === "Moderate") {
    badgeClass =
      "bg-amber-50 text-amber-700 border-amber-200";
    barColor = "bg-amber-500";
    levelCopy = RISK_METER.levels.moderate;
  } else {
    badgeClass =
      "bg-red-50 text-red-700 border-red-200";
    barColor = "bg-red-500";
    levelCopy = RISK_METER.levels.high;
  }

  return (
    <div className="card">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50">
          <svg
            className="h-4 w-4 text-brand-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900">
            {RISK_METER.title}
          </h2>
          <p className="text-xs text-gray-400">
            {RISK_METER.subtitle}
          </p>
        </div>
      </div>

      {/* Score display */}
      <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold tabular-nums tracking-tight text-gray-900">
              {score}
              <span className="text-sm font-medium text-gray-400">/100</span>
            </p>
          </div>
          <span
            className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${badgeClass}`}
          >
            {levelCopy.label}
          </span>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full ${barColor} transition-all duration-700`}
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-gray-400">{levelCopy.description}</p>
      </div>

      {/* Risk Drivers */}
      {drivers.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            {RISK_METER.riskDriversTitle}
          </h3>
          <ul className="space-y-1.5">
            {drivers.map((driver, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-md bg-gray-50 px-3 py-2 text-xs"
              >
                <svg
                  className="mt-0.5 h-3 w-3 shrink-0 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
                <div>
                  <span className="font-semibold text-gray-700">
                    {driver.factor}:
                  </span>{" "}
                  <span className="text-gray-500">{driver.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Comparable link */}
      {similarProjectsCount > 0 && (
        <a
          href="#comparable-precedents"
          className="flex items-center gap-1 text-xs font-medium text-brand-700 transition-colors hover:text-brand-900"
        >
          {RISK_METER.comparableLink}
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
      )}

      {/* Disclaimer */}
      <p className="mt-3 border-t border-gray-100 pt-3 text-2xs text-gray-300">
        {DISCLAIMER.short}
      </p>
    </div>
  );
}
