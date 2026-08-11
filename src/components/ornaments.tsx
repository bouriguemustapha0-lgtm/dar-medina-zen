/** Décors géométriques marocains en SVG léger (étoile à huit branches, filets dorés). */

export function EightPointStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none">
      <path
        d="M24 2 30 12.6 42 8 37.4 20 48 24 37.4 28 42 40 30 35.4 24 46 18 35.4 6 40 10.6 28 0 24 10.6 20 6 8 18 12.6z"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.9"
      />
      <circle cx="24" cy="24" r="5.5" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-5 ${className}`} aria-hidden="true">
      <span className="hairline w-16 sm:w-28" />
      <EightPointStar className="h-4 w-4 text-gold" />
      <span className="hairline w-16 sm:w-28" />
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  const leadTone = tone === "dark" ? "text-muted-foreground" : "text-ivory-foreground/75";
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-4 text-3xl leading-[1.15] sm:text-4xl md:text-[2.75rem]">{title}</h2>
      {align === "center" ? <Divider className="mt-7" /> : <span className="hairline mt-7 block w-24" />}
      {lead ? <p className={`mt-7 text-base leading-relaxed ${leadTone}`}>{lead}</p> : null}
    </div>
  );
}
