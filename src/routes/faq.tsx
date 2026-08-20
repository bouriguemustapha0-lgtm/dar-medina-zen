import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { SectionTitle } from "@/components/ornaments";
import { content } from "@/i18n/content";
import { useLang, validateLangSearch } from "@/i18n/use-lang";
import { RIAD, whatsappLink } from "@/lib/riad";
import { breadcrumbJsonLd, buildHead, faqJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  validateSearch: validateLangSearch,
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: ({ deps }) => ({ lang: deps.lang === "en" ? ("en" as const) : ("fr" as const) }),
  head: ({ loaderData }) => {
    const lang = loaderData?.lang ?? "fr";
    const t = content[lang];
    return {
      ...buildHead({ path: "/faq", lang, title: t.faq.title, description: t.faq.description }),
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(faqJsonLd(lang)) },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbJsonLd(lang, "/faq", t.nav.faq)),
        },
      ],
    };
  },
  component: FaqPage,
});

function FaqPage() {
  const { t, search } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <section className="bg-ink px-5 pb-14 pt-36 sm:px-8 sm:pt-44">
        <div className="mx-auto max-w-4xl">
          <SectionTitle eyebrow={t.faq.eyebrow} title={t.faq.heading} align="left" />
        </div>
      </section>

      <section className="bg-ink pb-24 sm:pb-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <ul className="border-t border-border">
            {t.faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-b border-border">
                  <h2>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-display text-lg text-foreground sm:text-xl">
                        {item.q}
                      </span>
                      {isOpen ? (
                        <Minus className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={1.2} />
                      ) : (
                        <Plus className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={1.2} />
                      )}
                    </button>
                  </h2>
                  <div className={isOpen ? "pb-7 pr-10" : "hidden"}>
                    <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{item.a}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-14 flex flex-col items-start gap-4 border border-border p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {RIAD.phoneDisplay} — {t.contact.hoursValue}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappLink(t.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold btn-gold-hover"
              >
                WhatsApp
              </a>
              <Link to="/contact" search={search} className="btn-solid-gold">
                {t.cta.book}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
