import type { Metadata } from "next";
import { siteConfig } from "@/lib/content";

export function buildMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = `${title} | ${siteConfig.legalName}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      url,
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
      title: fullTitle,
      description,
      images: ["/images/og-default.png"],
    },
  };
}
