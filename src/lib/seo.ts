import { content, type Lang } from "@/i18n/content";
import { RIAD, fullAddressEn, fullAddressFr } from "./riad";

/**
 * Head metadata builder: title / description / OG / Twitter + canonical and
 * hreflang alternates (fr par défaut, ?lang=en pour l'anglais).
 */
export function buildHead({
  path,
  lang,
  title,
  description,
  ogType = "website",
}: {
  path: string;
  lang: Lang;
  title: string;
  description: string;
  ogType?: string;
}) {
  const canonical = lang === "en" ? `${path}?lang=en` : path;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:site_name", content: RIAD.name },
      { property: "og:locale", content: lang === "en" ? "en_GB" : "fr_FR" },
      { property: "og:url", content: canonical },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: canonical },
      { rel: "alternate", hrefLang: "fr", href: path },
      { rel: "alternate", hrefLang: "en", href: `${path}?lang=en` },
      { rel: "alternate", hrefLang: "x-default", href: path },
    ],
  };
}

/** JSON-LD LodgingBusiness — données NAP identiques à src/lib/riad.ts. */
export function lodgingJsonLd(lang: Lang) {
  const t = content[lang];
  const amenities = t.home.amenities.map((a) => ({
    "@type": "LocationFeatureSpecification",
    name: a.title,
    value: true,
  }));

  return {
    "@context": "https://schema.org",
    "@type": ["Hotel", "LodgingBusiness"],
    "@id": "#riad-dar-medina-land",
    name: RIAD.name,
    description: t.home.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: RIAD.street,
      addressLocality: RIAD.city,
      postalCode: RIAD.postalCode,
      addressCountry: RIAD.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: RIAD.latitude,
      longitude: RIAD.longitude,
    },
    telephone: RIAD.phone,
    email: RIAD.email,
    priceRange: "$$$",
    currenciesAccepted: "MAD",
    paymentAccepted: lang === "en" ? "Cash, Credit Card" : "Espèces, Carte bancaire",
    numberOfRooms: RIAD.rooms,
    petsAllowed: false,
    checkinTime: RIAD.checkIn,
    checkoutTime: RIAD.checkOut,
    amenityFeature: amenities,
    starRating: { "@type": "Rating", ratingValue: "4" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RIAD.rating.value,
      reviewCount: RIAD.rating.count,
      bestRating: "5",
      worstRating: "1",
    },
    review: t.home.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
      reviewBody: r.text,
    })),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${RIAD.name}, ${RIAD.street}, ${RIAD.city}`,
    )}`,
    areaServed: lang === "en" ? fullAddressEn : fullAddressFr,
  };
}

export function faqJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content[lang].faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(lang: Lang, path: string, name: string) {
  const home = lang === "en" ? "Home" : "Accueil";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: home, item: lang === "en" ? "/?lang=en" : "/" },
      { "@type": "ListItem", position: 2, name, item: lang === "en" ? `${path}?lang=en` : path },
    ],
  };
}
