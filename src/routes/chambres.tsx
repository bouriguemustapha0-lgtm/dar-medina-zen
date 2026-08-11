import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Bath, Tag } from "lucide-react";
import chambreAtlas from "@/assets/chambre-vue-montagne.jpg";
import detailZellige from "@/assets/detail-zellige.jpg";
import terrasse from "@/assets/terrasse-medina.jpg";
import heroPatio from "@/assets/hero-patio.jpg";
import spaHammam from "@/assets/spa-hammam.jpg";
import { SectionTitle } from "@/components/ornaments";
import { Reveal } from "@/components/reveal";
import { content } from "@/i18n/content";
import { useLang, validateLangSearch } from "@/i18n/use-lang";
import { ROOM_KEYS, whatsappLink } from "@/lib/riad";
import { breadcrumbJsonLd, buildHead } from "@/lib/seo";

export const Route = createFileRoute("/chambres")({
  validateSearch: validateLangSearch,
  head: ({ search }) => {
    const lang = search?.lang === "en" ? "en" : "fr";
    const t = content[lang];
    return {
      ...buildHead({ path: "/chambres", lang, title: t.rooms.title, description: t.rooms.description }),
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
  andalouse: heroPatio,
  atlas: chambreAtlas,
  zellige: detailZellige,
  moucharabieh: spaHammam,
  menara: terrasse,
} as const;

function RoomsPage() {
  const { t, search } = useLang();

  const alt = {
    andalouse: t.images.hero,
    atlas: t.images.room,
    zellige: t.images.zellige,
    moucharabieh: t.images.spa,
    menara: t.images.terrace,
  } as const;

  return (
    <>
      <section className="bg-ink px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow={t.rooms.eyebrow} title={t.rooms.heading} lead={t.rooms.lead} align="left" />
        </div>
      </section>

      <section className="bg-ink pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl space-y-px px-5 sm:px-8">
          {ROOM_KEYS.map((key, i) => {
            const room = t.rooms.items[key];
            return (
              <Reveal key={key}>
                <article
                  className={`grid items-center gap-10 border border-border p-6 sm:p-8 lg:grid-cols-2 lg:gap-14 ${
                    i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                  }`}
                >
                  <figure className="m-0">
                    <img
                      src={IMAGES[key]}
                      alt={alt[key]}
                      width={1280}
                      height={960}
                      loading="lazy"
                      decoding="async"
                      className="h-64 w-full object-cover sm:h-80 lg:h-[26rem]"
                    />
                  </figure>
                  <div>
                    <h2 className="text-3xl sm:text-[2.1rem]">{room.name}</h2>
                    <span className="hairline mt-5 block w-20" />
                    <p className="mt-6 text-[0.95rem] leading-relaxed text-muted-foreground">{room.text}</p>
                    <dl className="mt-8 space-y-4 border-t border-border pt-6 text-sm">
                      <div className="flex gap-3">
                        <Eye className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.2} />
                        <div>
                          <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">{t.rooms.viewLabel}</dt>
                          <dd className="mt-1 text-foreground/85">{room.view}</dd>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Bath className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.2} />
                        <div>
                          <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">{t.rooms.bathLabel}</dt>
                          <dd className="mt-1 text-foreground/85">{room.bath}</dd>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Tag className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.2} />
                        <div>
                          <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">{t.rooms.priceLabel}</dt>
                          <dd className="mt-1 text-foreground/85">{t.rooms.priceValue}</dd>
                        </div>
                      </div>
                    </dl>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <a
                        href={whatsappLink(
                          `${t.whatsappMessage} (${room.name})`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold btn-gold-hover"
                      >
                        {t.cta.bookWhatsapp}
                      </a>
                      <Link to="/contact" search={search} className="btn-gold btn-gold-hover">
                        {t.nav.contact}
                      </Link>
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
