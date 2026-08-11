import { createFileRoute } from "@tanstack/react-router";
import heroPatio from "@/assets/hero-patio.jpg";
import chambreAtlas from "@/assets/chambre-vue-montagne.jpg";
import spaHammam from "@/assets/spa-hammam.jpg";
import detailZellige from "@/assets/detail-zellige.jpg";
import terrasse from "@/assets/terrasse-medina.jpg";
import petitDejeuner from "@/assets/petit-dejeuner.jpg";
import { SectionTitle } from "@/components/ornaments";
import { Reveal } from "@/components/reveal";
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
  const { t } = useLang();

  const photos = [
    { src: heroPatio, alt: t.images.hero, span: "sm:col-span-2 sm:row-span-2" },
    { src: chambreAtlas, alt: t.images.room, span: "" },
    { src: detailZellige, alt: t.images.zellige, span: "" },
    { src: spaHammam, alt: t.images.spa, span: "sm:col-span-2" },
    { src: terrasse, alt: t.images.terrace, span: "" },
    { src: petitDejeuner, alt: t.images.breakfast, span: "" },
  ];

  return (
    <>
      <section className="bg-ink px-5 pb-14 pt-36 sm:px-8 sm:pt-44">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={t.gallery.eyebrow}
            title={t.gallery.heading}
            lead={t.gallery.lead}
            align="left"
          />
        </div>
      </section>

      <section className="bg-ink pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-7xl auto-rows-[14rem] grid-cols-1 gap-3 px-5 sm:grid-cols-4 sm:auto-rows-[15rem] sm:px-8">
          {photos.map((photo, i) => (
            <Reveal key={photo.alt} delay={i * 70} className={`overflow-hidden ${photo.span}`}>
              <img
                src={photo.src}
                alt={photo.alt}
                width={1280}
                height={960}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.04]"
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
