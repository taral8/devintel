import type { Metadata } from "next";
import { Suspense } from "react";
import DAListContent from "@/components/DAListContent";

export const metadata: Metadata = {
  title: "Run Approval Risk Scan — Development Applications",
  description:
    "Scan development applications across Parramatta, Blacktown & Hornsby. Analyse approval risk, precedent matches, and consent conditions.",
  alternates: {
    canonical: "https://civroda.com/das",
  },
  openGraph: {
    title: "Run Approval Risk Scan | CivroDA",
    description:
      "Scan development applications across Parramatta, Blacktown & Hornsby. Analyse approval risk, precedent matches, and consent conditions.",
    url: "https://civroda.com/das",
    siteName: "CivroDA",
    type: "website",
  },
};

function SearchSkeleton() {
  return (
    <div className="space-y-6">
      {/* Filter skeleton */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <div className="skeleton h-4 w-4 rounded" />
          <div className="skeleton h-4 w-16" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <div className="skeleton-text-sm mb-2" />
            <div className="skeleton h-10 w-full rounded-lg" />
          </div>
          <div>
            <div className="skeleton-text-sm mb-2" />
            <div className="skeleton h-10 w-full rounded-lg" />
          </div>
          <div>
            <div className="skeleton-text-sm mb-2" />
            <div className="skeleton h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
      {/* Table skeleton */}
      <div className="card p-0 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <div className="skeleton h-4 w-48" />
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-4 border-b border-gray-100">
            <div className="skeleton h-4 w-48" />
            <div className="skeleton h-4 w-24" />
            <div className="skeleton h-4 w-12" />
            <div className="skeleton h-4 w-16" />
            <div className="skeleton h-4 w-12" />
            <div className="skeleton h-4 w-12" />
            <div className="skeleton h-5 w-20 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DAListPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50">
            <svg className="h-4.5 w-4.5 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Approval Risk Scan
            </h1>
            <p className="text-sm text-gray-500">
              Filter by council, zoning, and determination outcome across Parramatta, Blacktown &amp; Hornsby
            </p>
          </div>
        </div>
      </div>

      <Suspense fallback={<SearchSkeleton />}>
        <DAListContent />
      </Suspense>
    </div>
  );
}
