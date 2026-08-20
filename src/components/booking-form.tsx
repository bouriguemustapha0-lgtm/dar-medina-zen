import { useState, type FormEvent } from "react";
import { EightPointStar } from "@/components/ornaments";
import { useLang } from "@/i18n/use-lang";
import { RIAD, ROOM_TYPES, mailtoLink, whatsappLink } from "@/lib/riad";

/** Carte de réservation (fond translucide) : ouvre WhatsApp pré-rempli. */
export function BookingForm({ className = "" }: { className?: string }) {
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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    const body = lines.join("\n");
    const subject = `${L ? "Booking request" : "Demande de réservation"} — ${RIAD.name}`;
    window.open(whatsappLink(body), "_blank", "noopener,noreferrer");
    // La demande est aussi envoyée par email au riad.
    window.location.href = mailtoLink(subject, body);
  };

  const field =
    "mt-2 w-full rounded-none border border-on-dark/30 bg-on-dark/8 px-4 py-3 text-sm text-on-dark outline-none transition-colors placeholder:text-on-dark/45 focus:border-on-dark/75 focus:bg-on-dark/12";
  const label = "block text-[0.65rem] uppercase tracking-[0.22em] text-on-dark/70";

  return (
    <form
      onSubmit={onSubmit}
      className={`relative border border-on-dark/18 p-7 shadow-warm-lg backdrop-blur-md sm:p-10 ${className}`}
      style={{
        background:
          "linear-gradient(160deg, oklch(0.468 0.135 251 / 88%) 0%, oklch(0.3 0.09 252 / 90%) 100%)",
      }}
    >
      <span
        className="pointer-events-none absolute inset-2 border border-on-dark/12"
        aria-hidden="true"
      />
      <div className="relative mb-8 flex items-center justify-center gap-4" aria-hidden="true">
        <span className="h-px w-14 bg-on-dark/25" />
        <EightPointStar className="h-4 w-4 text-terracotta" />
        <span className="h-px w-14 bg-on-dark/25" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label} htmlFor="bf-name">
            {t.contact.form.name}
          </label>
          <input
            id="bf-name"
            required
            value={form.name}
            onChange={set("name")}
            className={field}
            autoComplete="name"
            placeholder={lang === "en" ? "Your name" : "Votre nom"}
          />
        </div>
        <div>
          <label className={label} htmlFor="bf-arrival">
            {t.contact.form.arrival}
          </label>
          <input
            id="bf-arrival"
            type="date"
            required
            value={form.arrival}
            onChange={set("arrival")}
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="bf-departure">
            {t.contact.form.departure}
          </label>
          <input
            id="bf-departure"
            type="date"
            required
            value={form.departure}
            onChange={set("departure")}
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="bf-guests">
            {t.contact.form.guests}
          </label>
          <select id="bf-guests" value={form.guests} onChange={set("guests")} className={field}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={String(n)}>
                {n} {lang === "en" ? (n > 1 ? "guests" : "guest") : "pers."}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="bf-room">
            {t.contact.form.room}
          </label>
          <select id="bf-room" value={form.room} onChange={set("room")} className={field}>
            <option value="">{t.contact.form.roomAny}</option>
            {ROOM_TYPES.map((type) => (
              <option key={type.key} value={lang === "en" ? type.en : type.fr}>
                {lang === "en" ? type.en : type.fr}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="bf-message">
            {t.contact.form.message}
          </label>
          <textarea
            id="bf-message"
            rows={4}
            value={form.message}
            onChange={set("message")}
            className={field}
            placeholder={lang === "en" ? "Any special request?" : "Une demande particulière ?"}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn-solid-gold arch-pill w-full sm:w-auto">
          {t.cta.bookWhatsapp}
        </button>
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-on-dark/70">
          {lang === "en"
            ? `Also sent by email to ${RIAD.email}`
            : `Envoyé aussi par email à ${RIAD.email}`}
        </p>
      </div>
    </form>
  );
}
