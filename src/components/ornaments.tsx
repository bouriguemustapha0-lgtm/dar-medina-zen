/** Décors géométriques marocains en SVG léger (étoile à huit branches, frises zellige, filigranes). */

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

/** Frise zellige fine : losanges + étoiles, en séparateur de section. */
export function ZelligeFrieze({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
    >
      {[0, 40, 80, 120, 160, 200].map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <path d="M20 3 27 12 20 21 13 12z" />
          <path d="M20 7.5 24.5 12 20 16.5 15.5 12z" opacity="0.6" />
          <path d="M0 12h13M27 12h13" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

/** Séparateur : filet + étoile à 8 branches + frise zellige. */
export function Divider({ className = "", tone = "cobalt" }: { className?: string; tone?: "cobalt" | "terracotta" }) {
  const color = tone === "terracotta" ? "text-terracotta" : "text-cobalt";
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <ZelligeFrieze className={`h-4 w-20 shrink-0 sm:w-28 ${color} opacity-55`} />
      <EightPointStar className={`h-4 w-4 shrink-0 ${color}`} />
      <ZelligeFrieze className={`h-4 w-20 shrink-0 sm:w-28 ${color} opacity-55`} />
    </div>
  );
}

/** Silhouette de lanterne en filigrane, pour les marges de section. */
export function LanternWatermark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 300"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M60 0v34M42 40h36M60 40v6" />
      <path d="M46 46c-9 14-14 30-14 47 0 26 12.5 46 28 46s28-20 28-46c0-17-5-33-14-47z" />
      <path d="M60 66c-9 8-14 17-14 27 0 11 6.3 19 14 19s14-8 14-19c0-10-5-19-14-27z" />
      <path d="M36 139h48M48 139l4 24h16l4-24M60 163v28M46 196h28" />
      <path d="M60 196v40M52 244h16" />
    </svg>
  );
}

/** Moucharabieh en filigrane (grille ajourée). */
export function MoucharabiehWatermark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
    >
      {[0, 40, 80, 120].map((y) =>
        [0, 40, 80, 120].map((x) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            <path d="M20 2 38 20 20 38 2 20z" />
            <path d="M20 11 29 20 20 29 11 20z" opacity="0.7" />
          </g>
        )),
      )}
    </svg>
  );
}

/** Guillemet décoratif façon arabesque, pour les témoignages. */
export function ArabesqueQuote({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M26 6C13 8 5 17 5 29c0 7 4.5 12 11 12 5.7 0 9.8-3.9 9.8-9.2 0-5-3.6-8.6-8.6-8.6-1.4 0-2.6.3-3.6.8C15.4 18 19.8 12.6 27 9.6z" />
      <path d="M59 6C46 8 38 17 38 29c0 7 4.5 12 11 12 5.7 0 9.8-3.9 9.8-9.2 0-5-3.6-8.6-8.6-8.6-1.4 0-2.6.3-3.6.8C48.4 18 52.8 12.6 60 9.6z" />
    </svg>
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
      <h2 className="mt-4 text-4xl leading-[1.08] sm:text-5xl md:text-[3.35rem]">{title}</h2>
      {align === "center" ? <Divider className="mt-7" /> : <ZelligeFrieze className="mt-7 h-4 w-32 text-cobalt opacity-60" />}
      {lead ? <p className={`mt-7 text-base leading-relaxed ${leadTone}`}>{lead}</p> : null}
    </div>
  );
}
