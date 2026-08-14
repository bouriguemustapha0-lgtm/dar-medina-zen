import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { useLang } from "@/i18n/use-lang";
import { RIAD, mapsLink, whatsappLink } from "@/lib/riad";
import logoAsset from "@/assets/logo.jpeg.asset.json";
import { Divider } from "./ornaments";

const LINKS = [
  { to: "/", key: "home" },
  { to: "/chambres", key: "rooms" },
  { to: "/localisation", key: "location" },
  { to: "/galerie", key: "gallery" },
  { to: "/faq", key: "faq" },
  { to: "/contact", key: "contact" },
] as const;

export function SiteFooter() {
  const { t, search } = useLang();

  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <img
              src={logoAsset.url}
              alt={`${RIAD.name} — logo`}
              className="h-14 w-auto rounded-sm object-contain"
              loading="lazy"
            />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram — ${RIAD.name}`}
                className="border border-border p-2.5 text-gold/80 transition-colors hover:border-gold hover:text-gold"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.2} />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Facebook — ${RIAD.name}`}
                className="border border-border p-2.5 text-gold/80 transition-colors hover:border-gold hover:text-gold"
              >
                <Facebook className="h-4 w-4" strokeWidth={1.2} />
              </a>
            </div>
          </div>

          <nav aria-label={t.footer.navTitle}>
            <p className="eyebrow">{t.footer.navTitle}</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} search={search} className="transition-colors hover:text-gold">
                    {t.nav[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic">
            <p className="eyebrow">{t.footer.contactTitle}</p>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.2} />
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  {t.address}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.2} />
                <a href={`tel:${RIAD.phone}`} className="hover:text-gold">
                  {RIAD.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.2} />
                <a href={`mailto:${RIAD.email}`} className="hover:text-gold">
                  {RIAD.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(t.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold btn-gold-hover mt-2 !px-5 !py-3"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </address>
        </div>

        <Divider className="mt-14" />

        <div className="mt-8 flex flex-col gap-3 text-center text-xs text-muted-foreground/80">
          <p>{t.footer.legalText}</p>
          <p>
            © {new Date().getFullYear()} Riad Dar Medina Land — {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
