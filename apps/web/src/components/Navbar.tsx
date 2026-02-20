"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/das", label: "Search DAs", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" },
  { href: "/councils/parramatta", label: "Councils", icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        isHome
          ? "bg-brand-950/90 backdrop-blur-xl border-b border-white/5"
          : "bg-white/95 backdrop-blur-xl border-b border-gray-200"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
            isHome
              ? "bg-white/10"
              : "bg-brand-900"
          }`}>
            <svg className={`h-4.5 w-4.5 ${isHome ? "text-white" : "text-white"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="flex items-baseline gap-0">
            <span
              className={`text-base font-bold tracking-tight transition-colors ${
                isHome ? "text-white" : "text-gray-900"
              }`}
            >
              Civro
            </span>
            <span
              className={`text-base font-bold tracking-tight transition-colors ${
                isHome ? "text-brand-300" : "text-brand-600"
              }`}
            >
              DA
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-0.5 sm:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
                  isHome
                    ? active
                      ? "bg-white/15 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                    : active
                      ? "bg-brand-50 text-brand-800"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                </svg>
                {link.label}
              </Link>
            );
          })}
          <div
            className={`mx-1.5 h-5 w-px ${isHome ? "bg-white/15" : "bg-gray-200"}`}
          />
          <Link
            href="/das"
            className={`rounded-md px-3.5 py-1.5 text-sm font-semibold transition-colors duration-150 ${
              isHome
                ? "bg-white text-brand-950 hover:bg-white/90"
                : "bg-brand-800 text-white hover:bg-brand-900"
            }`}
          >
            Search DAs
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className={`sm:hidden rounded-md p-2 transition-colors ${
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
              : "bg-white border-gray-200"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium ${
                isHome
                  ? "text-white/80 hover:bg-white/10"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
              </svg>
              {link.label}
            </Link>
          ))}
          <div className={`my-2 h-px ${isHome ? "bg-white/10" : "bg-gray-200"}`} />
          <Link
            href="/das"
            onClick={() => setMobileOpen(false)}
            className={`block rounded-md px-3 py-2.5 text-sm font-semibold text-center ${
              isHome
                ? "bg-white text-brand-950"
                : "bg-brand-800 text-white"
            }`}
          >
            Search DAs
          </Link>
        </div>
      )}
    </header>
  );
}
