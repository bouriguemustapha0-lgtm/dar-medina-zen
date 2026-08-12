import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useLang } from "@/i18n/use-lang";
import { RIAD, whatsappLink } from "@/lib/riad";
import { EightPointStar } from "./ornaments";

const LINKS = [
  { to: "/", key: "home" },
  { to: "/chambres", key: "rooms" },
  { to: "/localisation", key: "location" },
  { to: "/galerie", key: "gallery" },
  { to: "/faq", key: "faq" },
] as const;

export function SiteHeader() {
  const { lang, t, search, pathname } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || open || pathname !== "/";
  const tone = solid ? "text-foreground" : "text-on-dark";
  const toneSoft = solid ? "text-foreground/75" : "text-on-dark/80";
  const accent = solid ? "text-cobalt" : "text-on-dark";

  const otherLangHref = lang === "fr" ? `${pathname}?lang=en` : pathname;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-ink/95 backdrop-blur-sm shadow-frame" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link to="/" search={search} className="group flex items-center gap-3">
          <EightPointStar className={`h-6 w-6 ${accent} transition-transform duration-700 group-hover:rotate-45`} />
          <span className="leading-tight">
            <span className={`block font-display text-lg tracking-wide ${tone} sm:text-xl`}>
              Riad Dar Medina Land
            </span>
            <span className={`block text-[0.6rem] uppercase tracking-[0.28em] ${solid ? "text-cobalt" : "text-on-dark/80"}`}>
              Médina · Marrakech
            </span>
          </span>
        </Link>

        <nav aria-label={t.nav.home} className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              search={search}
              activeProps={{ className: solid ? "!text-terracotta" : "!text-on-dark" }}
              className={`text-[0.7rem] uppercase tracking-[0.22em] ${toneSoft} transition-colors hover:text-terracotta`}
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={otherLangHref}
            hrefLang={lang === "fr" ? "en" : "fr"}
            className={`hidden text-[0.7rem] uppercase tracking-[0.2em] ${toneSoft} transition-colors hover:text-terracotta sm:block`}
          >
            {lang === "fr" ? "EN" : "FR"}
          </a>
          <a
            href={`tel:${RIAD.phone}`}
            aria-label={t.cta.call}
            className={`hidden ${toneSoft} transition-colors hover:text-terracotta sm:block`}
          >
            <Phone className="h-4 w-4" strokeWidth={1.2} />
          </a>
          <Link to="/contact" search={search} className={`btn-gold btn-gold-hover hidden !px-6 !py-3 sm:inline-flex ${solid ? "" : "!border-on-dark !text-on-dark"}`}>
            {t.nav.contact}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className={`${accent} lg:hidden`}
          >
            {open ? <X className="h-6 w-6" strokeWidth={1.2} /> : <Menu className="h-6 w-6" strokeWidth={1.2} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-ink px-5 pb-8 pt-4 lg:hidden">
          <nav className="flex flex-col divide-y divide-border">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                search={search}
                className="py-4 text-sm uppercase tracking-[0.2em] text-foreground/85"
              >
                {t.nav[link.key]}
              </Link>
            ))}
            <Link to="/contact" search={search} className="py-4 text-sm uppercase tracking-[0.2em] text-cobalt">
              {t.nav.contact}
            </Link>
          </nav>
          <div className="mt-6 flex items-center justify-between">
            <a href={otherLangHref} className="text-xs uppercase tracking-[0.2em] text-foreground/70">
              {lang === "fr" ? "English" : "Français"}
            </a>
            <a
              href={whatsappLink(t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold btn-gold-hover !px-5 !py-3"
            >
              WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
