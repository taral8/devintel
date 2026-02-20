export default function ApprovalScoreGauge({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const dashOffset = circumference - progress;

  let color: string;
  let bgColor: string;
  let label: string;
  let description: string;
  if (score >= 70) {
    color = "#0d9488";
    bgColor = "bg-emerald-50";
    label = "Low Risk — Likely Approved";
    description = "Strong precedent from similar approved projects in this council area";
  } else if (score >= 40) {
    color = "#b45309";
    bgColor = "bg-amber-50";
    label = "Moderate Risk — Uncertain";
    description = "Mixed signals from comparable developments — review conditions carefully";
  } else {
    color = "#b91c1c";
    bgColor = "bg-red-50";
    label = "High Risk — Likely Refused";
    description = "Similar projects have predominantly been refused in this area";
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`relative rounded-full p-3 ${bgColor}`}>
        <div className="relative h-32 w-32">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="6"
              opacity="0.5"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold tabular-nums tracking-tight" style={{ color }}>
              {score}
            </span>
            <span className="text-2xs font-medium text-gray-400">out of 100</span>
          </div>
        </div>
      </div>
      <div className="mt-3 text-center">
        <span className="text-sm font-bold" style={{ color }}>
          {label}
        </span>
        <p className="mt-0.5 text-xs leading-relaxed text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}
