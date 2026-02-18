"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/das", label: "DA Explorer" },
  { href: "/councils/parramatta", label: "Parramatta" },
  { href: "/councils/blacktown", label: "Blacktown" },
  { href: "/councils/hornsby", label: "Hornsby" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isHome
          ? "bg-brand-950/80 backdrop-blur-xl border-b border-white/5"
          : "bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-glow transition-shadow group-hover:shadow-glow-lg">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span
            className={`text-lg font-bold tracking-tight transition-colors ${
              isHome ? "text-white" : "text-gray-900"
            }`}
          >
            DevIntel
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isHome
                    ? active
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                    : active
                      ? "bg-brand-50 text-brand-700"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div
            className={`mx-2 h-5 w-px ${isHome ? "bg-white/20" : "bg-gray-200"}`}
          />
          <Link
            href="/das"
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              isHome
                ? "bg-white text-brand-950 hover:bg-white/90"
                : "bg-brand-600 text-white hover:bg-brand-700"
            }`}
          >
            Search DAs
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className={`sm:hidden rounded-lg p-2 transition-colors ${
            isHome
              ? "text-white/70 hover:bg-white/10"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div
          className={`sm:hidden border-t px-4 pb-4 pt-2 ${
            isHome
              ? "bg-brand-950/95 border-white/10"
              : "bg-white border-gray-100"
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-4 py-2.5 text-sm font-medium ${
                isHome
                  ? "text-white/80 hover:bg-white/10"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
