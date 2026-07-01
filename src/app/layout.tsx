import type { Metadata } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/content";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.legalName} | Road Freight & Logistics, On Time`,
    template: `%s | ${siteConfig.legalName}`,
  },
  description:
    "Reliable road freight and logistics across Kenya and cross-border Africa. Serving manufacturers, stockists, wholesalers and retailers.",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    siteName: siteConfig.legalName,
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.legalName} — Road Freight & Logistics Kenya`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${archivoBlack.variable} ${inter.variable}`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-brand-paper text-brand-ink">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
