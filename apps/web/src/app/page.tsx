import { getStatsData } from "@/lib/data";
import StatsCards from "@/components/StatsCards";
import CouncilSelector from "@/components/CouncilSelector";
import Link from "next/link";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CivroDA",
  url: "https://civroda.com",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Planning intelligence for Australian property development. Search development applications, find similar approved projects nearby, and understand common consent conditions.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "AUD",
  },
  areaServed: {
    "@type": "City",
    name: "Sydney",
    containedInPlace: {
      "@type": "State",
      name: "New South Wales",
    },
  },
};

export default function HomePage() {
  const stats = getStatsData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-hero-pattern">
        {/* Subtle gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-950/50" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="animate-fade-in mb-5 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-subtle" />
              <span className="text-xs font-medium text-white/70">
                Live data from {stats.councils.length} Sydney councils
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-slide-up text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Planning intelligence for{" "}
              <span className="text-brand-300">
                smarter development decisions
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="animate-slide-up-delay mt-5 max-w-2xl text-base leading-relaxed text-white/50 sm:text-lg opacity-0">
              Search development applications, find similar approved projects
              nearby, and understand common consent conditions — fast.
            </p>

            {/* CTA */}
            <div className="animate-slide-up-delay mt-8 flex flex-wrap items-center gap-3 opacity-0">
              <Link
                href="/das"
                className="group inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-950 shadow-lg transition-all duration-150 hover:shadow-xl hover:shadow-white/5"
              >
                Start free trial
                <svg
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                See how it works
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Hero stats strip */}
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { value: stats.total_das, label: "DAs indexed" },
              { value: `${stats.overall_approval_rate}%`, label: "Approval rate" },
              { value: stats.councils.length, label: "Councils" },
              {
                value: stats.councils.reduce((s, c) => s + c.under_assessment, 0),
                label: "Under assessment",
              },
            ].map((stat) => (
              <div key={stat.label} className="card-dark">
                <p className="text-xl font-bold tabular-nums text-white sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="border-b border-gray-200 bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Council coverage: NSW first (expanding)
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>Built for developers, planners, and lenders</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>Thousands of DAs indexed</span>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">How It Works</p>
            <h2 className="section-title">
              From raw DA data to actionable intelligence
            </h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              We ingest development application data from council portals,
              analyse approval patterns, and surface the insights that would
              take a town planner hours to compile.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
                title: "We collect the data",
                description:
                  "DA records from Parramatta, Blacktown, and Hornsby councils — including zoning, FSR, height limits, conditions, and outcomes.",
              },
              {
                step: "02",
                icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6",
                title: "We find the patterns",
                description:
                  "Our scoring engine compares your site against similar approved and refused projects based on zoning, land size, height, and FSR.",
              },
              {
                step: "03",
                icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
                title: "You get the answer",
                description:
                  "A list of comparable approved projects, key consent conditions summarised in plain English, and common refusal reasons nearby.",
              },
            ].map((item) => (
              <div key={item.step} className="card-hover group relative">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-100">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <span className="text-2xs font-bold uppercase tracking-widest text-brand-400">
                  Step {item.step}
                </span>
                <h3 className="mt-1.5 text-base font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIVE STATS ─── */}
      <section className="border-y border-gray-200 bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">Live Data</p>
            <h2 className="section-title">
              Real numbers from real councils
            </h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              Every metric below is computed from actual development application
              records. No guesswork, no estimates.
            </p>
          </div>

          <div className="mt-10">
            <StatsCards stats={stats} />
          </div>
        </div>
      </section>

      {/* ─── COUNCILS ─── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">Council Coverage</p>
            <h2 className="section-title">
              Browse by council area
            </h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              Drill into approval rates, common refusal reasons, and typical
              consent conditions for each local government area.
            </p>
          </div>

          <div className="mt-10">
            <CouncilSelector councils={stats.councils} />
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="relative overflow-hidden bg-brand-950 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M0%2020L20%200L40%2020L20%2040z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-400">
                Built for developers &amp; planners
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Everything you need to de-risk your next DA submission
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/50">
                Whether you&apos;re a property developer, town planner, or
                lender, CivroDA turns weeks of council research into
                minutes of actionable precedent analysis.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "Similar Approvals Nearby",
                  description:
                    "Find comparable approved DAs within 1km — matched by zoning, FSR, height, and land size.",
                  icon: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
                },
                {
                  title: "Consent Conditions (Summary)",
                  description:
                    "Key approval and refusal conditions summarised in plain English — no legal jargon.",
                  icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                },
                {
                  title: "Approval Likelihood",
                  description:
                    "A score based on how similar approved projects performed in the same council area.",
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                },
                {
                  title: "PDF Reports",
                  description:
                    "Download determination reports with full DA details, conditions, and comparable project analysis.",
                  icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:bg-white/[0.08]"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800/50">
                    <svg
                      className="h-4.5 w-4.5 text-brand-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={feature.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/40">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            See what gets approved — before you submit
          </h2>
          <p className="mt-3 text-base text-gray-500">
            Search {stats.total_das} development applications across{" "}
            {stats.councils.length} councils. Find similar approvals, compare
            conditions, and reduce your planning risk.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/das" className="btn-primary">
              Start free trial
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a href="#how-it-works" className="btn-secondary">
              View sample
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-200 bg-gray-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-900">
                  <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  CivroDA
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                Planning intelligence for Australian property development. Reduce risk, save time, find precedents fast.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900">Product</h3>
              <ul className="mt-3 space-y-2">
                <li><Link href="/" className="text-sm text-gray-500 hover:text-brand-700 transition-colors">Home</Link></li>
                <li><Link href="/das" className="text-sm text-gray-500 hover:text-brand-700 transition-colors">Search DAs</Link></li>
                <li><a href="#how-it-works" className="text-sm text-gray-500 hover:text-brand-700 transition-colors">How It Works</a></li>
              </ul>
            </div>

            {/* Councils */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900">Councils</h3>
              <ul className="mt-3 space-y-2">
                <li><Link href="/councils/parramatta" className="text-sm text-gray-500 hover:text-brand-700 transition-colors">Parramatta</Link></li>
                <li><Link href="/councils/blacktown" className="text-sm text-gray-500 hover:text-brand-700 transition-colors">Blacktown</Link></li>
                <li><Link href="/councils/hornsby" className="text-sm text-gray-500 hover:text-brand-700 transition-colors">Hornsby</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900">Resources</h3>
              <ul className="mt-3 space-y-2">
                <li><Link href="/das?outcome=Approved" className="text-sm text-gray-500 hover:text-brand-700 transition-colors">Approved DAs</Link></li>
                <li><Link href="/das?outcome=Refused" className="text-sm text-gray-500 hover:text-brand-700 transition-colors">Refused DAs</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} CivroDA. All rights reserved. Data sourced from publicly available council records.
          </div>
        </div>
      </footer>
    </>
  );
}
