import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://civroda.com"),
  title: {
    default: "CivroDA — Approval Risk Intelligence for Development Applications",
    template: "%s | CivroDA",
  },
  description:
    "Predict your DA approval risk before you lodge. Precedent-based risk profiles from real council decisions across NSW.",
  openGraph: {
    title: "CivroDA — Approval Risk Intelligence Platform",
    description:
      "Precedent-based risk profiles from real council decisions. Predict approval probability, identify risk drivers, and review council behaviour patterns.",
    url: "https://civroda.com",
    siteName: "CivroDA",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://civroda.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
