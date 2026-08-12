import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  heroPatio,
  chambreAtlas,
  spaHammam,
  detailZellige,
  terrasse,
  petitDejeuner,
  patioJourPhoto,
  salonPhoto,
  entreePatioPhoto,
  theMenthePhoto,
} from "@/lib/photos";
import { SectionTitle } from "@/components/ornaments";
import { MoucharabiehWatermark } from "@/components/ornaments";
import { Reveal } from "@/components/reveal";
import { Lightbox } from "@/components/lightbox";
import { content } from "@/i18n/content";
import { useLang, validateLangSearch } from "@/i18n/use-lang";
import { breadcrumbJsonLd, buildHead } from "@/lib/seo";

export const Route = createFileRoute("/galerie")({
  validateSearch: validateLangSearch,
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: ({ deps }) => ({ lang: deps.lang === "en" ? ("en" as const) : ("fr" as const) }),
  head: ({ loaderData }) => {
    const lang = loaderData?.lang ?? "fr";
    const t = content[lang];
    return {
      ...buildHead({
        path: "/galerie",
        lang,
        title: t.gallery.title,
        description: t.gallery.description,
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbJsonLd(lang, "/galerie", t.nav.gallery)),
        },
      ],
    };
  },
  component: GalleryPage,
});

function GalleryPage() {
  const { t, lang } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /** Masonry irrégulier : hauteurs variées, quelques cadres en arc mauresque. */
  const photos = [
    { src: heroPatio, alt: t.images.hero, h: "h-[26rem] sm:h-[34rem]", arch: true },
    { src: chambreAtlas, alt: t.images.room, h: "h-64 sm:h-72", arch: false },
    { src: detailZellige, alt: t.images.zellige, h: "h-72 sm:h-[22rem]", arch: false },
    { src: spaHammam, alt: t.images.spa, h: "h-64 sm:h-[19rem]", arch: true },
    { src: terrasse, alt: t.images.terrace, h: "h-72 sm:h-[26rem]", arch: false },
    { src: petitDejeuner, alt: t.images.breakfast, h: "h-64 sm:h-64", arch: false },
    { src: patioJourPhoto, alt: t.images.hero, h: "h-72 sm:h-[30rem]", arch: true },
    { src: salonPhoto, alt: t.images.zellige, h: "h-64 sm:h-[21rem]", arch: false },
    { src: entreePatioPhoto, alt: t.images.hero, h: "h-72 sm:h-[24rem]", arch: false },
    { src: theMenthePhoto, alt: t.images.breakfast, h: "h-64 sm:h-[18rem]", arch: false },
  ];

  const labels =
    lang === "en"
      ? { close: "Close", prev: "Previous photo", next: "Next photo" }
      : { close: "Fermer", prev: "Photo précédente", next: "Photo suivante" };

  return (
    <>
      <section className="paper-grain bg-ink px-5 pb-14 pt-36 sm:px-8 sm:pt-44">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={t.gallery.eyebrow}
            title={t.gallery.heading}
            lead={t.gallery.lead}
            align="left"
          />
        </div>
      </section>

      <section className="paper-grain relative overflow-hidden bg-ink pb-24 sm:pb-32">
        <MoucharabiehWatermark className="pointer-events-none absolute -right-10 top-24 hidden h-72 w-72 text-cobalt opacity-[0.07] lg:block" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {photos.map((photo, i) => (
              <Reveal key={`${photo.src}-${i}`} delay={(i % 3) * 90} className="break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={photo.alt}
                  className={`room-card group block w-full border border-border bg-ivory p-1.5 shadow-warm ${
                    photo.arch ? "arch-soft" : ""
                  }`}
                >
                  <span className={`block overflow-hidden ${photo.arch ? "arch-soft" : ""}`}>
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      width={1280}
                      height={960}
                      loading="lazy"
                      decoding="async"
                      className={`w-full object-cover ${photo.h}`}
                    />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        photos={photos.map(({ src, alt }) => ({ src, alt }))}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
        labels={labels}
      />
    </>
  );
}
