import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { petitDejeuner } from "@/lib/photos";
import { SectionTitle } from "@/components/ornaments";
import { content } from "@/i18n/content";
import { useLang, validateLangSearch } from "@/i18n/use-lang";
import { RIAD, ROOM_KEYS, mapsLink, whatsappLink } from "@/lib/riad";
import { breadcrumbJsonLd, buildHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  validateSearch: validateLangSearch,
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: ({ deps }) => ({ lang: deps.lang === "en" ? ("en" as const) : ("fr" as const) }),
  head: ({ loaderData }) => {
    const lang = loaderData?.lang ?? "fr";
    const t = content[lang];
    return {
      ...buildHead({
        path: "/contact",
        lang,
        title: t.contact.title,
        description: t.contact.description,
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbJsonLd(lang, "/contact", t.nav.contact)),
        },
      ],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  const { t, lang } = useLang();
  const [form, setForm] = useState({
    name: "",
    arrival: "",
    departure: "",
    guests: "2",
    room: "",
    message: "",
  });

  const set = (key: keyof typeof form) => (event: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const buildMessage = () => {
    const L = lang === "en";
    const lines = [
      `${L ? "Booking request" : "Demande de réservation"} — ${RIAD.name}`,
      `${t.contact.form.name}: ${form.name || "—"}`,
      `${t.contact.form.arrival}: ${form.arrival || "—"}`,
      `${t.contact.form.departure}: ${form.departure || "—"}`,
      `${t.contact.form.guests}: ${form.guests}`,
      `${t.contact.form.room}: ${form.room || t.contact.form.roomAny}`,
    ];
    if (form.message) lines.push(`${t.contact.form.message}: ${form.message}`);
    return lines.join("\n");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(whatsappLink(buildMessage()), "_blank", "noopener,noreferrer");
  };

  const field =
    "mt-2 w-full border border-input bg-ink-soft px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold focus:ring-1 focus:ring-ring";
  const label = "block text-[0.65rem] uppercase tracking-[0.22em] text-gold";

  return (
    <>
      <section className="bg-ink px-5 pb-14 pt-36 sm:px-8 sm:pt-44">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={t.contact.eyebrow}
            title={t.contact.heading}
            lead={t.contact.lead}
            align="left"
          />
        </div>
      </section>

      <section className="bg-ink pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={onSubmit} className="border border-border p-7 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={label} htmlFor="name">
                  {t.contact.form.name}
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={set("name")}
                  className={field}
                  autoComplete="name"
                />
              </div>
              <div>
                <label className={label} htmlFor="arrival">
                  {t.contact.form.arrival}
                </label>
                <input id="arrival" type="date" required value={form.arrival} onChange={set("arrival")} className={field} />
              </div>
              <div>
                <label className={label} htmlFor="departure">
                  {t.contact.form.departure}
                </label>
                <input
                  id="departure"
                  type="date"
                  required
                  value={form.departure}
                  onChange={set("departure")}
                  className={field}
                />
              </div>
              <div>
                <label className={label} htmlFor="guests">
                  {t.contact.form.guests}
                </label>
                <input
                  id="guests"
                  type="number"
                  min="1"
                  max="22"
                  value={form.guests}
                  onChange={set("guests")}
                  className={field}
                />
              </div>
              <div>
                <label className={label} htmlFor="room">
                  {t.contact.form.room}
                </label>
                <select id="room" value={form.room} onChange={set("room")} className={field}>
                  <option value="">{t.contact.form.roomAny}</option>
                  {ROOM_KEYS.map((key) => (
                    <option key={key} value={t.rooms.items[key].name}>
                      {t.rooms.items[key].name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="message">
                  {t.contact.form.message}
                </label>
                <textarea id="message" rows={4} value={form.message} onChange={set("message")} className={field} />
              </div>
            </div>

            <button type="submit" className="btn-solid-gold mt-8 w-full">
              {t.contact.form.submit}
            </button>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{t.contact.form.note}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {t.contact.form.alt} :{" "}
              <a href={`mailto:${RIAD.email}`} className="text-gold hover:underline">
                {RIAD.email}
              </a>
            </p>
          </form>

          <div>
            <img
              src={petitDejeuner}
              alt={t.images.breakfast}
              width={1280}
              height={960}
              loading="lazy"
              decoding="async"
              className="h-60 w-full object-cover sm:h-72"
            />
            <h2 className="mt-10 text-2xl">{t.contact.directTitle}</h2>
            <span className="hairline mt-5 block w-20" />
            <address className="mt-7 space-y-6 not-italic text-sm">
              <div className="flex gap-4">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.2} />
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">{t.contact.phoneLabel}</p>
                  <a href={`tel:${RIAD.phone}`} className="mt-1 block text-foreground/85 hover:text-gold">
                    {RIAD.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.2} />
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">{t.contact.emailLabel}</p>
                  <a href={`mailto:${RIAD.email}`} className="mt-1 block text-foreground/85 hover:text-gold">
                    {RIAD.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.2} />
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">{t.contact.addressLabel}</p>
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-foreground/85 hover:text-gold"
                  >
                    {t.address}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.2} />
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">{t.contact.hoursLabel}</p>
                  <p className="mt-1 text-foreground/85">{t.contact.hoursValue}</p>
                </div>
              </div>
            </address>
            <a
              href={whatsappLink(t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold btn-gold-hover mt-9"
            >
              {t.cta.bookWhatsapp}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
