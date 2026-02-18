import { getStatsData } from "@/lib/data";
import StatsCards from "@/components/StatsCards";
import CouncilSelector from "@/components/CouncilSelector";
import Link from "next/link";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DevIntel",
  url: "https://devintel.site",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Council planning intelligence for Sydney. Predict DA approval likelihood, compare similar projects, and decode council conditions across Parramatta, Blacktown & Hornsby.",
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
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-brand-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full bg-brand-400/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28 lg:px-8">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium text-white/80">
                Live data from {stats.councils.length} Sydney councils
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-slide-up text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Stop guessing.{" "}
              <span className="bg-gradient-to-r from-brand-300 to-brand-100 bg-clip-text text-transparent">
                Know your DA
              </span>{" "}
              will get approved.
            </h1>

            {/* Sub-headline */}
            <p className="animate-slide-up-delay mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl opacity-0">
              DevIntel analyses historical development applications across
              Parramatta, Blacktown & Hornsby to predict approval likelihood,
              surface similar projects, and translate council conditions into
              plain English.
            </p>

            {/* CTA */}
            <div className="animate-slide-up-delay mt-10 flex flex-wrap items-center gap-4 opacity-0">
              <Link
                href="/das"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-brand-950 shadow-lg transition-all duration-200 hover:shadow-xl hover:shadow-white/10"
              >
                Explore Development Applications
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              >
                See how it works
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Hero stats strip */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {[
              { value: stats.total_das, label: "DAs Analysed" },
              {
                value: `${stats.overall_approval_rate}%`,
                label: "Approval Rate",
              },
              { value: stats.councils.length, label: "Councils" },
              {
                value: stats.councils.reduce(
                  (s, c) => s + c.under_assessment,
                  0
                ),
                label: "Under Review",
              },
            ].map((stat) => (
              <div key={stat.label} className="card-dark">
                <p className="text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="relative bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">How It Works</p>
            <h2 className="section-title">
              From raw DA data to actionable intelligence
            </h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              We ingest development application data from council portals,
              analyse approval patterns, and give you the insights that would
              take a town planner hours to compile.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
                title: "We collect the data",
                description:
                  "DA records from Parramatta, Blacktown, and Hornsby councils — including zoning, FSR, height limits, conditions, and outcomes.",
              },
              {
                step: "02",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                  </svg>
                ),
                title: "We find the patterns",
                description:
                  "Our scoring engine compares your site against similar approved and refused projects based on zoning, land size, height, and FSR.",
              },
              {
                step: "03",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                title: "You get the answer",
                description:
                  "An approval likelihood score from 0-100, a list of comparable projects, and every condition translated into plain English.",
              },
            ].map((item) => (
              <div key={item.step} className="card-hover group relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-brand-400">
                  STEP {item.step}
                </span>
                <h3 className="mt-2 text-lg font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIVE STATS ─── */}
      <section className="bg-gray-50 py-24">
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

          <div className="mt-12">
            <StatsCards stats={stats} />
          </div>
        </div>
      </section>

      {/* ─── COUNCILS ─── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">Councils</p>
            <h2 className="section-title">
              Browse by council area
            </h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              Drill into approval rates, common refusal reasons, and trending
              conditions for each local government area.
            </p>
          </div>

          <div className="mt-12">
            <CouncilSelector councils={stats.councils} />
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="relative overflow-hidden bg-brand-950 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M0%2020L20%200L40%2020L20%2040z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-400">
                Built for developers & planners
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Everything you need to de-risk your next DA submission
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/50">
                Whether you&apos;re a property developer, town planner, or
                architect, DevIntel turns months of council research into
                minutes of actionable insights.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Approval Scoring",
                  description:
                    "A 0-100 score based on how similar approved projects performed in the same council.",
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                },
                {
                  title: "Similar Projects",
                  description:
                    "Find comparable DAs based on zoning, FSR, height, and land size — within the same council.",
                  icon: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
                },
                {
                  title: "Plain English Conditions",
                  description:
                    "Key approval and refusal conditions summarised — no legal jargon, just what matters.",
                  icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                },
                {
                  title: "JSON API Ready",
                  description:
                    "Every data point available as structured JSON — ready for your reports, tools, and integrations.",
                  icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600/20">
                    <svg
                      className="h-5 w-5 text-brand-300"
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
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to make smarter planning decisions?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Search {stats.total_das} development applications across{" "}
            {stats.councils.length} councils. Filter by zoning, compare similar
            projects, and understand your approval odds — all in one place.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/das" className="btn-primary">
              Start Exploring
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  DevIntel
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-400">
                Council planning intelligence for Sydney&apos;s Western &amp; Northern suburbs.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Product</h3>
              <ul className="mt-3 space-y-2">
                <li><Link href="/" className="text-sm text-gray-500 hover:text-brand-600">Home</Link></li>
                <li><Link href="/das" className="text-sm text-gray-500 hover:text-brand-600">DA Explorer</Link></li>
                <li><a href="#how-it-works" className="text-sm text-gray-500 hover:text-brand-600">How It Works</a></li>
              </ul>
            </div>

            {/* Councils */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Councils</h3>
              <ul className="mt-3 space-y-2">
                <li><Link href="/councils/parramatta" className="text-sm text-gray-500 hover:text-brand-600">Parramatta</Link></li>
                <li><Link href="/councils/blacktown" className="text-sm text-gray-500 hover:text-brand-600">Blacktown</Link></li>
                <li><Link href="/councils/hornsby" className="text-sm text-gray-500 hover:text-brand-600">Hornsby</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
              <ul className="mt-3 space-y-2">
                <li><Link href="/das?outcome=Approved" className="text-sm text-gray-500 hover:text-brand-600">Approved DAs</Link></li>
                <li><Link href="/das?outcome=Refused" className="text-sm text-gray-500 hover:text-brand-600">Refused DAs</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} DevIntel. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
