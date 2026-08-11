import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Footprints } from "lucide-react";
import { SectionTitle } from "@/components/ornaments";
import { Reveal } from "@/components/reveal";
import { content } from "@/i18n/content";
import { useLang, validateLangSearch } from "@/i18n/use-lang";
import { DISTANCE_KEYS, RIAD, mapEmbedSrc, mapsLink } from "@/lib/riad";
import { breadcrumbJsonLd, buildHead } from "@/lib/seo";

export const Route = createFileRoute("/localisation")({
  validateSearch: validateLangSearch,
  head: ({ search }) => {
    const lang = search?.lang === "en" ? "en" : "fr";
    const t = content[lang];
    return {
      ...buildHead({
        path: "/localisation",
        lang,
        title: t.location.title,
        description: t.location.description,
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbJsonLd(lang, "/localisation", t.nav.location)),
        },
      ],
    };
  },
  component: LocationPage,
});

function LocationPage() {
  const { t } = useLang();

  return (
    <>
      <section className="bg-ink px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={t.location.eyebrow}
            title={t.location.heading}
            lead={t.location.lead}
            align="left"
          />
          <p className="mt-8 flex items-start gap-3 text-sm text-foreground/85">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.2} />
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
              {t.address} — {RIAD.phoneDisplay}
            </a>
          </p>
        </div>
      </section>

      <section className="bg-ivory py-20 text-ivory-foreground sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">{t.location.tableHead.distance}</h2>
            <span className="hairline mt-6 block w-24" />
            <div className="mt-10 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">{t.location.mapCaption}</caption>
                <thead>
                  <tr className="border-b border-ivory-foreground/25">
                    <th scope="col" className="py-3 pr-4 text-[0.65rem] uppercase tracking-[0.24em]">
                      {t.location.tableHead.place}
                    </th>
                    <th scope="col" className="py-3 text-[0.65rem] uppercase tracking-[0.24em]">
                      {t.location.tableHead.distance}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {DISTANCE_KEYS.map((key) => {
                    const row = t.location.distances[key];
                    return (
                      <tr key={key} className="border-b border-ivory-foreground/12">
                        <th scope="row" className="py-4 pr-4 font-display text-lg font-normal">
                          {row.place}
                        </th>
                        <td className="py-4 text-ivory-foreground/75">{row.distance}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal className="mt-16 border-t border-ivory-foreground/20 pt-10">
            <h2 className="flex items-center gap-3 text-2xl">
              <Footprints className="h-5 w-5 text-gold" strokeWidth={1.2} />
              {t.location.accessTitle}
            </h2>
            <p className="mt-5 max-w-3xl text-[0.95rem] leading-relaxed text-ivory-foreground/80">
              {t.location.accessText}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="text-2xl">{t.location.mapTitle}</h2>
          <span className="hairline mt-5 block w-20" />
          <div className="mt-8 border border-border p-2">
            <iframe
              title={t.location.mapCaption}
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[22rem] w-full sm:h-[28rem]"
            />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{t.location.mapCaption}</p>
        </div>
      </section>
    </>
  );
}
