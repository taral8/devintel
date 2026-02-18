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
  metadataBase: new URL("https://devintel.site"),
  title: {
    default: "DevIntel | Council Planning Intelligence for Sydney",
    template: "%s",
  },
  description:
    "Predict DA approval likelihood, compare similar projects, and decode council conditions across Parramatta, Blacktown & Hornsby.",
  openGraph: {
    title: "DevIntel | Council Planning Intelligence for Sydney",
    description:
      "Predict DA approval likelihood, compare similar projects, and decode council conditions across Parramatta, Blacktown & Hornsby.",
    url: "https://devintel.site",
    siteName: "DevIntel",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://devintel.site",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
