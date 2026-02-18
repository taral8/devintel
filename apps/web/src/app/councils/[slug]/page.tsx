import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_DAS } from "@/lib/mock-das";

const COUNCILS: Record<
  string,
  { name: string; region: string; description: string }
> = {
  parramatta: {
    name: "Parramatta",
    region: "Western Sydney",
    description:
      "Parramatta is one of Sydney's fastest-growing CBDs with major high-density development. Explore DA outcomes, approval rates, and common conditions across residential, commercial, and mixed-use projects in the Parramatta LGA.",
  },
  blacktown: {
    name: "Blacktown",
    region: "Western Sydney",
    description:
      "Blacktown LGA covers a large area of Western Sydney with significant greenfield and infill development. Review DA trends, approval patterns, and council conditions for projects ranging from single dwellings to industrial warehouses.",
  },
  hornsby: {
    name: "Hornsby",
    region: "Northern Sydney",
    description:
      "Hornsby Shire includes the Hornsby town centre and surrounding bushland suburbs. Understand DA outcomes, environmental considerations, and council requirements for development in this northern Sydney council area.",
  },
};

export function generateStaticParams() {
  return Object.keys(COUNCILS).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const council = COUNCILS[params.slug];
  if (!council) return { title: "Council Not Found | DevIntel" };

  const title = `${council.name} Council DAs — Development Applications & Approval Rates | DevIntel`;
  const description = `Browse development applications in ${council.name} Council, ${council.region}. View approval rates, common conditions, and compare similar projects.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://devintel.site/councils/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://devintel.site/councils/${params.slug}`,
      siteName: "DevIntel",
      type: "website",
    },
  };
}

export default function CouncilPage({
  params,
}: {
  params: { slug: string };
}) {
  const council = COUNCILS[params.slug];
  if (!council) notFound();

  const das = MOCK_DAS.filter((d) => d.council === council.name);
  const approved = das.filter((d) => d.DA_outcome === "Approved");
  const refused = das.filter((d) => d.DA_outcome === "Refused");
  const deferred = das.filter((d) => d.DA_outcome === "Deferred");
  const underAssessment = das.filter(
    (d) => d.DA_outcome === "Under Assessment"
  );
  const approvalRate =
    das.length > 0
      ? Math.round((approved.length / das.length) * 1000) / 10
      : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: `${council.name} Council`,
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${council.name} LGA`,
      containedInPlace: {
        "@type": "City",
        name: "Sydney",
      },
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
            href="/"
            className="text-gray-400 transition-colors hover:text-brand-600"
          >
            Home
          </Link>
          <svg
            className="h-4 w-4 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="font-medium text-gray-700">
            {council.name} Council
          </span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-brand-600">
            {council.region}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {council.name} Council — Development Applications
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-500">
            {council.description}
          </p>
        </div>

        {/* Stats */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Total DAs", value: das.length },
            { label: "Approved", value: approved.length },
            { label: "Refused", value: refused.length },
            { label: "Deferred", value: deferred.length },
            { label: "Approval Rate", value: `${approvalRate}%` },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* DA List */}
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          All Development Applications in {council.name}
        </h2>
        <div className="space-y-3">
          {das.map((da) => (
            <Link
              key={da.id}
              href={`/das/${da.id}`}
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 transition-all hover:border-brand-200 hover:shadow-sm"
            >
              <div>
                <p className="font-semibold text-gray-900">{da.address}</p>
                <p className="mt-0.5 text-sm text-gray-500">
                  Zoning {da.zoning} &middot; {da.land_size} &middot;{" "}
                  {da.height} height &middot; FSR {da.FSR}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  da.DA_outcome === "Approved"
                    ? "bg-emerald-50 text-emerald-700"
                    : da.DA_outcome === "Refused"
                      ? "bg-red-50 text-red-700"
                      : da.DA_outcome === "Deferred"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-sky-50 text-sky-700"
                }`}
              >
                {da.DA_outcome}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href={`/das?council=${encodeURIComponent(council.name)}`}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Search all {council.name} DAs
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
