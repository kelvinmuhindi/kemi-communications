import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kemi Communications Ltd | Road Freight & Logistics, On Time",
  description:
    "Reliable road freight and logistics across Kenya and cross-border Africa. Serving manufacturers, stockists, wholesalers, and retailers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-brand-paper text-brand-ink">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
