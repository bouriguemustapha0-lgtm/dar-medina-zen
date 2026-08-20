import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  chambreDoubleTerrassePhoto,
  chambreDoubleTerrasseGallery,
  chambreDoublePatioPhoto,
  chambreDoublePatioGallery,
  suiteDeluxePhoto,
  suiteDeluxeGallery,
  chambreTripleClassiquePhoto,
  chambreTripleClassiqueGallery,
  chambreTripleConfortPhoto,
  chambreTripleConfortGallery,
  chambreDoublePhoto,
  chambreDoubleGallery,
  chambreSimplePhoto,
  chambreSimpleGallery,
  chambreEcoPhoto,
  chambreEcoGallery,
} from "@/lib/photos";
import { SectionTitle, ZelligeFrieze, LanternWatermark } from "@/components/ornaments";
import { MoucharabiehIcon, HammamIcon, LanternIcon } from "@/components/moroccan-icons";
import { Reveal } from "@/components/reveal";
import { content } from "@/i18n/content";
import { useLang, validateLangSearch } from "@/i18n/use-lang";
import { ROOM_KEYS, whatsappLink } from "@/lib/riad";
import { breadcrumbJsonLd, buildHead } from "@/lib/seo";

export const Route = createFileRoute("/chambres")({
  validateSearch: validateLangSearch,
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: ({ deps }) => ({ lang: deps.lang === "en" ? ("en" as const) : ("fr" as const) }),
  head: ({ loaderData }) => {
    const lang = loaderData?.lang ?? "fr";
    const t = content[lang];
    return {
      ...buildHead({
        path: "/chambres",
        lang,
        title: t.rooms.title,
        description: t.rooms.description,
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbJsonLd(lang, "/chambres", t.nav.rooms)),
        },
      ],
    };
  },
  component: RoomsPage,
});

const IMAGES = {
  andalouse: chambreDoubleTerrassePhoto,
  patio: chambreDoublePatioPhoto,
  suite: suiteDeluxePhoto,
  triple: chambreTripleClassiquePhoto,
  tripleConfort: chambreTripleConfortPhoto,
  double: chambreDoublePhoto,
  simple: chambreSimplePhoto,
  economique: chambreEcoPhoto,
} as const;

const GALLERIES = {
  andalouse: chambreDoubleTerrasseGallery,
  patio: chambreDoublePatioGallery,
  suite: suiteDeluxeGallery,
  triple: chambreTripleClassiqueGallery,
  tripleConfort: chambreTripleConfortGallery,
  double: chambreDoubleGallery,
  simple: chambreSimpleGallery,
  economique: chambreEcoGallery,
} as const;

