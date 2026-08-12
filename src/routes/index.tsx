import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Bath, Croissant, Trees, Wifi, ConciergeBell, Star } from "lucide-react";
import { heroPatio, chambreAtlas, detailZellige, terrasse } from "@/lib/photos";
import { EightPointStar, SectionTitle } from "@/components/ornaments";
import { Reveal } from "@/components/reveal";
import { content } from "@/i18n/content";
import { useLang, validateLangSearch } from "@/i18n/use-lang";
import { BookingForm } from "@/components/booking-form";
import { DISTANCE_KEYS, RIAD, mapEmbedSrc, whatsappLink } from "@/lib/riad";
import { buildHead, lodgingJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  validateSearch: validateLangSearch,
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: ({ deps }) => ({ lang: deps.lang === "en" ? ("en" as const) : ("fr" as const) }),
  head: ({ loaderData }) => {
    const lang = loaderData?.lang ?? "fr";
    const t = content[lang];
    return {
      ...buildHead({ path: "/", lang, title: t.home.title, description: t.home.description }),
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(lodgingJsonLd(lang)) },
      ],
    };
  },
  component: HomePage,
});

const AMENITY_ICONS = [Sparkles, Bath, Croissant, Trees, Wifi, ConciergeBell];

function HomePage() {
  const { t, search } = useLang();

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <img
          src={heroPatio}
          alt={t.images.hero}
          width={1920}
          height={1088}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.18 0.03 250 / 62%) 0%, oklch(0.18 0.03 250 / 28%) 45%, oklch(0.18 0.03 250 / 72%) 100%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-6 pt-24 text-center">
          <p className="text-[0.6875rem] uppercase tracking-[0.3em] text-on-dark/85">{t.home.heroEyebrow}</p>
          <h1 className="mt-6 font-display text-[2.35rem] leading-[1.1] text-on-dark sm:text-5xl md:text-[3.9rem]">
            {t.home.heroTitle}
          </h1>
          <div className="mt-8 flex items-center justify-center gap-5" aria-hidden="true">
            <span className="h-px w-16 bg-on-dark/40 sm:w-28" />
            <EightPointStar className="h-4 w-4 text-on-dark" />
            <span className="h-px w-16 bg-on-dark/40 sm:w-28" />
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-on-dark/85 sm:text-base">
            {t.home.heroLead}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={whatsappLink(t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid-gold w-full sm:w-auto"
            >
              {t.cta.bookWhatsapp}
            </a>
            <Link
              to="/chambres"
              search={search}
              className="btn-gold btn-gold-hover w-full !border-on-dark !text-on-dark sm:w-auto"
            >
              {t.cta.discoverRooms}
            </Link>
          </div>
        </div>
      </section>

      {/* PRÉSENTATION */}
      <section className="bg-ivory py-24 text-ivory-foreground sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow">{t.home.introEyebrow}</p>
              <h2 className="mt-4 text-3xl leading-[1.15] sm:text-4xl md:text-[2.7rem]">{t.home.introTitle}</h2>
              <span className="hairline mt-7 block w-24" />
              <div className="mt-7 space-y-5 text-[0.95rem] leading-relaxed text-ivory-foreground/80">
                {t.home.introParagraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <Link
                to="/localisation"
                search={search}
                className="btn-gold mt-9 !border-ivory-foreground/40 !text-ivory-foreground hover:!bg-ivory-foreground hover:!text-ivory"
              >
                {t.cta.seeLocation}
              </Link>
            </Reveal>

            <Reveal delay={120} className="grid grid-cols-2 gap-4">
              <img
                src={detailZellige}
                alt={t.images.zellige}
                width={1280}
                height={960}
                loading="lazy"
                decoding="async"
                className="col-span-2 h-64 w-full object-cover sm:h-80"
              />
              <img
                src={terrasse}
                alt={t.images.terrace}
                width={1280}
                height={960}
                loading="lazy"
                decoding="async"
                className="h-40 w-full object-cover sm:h-52"
              />
              <img
                src={chambreAtlas}
                alt={t.images.room}
                width={1280}
                height={960}
                loading="lazy"
                decoding="async"
                className="mt-6 h-40 w-full object-cover sm:h-52"
              />
            </Reveal>
          </div>

          {/* Faits vérifiables — extractibles par les moteurs génératifs */}
          <Reveal className="mt-20">
            <h3 className="font-display text-2xl">{t.home.factsTitle}</h3>
            <dl className="mt-8 grid gap-x-10 gap-y-6 border-t border-ivory-foreground/15 pt-8 sm:grid-cols-2 lg:grid-cols-3">
              {t.home.facts.map((f) => (
                <div key={f.label} className="border-b border-ivory-foreground/10 pb-4">
                  <dt className="text-[0.65rem] uppercase tracking-[0.24em] text-ivory-foreground/55">{f.label}</dt>
                  <dd className="mt-2 font-display text-lg">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ÉQUIPEMENTS */}
      <section className="zellige-pattern bg-ink py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionTitle
              eyebrow={t.home.amenitiesEyebrow}
              title={t.home.amenitiesTitle}
              lead={t.home.amenitiesLead}
            />
          </Reveal>
          <ul className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {t.home.amenities.map((a, i) => {
              const Icon = AMENITY_ICONS[i] ?? Sparkles;
              return (
                <li key={a.title} className="bg-ink p-8 transition-colors duration-500 hover:bg-ink-soft">
                  <Icon className="h-6 w-6 text-olive" strokeWidth={1} />
                  <h3 className="mt-5 text-xl">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* AVIS */}
      <section className="relative bg-ink-soft py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionTitle eyebrow={t.home.reviewsEyebrow} title={t.home.reviewsTitle} />
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {t.home.reviews.map((r, i) => (
              <Reveal key={r.author} delay={i * 110}>
                <figure className="flex h-full flex-col border border-border border-l-2 border-l-terracotta bg-ivory p-8">
                  <div className="flex gap-1" aria-label={`${r.rating}/5`}>
                    {Array.from({ length: r.rating }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-terracotta text-terracotta" strokeWidth={1} />
                    ))}
                  </div>
                  <blockquote className="mt-6 flex-1 text-[0.95rem] leading-relaxed text-foreground/85">
                    “{r.text}”
                  </blockquote>
                  <figcaption className="mt-6 text-xs uppercase tracking-[0.2em] text-cobalt">
                    {r.author}
                    <span className="ml-2 text-muted-foreground/70 normal-case tracking-normal">{r.origin}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {RIAD.rating.value} / 5 — {RIAD.rating.count} {t.home.reviewsEyebrow.toLowerCase()}
          </p>
        </div>
      </section>

      {/* LOCALISATION — distances vérifiables + carte */}
      <section className="bg-cobalt-deep py-24 text-on-dark sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal>
            <h2 className="font-display text-4xl leading-[1.1] sm:text-5xl">{t.location.heading}</h2>
            <p className="mt-7 text-[0.95rem] leading-relaxed text-on-dark/80">{t.location.lead}</p>
            <dl className="mt-10">
              {DISTANCE_KEYS.map((key) => {
                const row = t.location.distances[key];
                return (
                  <div
                    key={key}
                    className="flex items-baseline justify-between gap-6 border-b border-on-dark/20 py-4 text-sm"
                  >
                    <dt className="text-on-dark/85">{row.place}</dt>
                    <dd className="font-display text-lg text-terracotta">{row.distance}</dd>
                  </div>
                );
              })}
            </dl>
            <p className="mt-6 text-xs text-on-dark/55">{t.location.mapCaption}</p>
            <Link
              to="/localisation"
              search={search}
              className="btn-gold btn-gold-hover arch-pill mt-8 !border-on-dark/50 !text-on-dark"
            >
              {t.cta.seeLocation}
            </Link>
          </Reveal>

          <Reveal delay={120} className="rounded-2xl border border-on-dark/25 bg-on-dark/10 p-2 shadow-warm-lg">
            <iframe
              title={t.location.mapCaption}
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[22rem] w-full rounded-xl sm:h-[27rem]"
            />
          </Reveal>
        </div>
      </section>

      {/* RÉSERVATION — formulaire sur photo du patio */}
      <section className="relative overflow-hidden py-24 sm:py-28">
        <img
          src={heroPatio}
          alt={t.images.hero}
          width={1920}
          height={1088}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-terracotta/55" />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <div className="text-center text-on-dark">
            <p className="text-[0.6875rem] uppercase tracking-[0.3em] text-on-dark/85">{t.contact.eyebrow}</p>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl">
              {t.nav.contact === "Contact" && t.rooms.priceLabel ? null : null}
              {t.cta.bookWhatsapp}
            </h2>
          </div>
          <BookingForm className="mt-10" />
        </div>
      </section>

      {/* CTA */}
      <section className="zellige-pattern border-y border-border bg-ink py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <EightPointStar className="mx-auto h-7 w-7 text-gold" />
          <h2 className="mt-6 text-3xl sm:text-4xl">{t.contact.heading}</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{t.contact.lead}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/contact" search={search} className="btn-solid-gold w-full sm:w-auto">
              {t.cta.book}
            </Link>
            <a href={`tel:${RIAD.phone}`} className="btn-gold btn-gold-hover w-full sm:w-auto">
              {RIAD.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
