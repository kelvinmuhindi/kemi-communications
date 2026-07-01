import { siteConfig } from "@/lib/content";

// Organisation + LocalBusiness schema.
// Renders as <script type="application/ld+json"> in the <head>.
// Gives Google everything it needs to build a Knowledge Panel:
// business name, logo, address, phone, hours, service area and URLs.

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/images/logo.png`,
          width: 132,
          height: 92,
        },
        image: `${siteConfig.url}/images/og-default.png`,
        description:
          "Reliable road freight and logistics across Kenya and cross-border Africa. On time, every time.",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Astro Karagita Close, No. 6",
          addressLocality: "Utawala",
          addressRegion: "Nairobi",
          addressCountry: "KE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -1.2729,
          longitude: 36.9679,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "17:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday"],
            opens: "08:00",
            closes: "12:00",
          },
        ],
        areaServed: [
          { "@type": "Country", name: "Kenya" },
          { "@type": "Country", name: "Uganda" },
          { "@type": "Country", name: "Tanzania" },
          { "@type": "Country", name: "Rwanda" },
        ],
        serviceType: [
          "Road Freight",
          "Cross-border Logistics",
          "Bulk Cargo Transport",
          "Corporate Fleet Hire",
        ],
        sameAs: [],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.phone,
          contactType: "customer service",
          availableLanguage: ["English", "Swahili"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.legalName,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