function RoomsPage() {
  const { t, search } = useLang();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleRoom = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const alt = {
    andalouse: t.rooms.items.andalouse.name,
    patio: t.rooms.items.patio.name,
    suite: t.rooms.items.suite.name,
    triple: t.rooms.items.triple.name,
    tripleConfort: t.rooms.items.tripleConfort.name,
    double: t.rooms.items.double.name,
    simple: t.rooms.items.simple.name,
    economique: t.rooms.items.economique.name,
  } as const;

  return (
    <>
      <section className="paper-grain bg-ink px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={t.rooms.eyebrow}
            title={t.rooms.heading}
            lead={t.rooms.lead}
            align="left"
          />
        </div>
      </section>

      <section className="zellige-pattern relative overflow-hidden bg-ink pb-24 sm:pb-32">
        <LanternWatermark className="pointer-events-none absolute -left-8 top-40 hidden h-80 w-32 text-terracotta opacity-[0.09] xl:block" />
        <div className="mx-auto max-w-7xl space-y-8 px-5 sm:px-8">
          {ROOM_KEYS.map((key, i) => {
            const room = t.rooms.items[key] as (typeof t.rooms.items)[typeof key] &
              Partial<{ size: string; beds: string; price: string; amenities: readonly string[] }>;
            return (
              <Reveal key={key}>
                <article
                  className={`room-card lace-card grid items-start gap-10 border border-border bg-ivory p-0 shadow-warm sm:p-8 lg:grid-cols-2 lg:gap-14 lg:items-center ${
                    i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                  }`}
                >
                  <figure className="arch m-0 border border-cobalt/25 p-1.5 sm:m-6 sm:mb-0 lg:m-0">
                    <img
                      src={IMAGES[key]}
                      alt={alt[key]}
                      width={1280}
                      height={960}
                      loading="lazy"
                      decoding="async"
                      className="arch h-64 w-full object-cover sm:h-80 lg:h-[26rem]"
                    />
                    {GALLERIES[key] ? (
                      <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                        {GALLERIES[key].slice(1).map((src, n) => (
                          <img
                            key={src}
                            src={src}
                            alt={`${room.name} — ${n + 2}`}
                            width={640}
                            height={480}
                            loading="lazy"
                            decoding="async"
                            className="h-28 w-full border border-cobalt/20 object-cover sm:h-32"
                          />
                        ))}
                      </div>
                    ) : null}
                  </figure>
                  <div className="flex flex-col">
                    {/* Sticky ticket header — mobile only */}
                    <div className="sticky-ticket-header -mx-5 px-5 py-4 sm:mx-0 sm:px-0 lg:static lg:bg-transparent lg:backdrop-filter-none lg:border-b-0 lg:px-0 lg:py-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <h2 className="text-2xl leading-tight sm:text-3xl lg:text-[2.4rem]">
                            <em className="font-normal italic">{room.name}</em>
                          </h2>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {room.size ? (
                              <span className="room-badge">
                                <MoucharabiehIcon className="h-3.5 w-3.5 text-olive" />
                                {room.size}
                                {room.beds ? ` · ${room.beds}` : ""}
                              </span>
                            ) : null}
                            <span className="room-badge">
                              <LanternIcon className="h-3.5 w-3.5 text-olive" />
                              {room.view}
                            </span>
                          </div>
                        </div>
                        <div className="ticket-stub shrink-0">
                          <span className="text-[0.6rem] font-medium uppercase tracking-wider opacity-90">
                            {t.rooms.fromPrice}
                          </span>
                          <span className="text-xl font-semibold leading-none sm:text-2xl">
                            {room.price ?? t.rooms.priceValue}
                          </span>
                          <span className="text-[0.6rem] opacity-85">{t.rooms.perNight}</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 pb-6 pt-4 sm:px-0 sm:pb-0 sm:pt-0 lg:pt-0">
                      <ZelligeFrieze className="hidden h-4 w-28 text-cobalt opacity-60 lg:mt-5 lg:block" />
                      <p className="mt-0 text-[0.95rem] leading-relaxed text-muted-foreground lg:mt-6">
                        {room.text}
                      </p>
                      <button
                        type="button"
                        onClick={() => toggleRoom(key)}
                        className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-cobalt underline underline-offset-4 decoration-cobalt/30 hover:text-terracotta hover:decoration-terracotta/50 transition-colors sm:hidden"
                        aria-expanded={expanded.has(key)}
                        aria-controls={`room-details-${key}`}
                      >
                        {expanded.has(key) ? t.rooms.showLess : t.rooms.learnMore}
                        <span aria-hidden="true" className="text-base leading-none">
                          {expanded.has(key) ? "−" : "+"}
                        </span>
                      </button>
                      <div
                        id={`room-details-${key}`}
                        className={expanded.has(key) ? "block" : "hidden sm:block"}
                      >
                        <dl className="mt-6 space-y-4 border-t border-border pt-6 text-sm lg:mt-8">
                          <div className="flex gap-3">
                            <MoucharabiehIcon className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                            <div>
                              <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-cobalt">
                                {t.rooms.viewLabel}
                              </dt>
                              <dd className="mt-1 text-foreground/85">{room.view}</dd>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <HammamIcon className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                            <div>
                              <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-cobalt">
                                {t.rooms.bathLabel}
                              </dt>
                              <dd className="mt-1 text-foreground/85">{room.bath}</dd>
                            </div>
                          </div>
                          {room.size ? (
                            <div className="flex gap-3">
                              <MoucharabiehIcon className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                              <div>
                                <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-cobalt">
                                  {t.rooms.sizeLabel}
                                </dt>
                                <dd className="mt-1 text-foreground/85">
                                  {room.size}
                                  {room.beds ? ` · ${room.beds}` : ""}
                                </dd>
                              </div>
                            </div>
                          ) : null}
                          <div className="hidden gap-3 sm:flex">
                            <LanternIcon className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                            <div>
                              <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-cobalt">
                                {t.rooms.priceLabel}
                              </dt>
                              <dd className="mt-1 text-foreground/85">
                                {room.price ?? t.rooms.priceValue} {t.rooms.perNight}
                              </dd>
                            </div>
                          </div>
                        </dl>
                        {room.amenities?.length ? (
                          <div className="mt-6">
                            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-cobalt">
                              {t.rooms.amenitiesLabel}
                            </p>
                            <ul className="mt-3 flex flex-wrap gap-2">
                              {room.amenities.map((a) => (
                                <li
                                  key={a}
                                  className="border border-terracotta/40 px-3 py-1 text-[0.72rem] text-foreground/80"
                                >
                                  {a}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-8 flex flex-wrap gap-4">
                        <a
                          href={whatsappLink(`${t.whatsappMessage} (${room.name})`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-solid-gold lantern-fill arch-pill shadow-warm"
                        >
                          {t.cta.bookWhatsapp}
                        </a>
                        <Link
                          to="/contact"
                          search={search}
                          className="btn-gold lantern-fill arch-pill"
                        >
                          {t.nav.contact}
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
