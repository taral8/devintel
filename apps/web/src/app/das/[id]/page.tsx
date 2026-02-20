import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDAData } from "@/lib/data";
import { MOCK_DAS } from "@/lib/mock-das";
import { computeRiskProfile } from "@/lib/risk-engine";
import { DA_DETAIL, DISCLAIMER } from "@/lib/copy";
import ApprovalRiskMeter from "@/components/ApprovalRiskMeter";
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
    return { title: "DA Not Found" };
  }

  const title = `${da.address} — ${da.council} Council Risk Profile`;
  const description = `${da.DA_outcome} development application at ${da.address}. Zoning ${da.zoning}, ${da.land_size} lot, ${da.height} height, FSR ${da.FSR}. View risk profile, conditions, and comparable precedents.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://civroda.com/das/${da.id}`,
    },
    openGraph: {
      title: `${title} | CivroDA`,
      description,
      url: `https://civroda.com/das/${da.id}`,
      siteName: "CivroDA",
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

  const riskProfile = computeRiskProfile(da);

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
      audienceType: "Property Developers, Town Planners, Architects, Lenders",
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-5 flex items-center gap-2 text-sm" aria-label="Breadcrumb">
        <Link
          href="/das"
          className="flex items-center gap-1.5 text-gray-400 transition-colors hover:text-brand-700"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {DA_DETAIL.breadcrumb}
        </Link>
        <svg className="h-3.5 w-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="truncate font-medium text-gray-700">
          {da.address}
        </span>
      </nav>

      {/* Header Card */}
      <div className="mb-6 card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              {da.address}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2.5">
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
            target="_blank"
            rel="noopener noreferrer"
            download={`${da.id}-risk-report.pdf`}
            className="btn-secondary text-sm"
          >
            <svg
              className="h-4 w-4"
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
            <span className="hidden sm:inline">{DA_DETAIL.downloadReport}</span>
            <span className="sm:hidden">{DA_DETAIL.downloadReportShort}</span>
          </a>
        </div>

        {/* Property metrics */}
        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-200 pt-5 sm:grid-cols-4">
          {[
            {
              label: DA_DETAIL.metrics.zoning,
              value: da.zoning,
              icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
            },
            {
              label: DA_DETAIL.metrics.landSize,
              value: da.land_size,
              icon: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4",
            },
            {
              label: DA_DETAIL.metrics.height,
              value: da.height,
              icon: "M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12",
            },
            {
              label: DA_DETAIL.metrics.fsr,
              value: da.FSR,
              icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
            },
          ].map((metric) => (
            <div key={metric.label} className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={metric.icon} />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400">
                  {metric.label}
                </p>
                <p className="text-sm font-bold tabular-nums text-gray-900">
                  {metric.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Left Column ── */}
        <div className="space-y-6 lg:col-span-2">
          {/* Key Conditions */}
          <section className="card">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
                <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  {da.DA_outcome === "Approved"
                    ? DA_DETAIL.conditions.approved
                    : da.DA_outcome === "Refused"
                      ? DA_DETAIL.conditions.refused
                      : DA_DETAIL.conditions.assessment}
                </h2>
                <p className="text-xs text-gray-400">
                  {DA_DETAIL.conditions.helper}
                </p>
              </div>
            </div>
            <ConditionsList conditions={da.key_conditions} />
          </section>

          {/* Similar Projects */}
          <section id="comparable-precedents" className="card">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50">
                <svg className="h-4 w-4 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  {DA_DETAIL.similarProjects.title}
                </h2>
                <p className="text-xs text-gray-400">
                  {DA_DETAIL.similarProjects.subtitle(da.similar_projects.length, da.council)}
                </p>
              </div>
            </div>
            <SimilarProjectsCard projects={da.similar_projects} />
          </section>
        </div>

        {/* ── Right Column ── */}
        <div className="space-y-6">
          {/* Approval Risk Meter (NEW) */}
          <ApprovalRiskMeter
            profile={riskProfile}
            similarProjectsCount={da.similar_projects.length}
          />

          {/* Approval Score Gauge */}
          <section className="card">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  {DA_DETAIL.approvalScore.title}
                </h2>
                <p className="text-xs text-gray-400">
                  {DA_DETAIL.approvalScore.subtitle(da.similar_projects.length)}
                </p>
              </div>
            </div>
            <ApprovalScoreGauge score={da.approval_score} />
          </section>

          {/* Documents */}
          {da.pdf_links.length > 0 && (
            <section className="card">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50">
                  <svg className="h-4 w-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h2 className="text-base font-bold text-gray-900">{DA_DETAIL.documents.title}</h2>
              </div>
              <div className="space-y-2">
                <a
                  href={`/api/das/${da.id}/report`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={`${da.id}-risk-report.pdf`}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm transition-colors duration-150 hover:border-brand-300 hover:bg-brand-50/50"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-red-50">
                    <svg className="h-3.5 w-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="truncate font-medium text-gray-700">
                    {da.id}-risk-report.pdf
                  </span>
                  <svg className="ml-auto h-3.5 w-3.5 shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            </section>
          )}

          {/* No documents state */}
          {da.pdf_links.length === 0 && (
            <section className="card">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h2 className="text-base font-bold text-gray-900">{DA_DETAIL.documents.title}</h2>
              </div>
              <div className="rounded-lg border border-dashed border-gray-300 py-6 text-center">
                <p className="text-sm text-gray-400">
                  {DA_DETAIL.documents.empty}
                </p>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-8 text-center text-xs text-gray-300">
        {DISCLAIMER.standard}
      </p>
    </div>
    </>
  );
}
