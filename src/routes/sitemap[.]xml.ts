import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// TODO: replace with the project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  { path: "/chambres", changefreq: "monthly", priority: "0.9" },
  { path: "/localisation", changefreq: "yearly", priority: "0.8" },
  { path: "/galerie", changefreq: "monthly", priority: "0.7" },
  { path: "/faq", changefreq: "yearly", priority: "0.7" },
  { path: "/contact", changefreq: "yearly", priority: "0.9" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            `    <xhtml:link rel="alternate" hreflang="fr" href="${BASE_URL}${e.path}"/>`,
            `    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${e.path}?lang=en"/>`,
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${e.path}"/>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
