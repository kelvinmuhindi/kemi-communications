import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/",                  priority: 1.0,  changeFrequency: "weekly"  },
    { path: "/services",          priority: 0.9,  changeFrequency: "monthly" },
    { path: "/get-a-quote",       priority: 0.9,  changeFrequency: "monthly" },
    { path: "/become-a-partner",  priority: 0.8,  changeFrequency: "monthly" },
    { path: "/about",             priority: 0.8,  changeFrequency: "monthly" },
    { path: "/contact",           priority: 0.8,  changeFrequency: "monthly" },
    { path: "/careers",           priority: 0.7,  changeFrequency: "weekly"  },
    { path: "/media",             priority: 0.6,  changeFrequency: "weekly"  },
    { path: "/resources",         priority: 0.5,  changeFrequency: "monthly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
