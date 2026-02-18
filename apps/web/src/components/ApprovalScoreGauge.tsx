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
    color = "#059669";
    bgColor = "bg-emerald-50";
    label = "Likely Approved";
    description = "Strong precedent from similar approved projects";
  } else if (score >= 40) {
    color = "#d97706";
    bgColor = "bg-amber-50";
    label = "Uncertain";
    description = "Mixed signals from comparable developments";
  } else {
    color = "#dc2626";
    bgColor = "bg-red-50";
    label = "Likely Refused";
    description = "Similar projects have mostly been refused";
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`relative rounded-full p-4 ${bgColor}`}>
        <div className="relative h-36 w-36">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
              opacity="0.5"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold tracking-tight" style={{ color }}>
              {score}
            </span>
            <span className="text-xs font-medium text-gray-400">out of 100</span>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <span className="text-sm font-bold" style={{ color }}>
          {label}
        </span>
        <p className="mt-1 text-xs leading-relaxed text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}
