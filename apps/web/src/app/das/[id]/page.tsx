import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDAData } from "@/lib/data";
import { MOCK_DAS } from "@/lib/mock-das";
import ApprovalScoreGauge from "@/components/ApprovalScoreGauge";
import ConditionsList from "@/components/ConditionsList";
import SimilarProjectsCard from "@/components/SimilarProjectsCard";

export function generateStaticParams() {
  return MOCK_DAS.map((da) => ({ id: da.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const da = MOCK_DAS.find((d) => d.id === params.id);
  if (!da) {
    return { title: "DA Not Found | DevIntel" };
  }

  const title = `DA: ${da.address} — ${da.council} Council | DevIntel`;
  const description = `${da.DA_outcome} development application at ${da.address}. Zoning ${da.zoning}, ${da.land_size} lot, ${da.height} height, FSR ${da.FSR}. View conditions and similar projects.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://devintel.site/das/${da.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://devintel.site/das/${da.id}`,
      siteName: "DevIntel",
      type: "article",
    },
  };
}

export default function DADetailPage({
  params,
}: {
  params: { id: string };
}) {
  const da = getDAData(params.id);
  if (!da) notFound();

  const outcomeCls =
    da.DA_outcome === "Approved"
      ? "badge-approved"
      : da.DA_outcome === "Refused"
        ? "badge-refused"
        : da.DA_outcome === "Deferred"
          ? "badge-deferred"
          : "badge-assessment";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentPermit",
    name: `Development Application — ${da.address}`,
    description: `${da.DA_outcome} DA at ${da.address}, ${da.council} Council. Zoning ${da.zoning}, ${da.land_size}, ${da.height} height, FSR ${da.FSR}.`,
    permitAudience: {
      "@type": "Audience",
      audienceType: "Property Developers, Town Planners, Architects",
    },
    issuedBy: {
      "@type": "GovernmentOrganization",
      name: `${da.council} Council`,
    },
    validIn: {
      "@type": "AdministrativeArea",
      name: da.council,
    },
  };

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <Link
          href="/das"
          className="flex items-center gap-1.5 text-gray-400 transition-colors hover:text-brand-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          DA Explorer
        </Link>
        <svg className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="truncate font-medium text-gray-700">
          {da.address}
        </span>
      </nav>

      {/* Header Card */}
      <div className="mb-8 rounded-2xl border border-gray-100 bg-gradient-to-r from-white to-gray-50/50 p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {da.address}
              </h1>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
                {da.council} Council
              </span>
              <span className={outcomeCls}>{da.DA_outcome}</span>
            </div>
          </div>
          <a
            href={`/api/das/${da.id}/report`}
            download={`${da.id}-determination.pdf`}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 transition-all hover:border-brand-600 hover:bg-brand-50 hover:text-brand-600 sm:px-6 sm:py-3"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span className="hidden sm:inline">Download Report</span>
            <span className="sm:hidden">PDF</span>
          </a>
        </div>

        {/* Property metrics */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-4">
          {[
            {
              label: "Zoning",
              value: da.zoning,
              icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
            },
            {
              label: "Land Size",
              value: da.land_size,
              icon: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4",
            },
            {
              label: "Height",
              value: da.height,
              icon: "M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12",
            },
            {
              label: "FSR",
              value: da.FSR,
              icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
            },
          ].map((metric) => (
            <div key={metric.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={metric.icon} />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400">
                  {metric.label}
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {metric.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* ── Left Column ── */}
        <div className="space-y-8 lg:col-span-2">
          {/* Key Conditions */}
          <section className="card">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50">
                <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Key Conditions
                </h2>
                <p className="text-xs text-gray-400">
                  {da.DA_outcome === "Approved" ? "Approval" : da.DA_outcome === "Refused" ? "Refusal" : "Assessment"} conditions in plain English
                </p>
              </div>
            </div>
            <ConditionsList conditions={da.key_conditions} />
          </section>

          {/* Similar Projects */}
          <section className="card">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50">
                <svg className="h-5 w-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Similar Projects
                </h2>
                <p className="text-xs text-gray-400">
                  {da.similar_projects.length} comparable DAs in {da.council}
                </p>
              </div>
            </div>
            <SimilarProjectsCard projects={da.similar_projects} />
          </section>
        </div>

        {/* ── Right Column ── */}
        <div className="space-y-6">
          {/* Approval Score */}
          <section className="card">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Approval Likelihood
                </h2>
                <p className="text-xs text-gray-400">
                  Based on {da.similar_projects.length} similar projects
                </p>
              </div>
            </div>
            <ApprovalScoreGauge score={da.approval_score} />
          </section>

          {/* PDF Links */}
          {da.pdf_links.length > 0 && (
            <section className="card">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">
                  <svg className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-gray-900">Documents</h2>
              </div>
              <div className="space-y-2">
                {da.pdf_links.map((link, i) => {
                  const filename = link.split("/").pop() || `Document ${i + 1}`;
                  return (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3 text-sm transition-all duration-200 hover:border-brand-200 hover:bg-brand-50/30"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50">
                        <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <span className="truncate font-medium text-gray-700">
                        {filename}
                      </span>
                      <svg className="ml-auto h-4 w-4 shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  );
                })}
              </div>
            </section>
          )}

          {/* JSON Export */}
          <section className="card">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-900">
                    API Response
                  </h2>
                  <p className="text-xs text-gray-400">
                    Structured JSON
                  </p>
                </div>
              </div>
            </div>
            <pre className="max-h-72 overflow-auto rounded-xl bg-gray-900 p-4 text-xs leading-relaxed text-emerald-400">
              {JSON.stringify(
                {
                  address: da.address,
                  council: da.council,
                  zoning: da.zoning,
                  land_size: da.land_size,
                  height: da.height,
                  FSR: da.FSR,
                  DA_outcome: da.DA_outcome,
                  key_conditions: da.key_conditions,
                  pdf_links: da.pdf_links,
                  similar_projects: da.similar_projects.map((p) => ({
                    address: p.address,
                    DA_outcome: p.DA_outcome,
                    key_conditions: p.key_conditions,
                  })),
                  approval_score: da.approval_score,
                },
                null,
                2
              )}
            </pre>
          </section>
        </div>
      </div>
    </div>
    </>
  );
}
