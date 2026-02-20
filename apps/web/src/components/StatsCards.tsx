import type { StatsResponse } from "@/lib/types";

const icons = {
  total: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  approval: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  councils: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  review: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function StatsCards({ stats }: { stats: StatsResponse }) {
  const items = [
    {
      label: "Precedent Records",
      value: stats.total_das,
      icon: icons.total,
      iconBg: "bg-brand-50",
      iconColor: "text-brand-700",
    },
    {
      label: "Avg. Approval Rate",
      value: `${stats.overall_approval_rate}%`,
      icon: icons.approval,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "NSW Councils Covered",
      value: stats.councils.length,
      icon: icons.councils,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      label: "Active Assessments",
      value: stats.councils.reduce((sum, c) => sum + c.under_assessment, 0),
      icon: icons.review,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="card-hover group">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">{item.label}</p>
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor}`}
            >
              {item.icon}
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold tabular-nums tracking-tight text-gray-900">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
