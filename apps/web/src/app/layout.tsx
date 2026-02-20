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
    default: "CivroDA — Planning Intelligence for Smarter Development Decisions",
    template: "%s | CivroDA",
  },
  description:
    "Search development applications, find similar approved projects nearby, and understand common consent conditions across Sydney councils.",
  openGraph: {
    title: "CivroDA — Planning Intelligence for Smarter Development Decisions",
    description:
      "Search development applications, find similar approved projects nearby, and understand common consent conditions across Sydney councils.",
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
