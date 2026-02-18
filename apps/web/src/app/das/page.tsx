import type { Metadata } from "next";
import { Suspense } from "react";
import DAListContent from "@/components/DAListContent";

export const metadata: Metadata = {
  title: "DA Explorer — Search Development Applications | DevIntel",
  description:
    "Search and filter development applications across Parramatta, Blacktown & Hornsby. View approval rates, conditions, and similar projects.",
  alternates: {
    canonical: "https://devintel.site/das",
  },
  openGraph: {
    title: "DA Explorer — Search Development Applications | DevIntel",
    description:
      "Search and filter development applications across Parramatta, Blacktown & Hornsby. View approval rates, conditions, and similar projects.",
    url: "https://devintel.site/das",
    siteName: "DevIntel",
    type: "website",
  },
};

export default function DAListPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
            <svg className="h-5 w-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              DA Explorer
            </h1>
            <p className="text-sm text-gray-500">
              Search and filter development applications across Parramatta, Blacktown & Hornsby
            </p>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="rounded-2xl border border-gray-100 bg-white py-20 shadow-card">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-brand-500 border-t-transparent" />
              <p className="text-sm text-gray-400">Loading...</p>
            </div>
          </div>
        }
      >
        <DAListContent />
      </Suspense>
    </div>
  );
}
