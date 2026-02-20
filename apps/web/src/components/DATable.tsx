"use client";

import Link from "next/link";
import type { DA } from "@/lib/types";

function OutcomeBadge({ outcome }: { outcome: string }) {
  const cls =
    outcome === "Approved"
      ? "badge-approved"
      : outcome === "Refused"
        ? "badge-refused"
        : outcome === "Deferred"
          ? "badge-deferred"
          : "badge-assessment";
  return <span className={cls}>{outcome}</span>;
}

export default function DATable({ das }: { das: DA[] }) {
  if (das.length === 0) {
    return (
      <div className="card py-16 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <p className="font-semibold text-gray-900">No matching applications found</p>
        <p className="mt-1 text-sm text-gray-500">
          Try widening your filters to find development applications.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="table-header">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Address
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Council
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Zone
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Land Size
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Height
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                FSR
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Outcome
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {das.map((da) => (
              <tr
                key={da.id}
                className="group transition-colors hover:bg-gray-50"
              >
                <td className="px-4 py-3.5">
                  <Link
                    href={`/das/${da.id}`}
                    className="font-medium text-gray-900 transition-colors group-hover:text-brand-700"
                  >
                    {da.address}
                    <span className="ml-1.5 inline-block text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-400">
                      &rarr;
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3.5 text-gray-600">{da.council}</td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                    {da.zoning}
                  </span>
                </td>
                <td className="px-4 py-3.5 tabular-nums text-gray-600">
                  {da.land_size}
                </td>
                <td className="px-4 py-3.5 tabular-nums text-gray-600">
                  {da.height}
                </td>
                <td className="px-4 py-3.5 tabular-nums text-gray-600">
                  {da.FSR}
                </td>
                <td className="px-4 py-3.5">
                  <OutcomeBadge outcome={da.DA_outcome} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
